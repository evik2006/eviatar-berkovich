'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────

type Axis = 'x' | 'y' | 'z';
const AXES: Axis[] = ['x', 'y', 'z'];
const LAYERS = [-1, 0, 1] as const;

const TWIST_DURATION = 0.7;   // seconds for a 90° layer twist (heavy, cinematic)
const IDLE_SPEED     = 0.14;  // rad/s slow idle Y rotation
const IDLE_DAMPING   = 0.025; // spring coefficient — keeps movement weighted
const PROXIMITY_PX   = 240;   // mouse proximity radius in px

// ─── Grid helpers ─────────────────────────────────────────────────────────────

interface Grid3 { x: number; y: number; z: number }

/** Rotate a grid coordinate 90° around the given axis. */
function rotateGrid(g: Grid3, axis: Axis, dir: number): Grid3 {
  const v = new THREE.Vector3(g.x, g.y, g.z);
  const angle = (Math.PI / 2) * dir;
  v.applyEuler(new THREE.Euler(
    axis === 'x' ? angle : 0,
    axis === 'y' ? angle : 0,
    axis === 'z' ? angle : 0,
  ));
  return { x: Math.round(v.x), y: Math.round(v.y), z: Math.round(v.z) };
}

// ─── GLB traversal helpers ───────────────────────────────────────────────────

/**
 * Walk the GLB scene and return the array of per-cubie objects.
 * Tries root children → grandchildren → great-grandchildren,
 * looking for a group of 26–30 objects (the 27-cubie puzzle).
 */
function findCubieObjects(scene: THREE.Object3D): THREE.Object3D[] {
  const flatten = (root: THREE.Object3D, depth: number): THREE.Object3D[] => {
    if (depth === 0 || root.children.length === 0) return [root];
    return root.children.flatMap(c => flatten(c, depth - 1));
  };

  for (let d = 1; d <= 3; d++) {
    const list = scene.children.flatMap(c => flatten(c, d - 1));
    if (list.length >= 26 && list.length <= 30) return list;
  }

  // Fallback: unique parent groups that contain meshes
  const parentSet = new Set<THREE.Object3D>();
  scene.traverse(obj => {
    if ((obj as THREE.Mesh).isMesh && obj.parent && obj.parent !== scene) {
      parentSet.add(obj.parent);
    }
  });
  if (parentSet.size >= 26 && parentSet.size <= 30) return [...parentSet];

  // Last resort: raw meshes
  const meshes: THREE.Object3D[] = [];
  scene.traverse(obj => { if ((obj as THREE.Mesh).isMesh) meshes.push(obj); });
  return meshes.length > 0 ? meshes : [...scene.children];
}

/** Estimate the inter-cubie spacing from the spread of centre-X values. */
function estimateSpacing(objects: THREE.Object3D[]): number {
  const box = new THREE.Box3();
  const xs = objects.map(o => {
    box.setFromObject(o);
    return Math.round(box.getCenter(new THREE.Vector3()).x * 1000) / 1000;
  });
  const unique = [...new Set(xs)].sort((a, b) => a - b);
  for (let i = 1; i < unique.length; i++) {
    const gap = Math.abs(unique[i] - unique[i - 1]);
    if (gap > 0.005) return gap;
  }
  return 1;
}

/** Enable shadows and upgrade materials to look plastic in cinema lighting. */
function prepareMeshes(root: THREE.Object3D) {
  root.traverse(obj => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach(mat => {
      if (mat instanceof THREE.MeshStandardMaterial) {
        mat.roughness  = Math.min(mat.roughness + 0.05, 0.55);
        mat.metalness  = Math.max(mat.metalness - 0.1,  0.0);
        mat.envMapIntensity = 0.6;
        mat.needsUpdate = true;
      }
    });
  });
}

// ─── Twist state types ───────────────────────────────────────────────────────

interface TwistCmd { axis: Axis; layer: number; dir: number }
interface ActiveTwist {
  axis: Axis;
  dir: number;
  elapsed: number;
  indices: number[];
  pivot: THREE.Group;
}

// ─── CubeModel ────────────────────────────────────────────────────────────────

