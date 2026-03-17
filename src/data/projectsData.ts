// ─── Types ────────────────────────────────────────────────────────────────────

export type VideoItem = {
  id: number;
  title: string;
  artist: string;
  year: string;
  /** Direct MP4/WebM URL — used as fallback when hlsSrc is absent */
  src: string;
  /** HLS playlist (.m3u8) — preferred for streaming quality */
  hlsSrc?: string;
  thumb: string;
};


export type StillItem = {
  src: string;
  title: string;
  subtitle: string;
};

export type PortraitProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  images: string[];
};

// ─── Music Videos ─────────────────────────────────────────────────────────────

export const musicVideos: VideoItem[] = [
  {
    id: 1,
    title: "MECHORATI",
    artist: "OLLIE DANON",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/3c24011f-03cb-4a76-a067-339979aadc22/playlist.m3u8",
    thumb: "https://Eviatarstills2006.b-cdn.net/Screenshot%202026-03-17%20at%2023.23.29.png",
  },
  {
    id: 2,
    title: "SHIR HAYONA",
    artist: "ITAY DALUMI",
    year: "2026",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/be6d8b93-2d96-45ef-ab4d-2145dc76d06f/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/be6d8b93-2d96-45ef-ab4d-2145dc76d06f/thumbnail_2c1e843e.jpg",
  },
  {
    id: 3,
    title: "SHUV",
    artist: "NESHAMA",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/8ebee153-191d-4c11-9562-febe094a8eeb/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/8ebee153-191d-4c11-9562-febe094a8eeb/thumbnail_d3e9ba3b.jpg",
  },
  {
    id: 4,
    title: "VEM TAVO ELI",
    artist: "MAAYAN LINIK",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/d1a62e6f-5626-41a9-99f3-f0f773ebbe7d/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/d1a62e6f-5626-41a9-99f3-f0f773ebbe7d/thumbnail_c035a1fc.jpg",
  },
  {
    id: 5,
    title: "KEREN OR",
    artist: "URI LASS",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/4addc355-3ab9-4e2b-92cc-4564ec93d5cb/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/4addc355-3ab9-4e2b-92cc-4564ec93d5cb/thumbnail_cda96df8.jpg",
  },
  {
    id: 6,
    title: "OD SHNIA",
    artist: "SHLEVTZY",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/f5cb7716-722f-4bf8-baa4-c451b399de35/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/f5cb7716-722f-4bf8-baa4-c451b399de35/thumbnail_9265aaac.jpg",
  },
  {
    id: 7,
    title: "MANGINA",
    artist: "ROE ITON",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/29ff1eb5-c30b-4b7e-9281-caa266329625/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/29ff1eb5-c30b-4b7e-9281-caa266329625/thumbnail.jpg",
  },
];

// ─── Live Sessions ────────────────────────────────────────────────────────────

export const liveSessions: VideoItem[] = [
  {
    id: 1,
    title: "IN LOVE WITH THE WAR",
    artist: "ALLAN TUNE",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/5013b261-abc7-44f9-b0b7-aa8a643db38b/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/5013b261-abc7-44f9-b0b7-aa8a643db38b/thumbnail_33199ed5.jpg",
  },
  {
    id: 2,
    title: "POGEA, LO YODEA",
    artist: "OLLIE DANON",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/e5b0a2e0-181c-47dc-8e43-6b60b6690586/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/e5b0a2e0-181c-47dc-8e43-6b60b6690586/thumbnail_5bdad9c8.jpg",
  },
  {
    id: 3,
    title: "HASHEVER HASURI-AFRIKANI",
    artist: "OLLIE DANON",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/2fa809b3-4762-4aa8-bedb-d54fe0f17847/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/2fa809b3-4762-4aa8-bedb-d54fe0f17847/thumbnail_475028aa.jpg",
  },
  {
    id: 4,
    title: "SHIRIMEAETMOL",
    artist: "OLLIE DANON",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/24fe0964-0686-4e8d-85b3-5134c23114ef/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/24fe0964-0686-4e8d-85b3-5134c23114ef/thumbnail_49151ce7.jpg",
  },
  {
    id: 5,
    title: "LEHAAMIN",
    artist: "DANIEL RUBIN & CILL PILL",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/4b7904a6-b8e3-4a0e-be8a-9d358e050e31/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/4b7904a6-b8e3-4a0e-be8a-9d358e050e31/thumbnail_7e8ee4b5.jpg",
  },
  {
    id: 6,
    title: "SIGALE",
    artist: "MEORI NEVO",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/c3bb4100-396d-426a-9dac-c330f116ad5d/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/c3bb4100-396d-426a-9dac-c330f116ad5d/thumbnail_274ed375.jpg",
  },
  {
    id: 7,
    title: "YESH BI COAH",
    artist: "TALYA DANZIG & CILL PILL",
    year: "2024",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/40b7f371-1c49-4afa-8988-873a8d363b96/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/40b7f371-1c49-4afa-8988-873a8d363b96/thumbnail.jpg",
  },
  {
    id: 8,
    title: "AIN TMUNA YOTER BRURA",
    artist: "ROY SAAR",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/368701df-f4a2-47a9-857f-71e4a1ce9376/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/368701df-f4a2-47a9-857f-71e4a1ce9376/thumbnail_3835d629.jpg",
  },
  {
    id: 9,
    title: "SHUVI ELAY",
    artist: "OHEL'S FAMILY & AVISHAI COHEN",
    year: "2023",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/03d649ec-6642-467e-9331-d58b692cbe31/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/03d649ec-6642-467e-9331-d58b692cbe31/thumbnail_962d10d8.jpg",
  },
  {
    id: 10,
    title: "IOGI",
    artist: "",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/33c6c667-0fd8-4b3f-bc68-7bdda3882685/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/33c6c667-0fd8-4b3f-bc68-7bdda3882685/thumbnail_78a5c7cb.jpg",
  },
  {
    id: 11,
    title: "BETOH HAYAAR",
    artist: "EREL LEV",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/e93a1bfc-b8b7-4ab5-ab3b-ae1dba365d35/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/e93a1bfc-b8b7-4ab5-ab3b-ae1dba365d35/thumbnail_1cb5841d.jpg",
  },
  {
    id: 12,
    title: "MAMI",
    artist: "EREL LEV",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/8f841fc1-78fd-4c3d-bdfe-f69cc33cb401/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/8f841fc1-78fd-4c3d-bdfe-f69cc33cb401/thumbnail_c4d47855.jpg",
  },
];

// ─── Social Content ───────────────────────────────────────────────────────────

export const socialContent: VideoItem[] = [
  {
    id: 1,
    title: "ADINOOT",
    artist: "GON BEN ARI",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/d1b2bb0b-4f25-47ca-a05b-7588f00042e3/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/d1b2bb0b-4f25-47ca-a05b-7588f00042e3/thumbnail_100d2145.jpg",
  },
  {
    id: 2,
    title: "ALBUM TEASER",
    artist: "BNAYA SHANANI",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/edd9ce4e-5bbc-40c3-b1a3-7ff5ce08d990/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/edd9ce4e-5bbc-40c3-b1a3-7ff5ce08d990/thumbnail_96107d9c.jpg",
  },
  {
    id: 3,
    title: "'NISHERET BAMAKOM'",
    artist: "DANIEL RUBIN",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/d6dbf638-3ea7-40e5-a7f0-120b5c491477/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/d6dbf638-3ea7-40e5-a7f0-120b5c491477/thumbnail.jpg",
  },
  {
    id: 4,
    title: "'CONVERSATION'",
    artist: "ALMA GOV & AVNER TOUEG",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/c62fa17f-4503-4df2-a823-2dffe4953322/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/c62fa17f-4503-4df2-a823-2dffe4953322/thumbnail_9da40bdb.jpg",
  },
  {
    id: 5,
    title: "EXHIBITION",
    artist: "GADI ZEDER",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/61eb9d8d-784f-4008-8279-2a31af2537ed/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/61eb9d8d-784f-4008-8279-2a31af2537ed/thumbnail_b2318ab6.jpg",
  },
  {
    id: 6,
    title: "'DIZINGOF'",
    artist: "HELEL SANDMAN",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/674ddbce-4c8d-4b5c-a617-dbed69eca644/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/674ddbce-4c8d-4b5c-a617-dbed69eca644/thumbnail_a591f280.jpg",
  },
  {
    id: 7,
    title: "BOAZ KRAUZER",
    artist: "",
    year: "2026",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/3bda94ed-8903-42eb-9161-8d62c9047318/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/3bda94ed-8903-42eb-9161-8d62c9047318/thumbnail_3112afee.jpg",
  },
];

// ─── Cover Art ────────────────────────────────────────────────────────────────