function CubeModel({ isNear }: { isNear: boolean }) {
  const { scene } = useGLTF('/rubiks-cube.glb');

  const rootRef     = useRef<THREE.Group>(null);
  const cubies      = useRef<THREE.Object3D[]>([]);
  const gridPos     = useRef<Grid3[]>([]);
  const spacingRef  = useRef(1);
  const initialized = useRef(false);

  const twist     = useRef<ActiveTwist | null>(null);
  const queue     = useRef<TwistCmd[]>([]);
  const idleY     = useRef(0);
  const isNearRef = useRef(isNear);
  isNearRef.current = isNear;

  // ── One-time GLB setup ─────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root || initialized.current) return;
    initialized.current = true;

    const cloned = scene.clone(true);
    prepareMeshes(cloned);

    const objs = findCubieObjects(cloned);
    const sp   = estimateSpacing(objs);
    spacingRef.current = sp;

    const box = new THREE.Box3();

    // Compute grid coordinate per cubie *before* reparenting (world may change)
    cloned.updateWorldMatrix(true, true);

    const parsed = objs.map(obj => {
      box.setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      return {
        obj,
        grid: {
          x: Math.round(center.x / sp),
          y: Math.round(center.y / sp),
          z: Math.round(center.z / sp),
        } as Grid3,
      };
    });

    // Move cubies to root while preserving world transforms
    parsed.forEach(({ obj }) => {
      if (!obj.parent) return;
      obj.parent.updateWorldMatrix(true, false);

      const worldMat = new THREE.Matrix4()
        .copy(obj.parent.matrixWorld)
        .multiply(obj.matrix);

      const wp = new THREE.Vector3();
      const wq = new THREE.Quaternion();
      const ws = new THREE.Vector3();
      worldMat.decompose(wp, wq, ws);

      obj.removeFromParent();
      root.add(obj);
      obj.position.copy(wp);
      obj.quaternion.copy(wq);
      obj.scale.copy(ws);
    });

    cubies.current  = parsed.map(p => p.obj);
    gridPos.current = parsed.map(p => p.grid);
  }, [scene]);

  // ── Sync idleY when proximity changes ─────────────────────────────────────
  useEffect(() => {
    if (!isNear && rootRef.current) {
      idleY.current = rootRef.current.rotation.y;
    }
  }, [isNear]);

  // ── Enqueue layer twists while near ───────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const enqueue = () => {
      if (!isNearRef.current) return;
      if (queue.current.length < 4) {
        queue.current.push({
          axis  : AXES[Math.floor(Math.random() * 3)],
          layer : LAYERS[Math.floor(Math.random() * 3)],
          dir   : Math.random() > 0.5 ? 1 : -1,
        });
      }
      timer = setTimeout(enqueue, 380);
    };

    if (isNear) enqueue();
    return () => clearTimeout(timer);
  }, [isNear]);

  // ── Reparent helpers (used in both start and end of twist) ─────────────────
  const extractWorldTransform = (obj: THREE.Object3D) => {
    const wp = new THREE.Vector3();
    const wq = new THREE.Quaternion();
    const ws = new THREE.Vector3();
    obj.getWorldPosition(wp);
    obj.getWorldQuaternion(wq);
    obj.getWorldScale(ws);
    return { wp, wq, ws };
  };

  // ── Animation loop ────────────────────────────────────────────────────────
  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const cb = cubies.current;
    const gs = gridPos.current;
    const sp = spacingRef.current;

    // ── Start a new twist ────────────────────────────────────────────────────
    if (!twist.current && queue.current.length > 0 && cb.length > 0) {
      const { axis, layer, dir } = queue.current.shift()!;

      let indices = gs.reduce<number[]>((acc, g, i) => {
        if (g[axis] === layer) acc.push(i);
        return acc;
      }, []);

      // Fallback to neighbouring layer if this one is somehow empty
      if (indices.length === 0) {
        const alt = layer !== 0 ? 0 : 1;
        indices = gs.reduce<number[]>((acc, g, i) => {
          if (g[axis] === alt) acc.push(i);
          return acc;
        }, []);
      }

      if (indices.length > 0) {
        const pivot = new THREE.Group();
        root.add(pivot);

        indices.forEach(i => {
          const { wp, wq, ws } = extractWorldTransform(cb[i]);
          root.remove(cb[i]);
          pivot.add(cb[i]);
          cb[i].position.copy(wp);
          cb[i].quaternion.copy(wq);
          cb[i].scale.copy(ws);
        });

        twist.current = { axis, dir, elapsed: 0, indices, pivot };
      }
    }

    // ── Animate active twist ─────────────────────────────────────────────────
    if (twist.current) {
      const tw = twist.current;
      tw.elapsed = Math.min(tw.elapsed + delta, TWIST_DURATION);
      const progress = tw.elapsed / TWIST_DURATION;

      // Ease in-out sine — heavy, cinematic feel
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      tw.pivot.rotation[tw.axis] = (Math.PI / 2) * tw.dir * eased;

      if (tw.elapsed >= TWIST_DURATION) {
        // Snap pivot to exact 90° before extracting world transforms
        tw.pivot.rotation[tw.axis] = (Math.PI / 2) * tw.dir;
        tw.pivot.updateWorldMatrix(true, true);

        tw.indices.forEach(i => {
          const { wq, ws } = extractWorldTransform(cb[i]);
          const newGrid = rotateGrid(gs[i], tw.axis, tw.dir);

          tw.pivot.remove(cb[i]);
          root.add(cb[i]);
          // Snap position from grid to eliminate float drift
          cb[i].position.set(newGrid.x * sp, newGrid.y * sp, newGrid.z * sp);
          cb[i].quaternion.copy(wq);
          cb[i].scale.copy(ws);
          gs[i] = newGrid;
        });

        root.remove(tw.pivot);
        twist.current = null;
      }

      // No idle rotation while a twist is in progress
      return;
    }

    // ── Idle rotation (when not scrambling) ─────────────────────────────────
    if (!isNearRef.current) {
      idleY.current += delta * IDLE_SPEED;
      root.rotation.y += (idleY.current - root.rotation.y) * IDLE_DAMPING;
    }
  });

  return <group ref={rootRef} />;
}

// ─── Proximity detector ───────────────────────────────────────────────────────

function ProximityDetector({
  onNear,
  containerRef,
}: {
  onNear: (near: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      onNear(Math.hypot(e.clientX - cx, e.clientY - cy) < PROXIMITY_PX);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [onNear, containerRef]);

  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function RubiksCube() {
  const [isNear, setIsNear]   = useState(false);
  const containerRef           = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position   : 'fixed',
        bottom     : '-28px',        // slightly clipped for drama
        left       : '50%',
        transform  : 'translateX(-50%)',
        width      : '210px',
        height     : '210px',
        zIndex     : 80,
        pointerEvents: 'none',
      }}
    >
      <ProximityDetector onNear={setIsNear} containerRef={containerRef} />

      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0.4, 5], fov: 42 }}
      >
        {/*
          ── Film-noir cinematic lighting ──────────────────────────────────────
          Very dim ambient so shadows are deep and dramatic.
          Key light: warm spotlight from top-left — high contrast highlights.
          Fill: faint cool point from bottom-right to lift the darkest shadows
          just enough to read the cube's geometry.
        */}
        <ambientLight intensity={0.06} />

        <spotLight
          position={[-3.5, 5.5, 3.5]}
          angle={0.32}
          penumbra={0.85}
          intensity={380}        /* candela — physically-based Three.js ≥ r155 */
          color="#ffe8c0"        /* warm key light */
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        />

        <pointLight
          position={[3.5, -2.5, 1.5]}
          intensity={12}
          color="#1b2a4a"        /* very cold, near-invisible fill */
        />

        {/* Subtle backrim to separate cube from void */}
        <pointLight
          position={[0, -1, -3]}
          intensity={6}
          color="#2a1f0e"
        />

        <Suspense fallback={null}>
          <CubeModel isNear={isNear} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload so the model is ready before first render
useGLTF.preload('/rubiks-cube.glb');