export const coverArt: StillItem[] = [
  { title: "BNAYA SHANANI - 'LOTO'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/BNAYA%20SHANANI/2025_Bnaya%20Shanani_V05.jpg' },
  { title: "DANIEL IZHAKI - 'NISHAR BAAVIR'", subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/DANIEL%20IZHAKY/000006440006.jpg' },
  { title: "EREL LEV - 'A E H ?'", subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/EREL%20LEV1/IMG_1395.JPG' },
  { title: "EREL LEV - 'MEAL HAANANIM'", subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/EREL%20LEV2/IMG_3299.JPG' },
  { title: "HELEL SANDMAN - 'KAROV'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/HELEL%20SANDMAN/%D7%A7%D7%90%D7%91%D7%A8%20%D7%90%D7%9C%D7%91%D7%95%D7%9D.PNG' },
  { title: "HELEL SANDMAN - 'DIZINGOF'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/HELEL%20SANDMAN/%D7%A7%D7%90%D7%91%D7%A8%20%D7%93%D7%99%D7%96%D7%A0%D7%92%D7%95%D7%A3.png' },
  { title: "HELEL SANDMAN - 'MEHUSIN'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/HELEL%20SANDMAN/%D7%A7%D7%90%D7%91%D7%A8%20%D7%9E%D7%9B%D7%95%D7%A1%D7%99%D7%9D.png' },
  { title: "HELEL SANDMAN - 'TOFESET'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/HELEL%20SANDMAN/%D7%A7%D7%90%D7%91%D7%A8%20%D7%AA%D7%95%D7%A4%D7%A1%D7%AA.png' },
  { title: "ITAY DALUMI - 'SHIR HAYONA'", subtitle: '2026', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/ITAY%20DALUMI/%D7%A9%D7%99%D7%A8%20%D7%94%D7%99%D7%95%D7%A0%D7%94-%20NMC%20(2400%20x%202400%20%D7%A4%D7%99%D7%A7%D7%A1%D7%9C)%20(3).PNG' },
  { title: 'NETTA ANDORN', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/NETTA%20ANDORN/FullSizeRender.jpg' },
  { title: "OLLIE DANON - 'HASHEVER HASURI-AFRIKAI'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/OLLIE%20DANON/IMG_6205.PNG' },
  { title: "OLLIE DANON - 'HASHEVER HASURI-AFRIKAI'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/OLLIE%20DANON/IMG_6202.JPG' },
  { title: "OLLIE DANON - 'SHIRIMEAETMOL'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/OLLIE%20DANON/IMG_6201.JPG' },
  { title: "OLLIE DANON - 'MEHORATI'", subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/COVER%20ART/OLLIE%20DANON/IMG_6203.JPG' },
];

// ─── Portraits ────────────────────────────────────────────────────────────────

/** Used by the homepage StillsGrid */
export const portraitsStills: StillItem[] = [
  { title: 'ROE ITON', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730001%202.JPG' },
  { title: 'ROE ITON', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730003%202.JPG' },
  { title: 'ALLAN TUNE', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/ALLAN%20TUNE/000010110003%202.JPG' },
  { title: 'ALLAN TUNE', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/ALLAN%20TUNE/IMG_9517_Original.jpg' },
  { title: 'BEN BEN', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BEN%20OHANA/B43AB468-875A-4234-BF7F-9D57E424918D.JPG' },
  { title: 'BEN BEN', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BEN%20OHANA/7B9909FC-C3FB-4229-9E2C-78EA4DDD08A8.JPG' },
  { title: 'BEN BEN', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BEN%20OHANA/000064940004.tif' },
  { title: 'BNAYA SHANANI', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BNAYA%20SHANANI/32C12F2A-D94C-4EFF-AE4F-26E3978E7710.JPG' },
  { title: 'BNAYA SHANANI', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BNAYA%20SHANANI/5248A010-41B8-44ED-AB54-2D72F9406222.JPG' },
  { title: 'BNAYA SHANANI', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BNAYA%20SHANANI/A44CD240-760E-49DE-9DCE-73A5B4753AFF.JPG' },
  { title: 'BNAYA SHANANI', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/BNAYA%20SHANANI/6143884C-236E-4AC6-8C99-8549D5158EEE.JPG' },
  { title: 'DANIEL IZHAKI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/daniel%20izhaki/C4550080-9BA3-4C87-9577-68199245ADB8.JPG' },
  { title: 'DANIEL IZHAKI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/daniel%20izhaki/C8C4E601-E891-4961-8797-CD54EC788F47.JPG' },
  { title: 'DANIEL IZHAKI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/daniel%20izhaki/D4312820-7A26-4CAD-9F96-576D7B184853.JPG' },
  { title: 'DANIEL IZHAKI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/daniel%20izhaki/IMG_9518.JPG' },
  { title: 'EREL LEV', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/EREL%20LEV/26721572-4BF6-4ACE-B0BC-6D7FE6340FB3.JPG' },
  { title: 'EREL LEV', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/EREL%20LEV/A260BEBC-D75C-4075-8FF2-7EE467C6126C.JPG' },
  { title: 'EREL LEV', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/EREL%20LEV/E18E0B6A-0F11-4EB6-B062-0159B5E44F49.JPG' },
  { title: 'EREL LEV', subtitle: '2025', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/EREL%20LEV/60A42851-D8EC-4B7F-90F5-2DA956E3DC7C.JPG' },
  { title: 'GON BEN ARI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/GON%20BEN%20ARI/239345F4-7104-44E9-8215-4D398D28280B.JPG' },
  { title: 'GON BEN ARI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/GON%20BEN%20ARI/2CBDA242-0CFF-40CF-BBE0-58A786D9BA05.JPG' },
  { title: 'GON BEN ARI', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/GON%20BEN%20ARI/F3BA1939-D7DC-4BFE-80A9-A906B423E159.JPG' },
  { title: 'HELEL SANDMAN', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/HELEL%20SANDMAN/0FC1C3D4-3A5B-40DF-BC58-A549CC8620BD.JPG' },
  { title: 'HELEL SANDMAN', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/HELEL%20SANDMAN/6B0BF745-2AEE-46E6-AC45-AED8A9098CED.JPG' },
  { title: 'HELEL SANDMAN', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/HELEL%20SANDMAN/A313890E-A721-4343-9C49-AD2632011CCC.JPG' },
  { title: 'HELEL SANDMAN', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/HELEL%20SANDMAN/IMG_1709%202.JPG' },
  { title: 'MEORI NEVO', subtitle: '2024', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/MEORI%20NEVO/AC2BC1A0-667E-4974-971A-1440AC60AD97.JPG' },
  { title: 'MEORI NEVO', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/MEORI%20NEVO/FED7BB79-9C8C-4A9A-A8DC-4C6D30529D09.JPG' },
  { title: 'NETTA ANDORN', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/NETTA%20ANDORN/IMG_3907.JPG' },
  { title: 'NETTA ANDORN', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/NETTA%20ANDORN/IMG_8466.JPG' },
  { title: 'NETTA ANDORN', subtitle: '2023', src: 'https://Eviatarstills2006.b-cdn.net/PORTRAITS/NETTA%20ANDORN/IMG_8441.JPG' },
];

/** Used by the Portraits gallery page */
export const portraits: PortraitProject[] = [
  {
    id: "portrait-roe-iton-1",
    title: "ROE ITON",
    category: "Portraits",
    year: "2025",
    coverImage: "https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730001%202.JPG",
    images: ["https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730001%202.JPG"],
  },
  {
    id: "portrait-roe-iton-2",
    title: "ROE ITON",
    category: "Portraits",
    year: "2025",
    coverImage: "https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730003%202.JPG",
    images: ["https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730003%202.JPG"],
  },
  {
    id: "portrait-roe-iton-3",
    title: "ROE ITON",
    category: "Portraits",
    year: "2025",
    coverImage: "https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730001%202.JPG",
    images: ["https://Eviatarstills2006.b-cdn.net/PORTRAITS/ROE%20ITON/000004730003%202.JPG"],
  },
];

// ─── Personal Projects ────────────────────────────────────────────────────────

export const personalProjectsStills: StillItem[] = [
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC03288.jpg',
  },
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://Eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC03291.jpg',
  },
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://Eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC03302.jpg',
  },
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://Eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC04126.jpg',
  },
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://Eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC04128.jpg',
  },
  {
    title: 'POLAROID',
    subtitle: '2025',
    src: 'https://Eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC04132.jpg',
  },
];

export const personalProjects: PortraitProject[] = [
  {
    id: "polaroid-1",
    title: "POLAROID - DSC03288",
    category: "Personal Projects",
    year: "2025",
    coverImage: "https://eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC03288.jpg",
    images: ["https://eviatarstills2006.b-cdn.net/personal%20projects/POLAROID/DSC03288.jpg"],
  },
];

export const personalProjectVideos: VideoItem[] = [
  {
    id: 1,
    title: "SAFE SPACE",
    artist: "",
    year: "2026",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/2940c27e-39c9-450a-a9a2-b158c31d1e8b/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/2940c27e-39c9-450a-a9a2-b158c31d1e8b/thumbnail_6c9ea91b.jpg",
  },
  {
    id: 2,
    title: "REBORN",
    artist: "",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/61cd034d-7a24-4a49-8186-47be581f7fdd/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/61cd034d-7a24-4a49-8186-47be581f7fdd/thumbnail.jpg",
  },
  {
    id: 3,
    title: "THE END OF DAYS",
    artist: "",
    year: "2025",
    src: "",
    hlsSrc: "https://vz-32dec38e-34a.b-cdn.net/c88fec16-9999-4a29-a972-b6cfda35ea08/playlist.m3u8",
    thumb: "https://vz-32dec38e-34a.b-cdn.net/c88fec16-9999-4a29-a972-b6cfda35ea08/thumbnail_d8f38387.jpg",
  },
];
