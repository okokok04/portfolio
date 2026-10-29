// ============================================================
// CONTENT — portfolio positioned for "YouTube content production & YouTube SEO".
// Each project only needs: title, subtitle, intro, body, videos,
// metrics, channel and image paths. `slug` becomes /du-an/<slug>.
// Channel numbers pulled straight from YouTube (10/2026) — refresh when needed.
// ============================================================

export const img = {
  heroPhoto: '/images/hero-portrait.jpg',
  // Dedicated portrait for the "Hi there!" block in AboutSection.
  aboutPhoto: '/images/about-portrait.jpg',
};

export const profile = {
  name: 'Lê Văn Mạnh',
  role: 'YouTube SEO',
  year: '2026',
  location: 'Me Tri, Tu Liem, Hanoi',
  email: 'manhcotlee00@gmail.com',
  phone: '0333 669 748',
  phoneHref: '+84333669748',
  avatar: img.heroPhoto,
  // One-line positioning shown under the bio in AboutSection.
  tagline: 'YouTube SEO + content production',
  bio: 'Experienced in YouTube SEO, market research, data analysis and channel growth strategy. I lead teams, optimise content and judge performance through YouTube Analytics. I also build tools, AI workflows and automations into the production process to raise output. Focused on going deeper into YouTube SEO, channel growth and data-driven channel management.',
  // Direct contact channels. `id` matches the icon set in ContactSection.
  socials: [
    { id: 'facebook', label: 'Facebook', handle: 'vinn.man.31', href: 'https://www.facebook.com/vinn.man.31/' },
    { id: 'instagram', label: 'Instagram', handle: 'l.zeus03', href: 'https://www.instagram.com/l.zeus03/' },
    { id: 'telegram', label: 'Telegram', handle: '@lzeus003v', href: 'https://t.me/lzeus003v' },
  ],
};

export const education = [
  { period: '2021 – 2025', school: 'Thang Long University', major: 'Computer Science', note: 'GPA 7.9 / 10 · Languages: Vietnamese, basic English.' },
];

// Programme certificates, shown right under the education block.
export const certificates = [
  { period: '04/2026 – 09/2026', title: 'Stellar x Rise In', note: 'Earned the Stellar x Rise In certificate.' },
  { period: '07/2026 – 09/2026', title: 'Midnight x Rise In', note: 'Earned the Midnight x Rise In certificate.' },
];

export const experience = [
  {
    period: '2023 – 2024',
    company: 'SUN*',
    role: 'Intern Developer',
    points: ['Built websites, apps and internal tools for data management and analysis.', 'Shipped automation with APIs, Google Apps Script and AI.', 'Streamlined operations and cut manual steps out of the workflow.'],
  },
  {
    period: '2024 – 2025',
    company: 'BG MEDIA',
    role: 'YouTube SEO',
    points: ['Owned the SEO strategy, content optimisation and growth of a Relaxing music channel.', 'Researched the market, audited competitors and spotted untapped channels.'],
  },
  {
    period: '2025 – 2026',
    company: 'UPPOW MEDIA',
    role: 'SEO Lead',
    points: ['Led the YouTube SEO team and improved performance for the KID and Nolyrics channels.', 'Read YouTube Analytics to propose channel growth strategy.', 'Built tools, AI workflows and automation; handled network partnerships.'],
  },
  {
    period: '2024 – 2026',
    company: 'WEB3 BLOCKCHAIN COMMUNITY',
    role: 'Regional Lead / Moderator / Ambassador',
    points: ['Connected partners, KOLs/KOCs and creators for campaigns.', 'Ran events and AMAs; produced content and grew the community.'],
  },
];

// Software used for YouTube content production.
// `id` matches ToolLogo (src/components/portfolio/ToolLogo.jsx) to draw the logo.
// `used: false` = recommended to add, shown as a separate group in the CV box.
export const tools = [
  { id: 'premiere', name: 'Premiere Pro', role: 'Editing, cuts, multi-track timeline', used: true },
  { id: 'photoshop', name: 'Photoshop', role: 'Thumbnails, retouch, image cleanup', used: true },
  { id: 'canva', name: 'Canva', role: 'Fast layouts, thumbnails, social assets', used: true },
  { id: 'davinci', name: 'DaVinci Resolve', role: 'Colour grading, colour & audio finishing', used: true },
  { id: 'aftereffects', name: 'After Effects', role: 'Motion graphics, intros, lower-thirds', used: false },
  { id: 'audition', name: 'Audition', role: 'Noise cleanup, voice balance, music beds', used: false },
  { id: 'capcut', name: 'CapCut', role: 'Shorts, TikTok, Reels — quick cuts', used: false },
  { id: 'ai', name: 'AI Toolkit', role: 'Scripts, voice, images, auto subtitles', used: false },
];

// Soft skills for YouTube content production, grouped for easy scanning in the CV box.
export const softSkillGroups = [
  {
    title: 'Content & channel',
    items: ['YouTube SEO', 'Keyword research', 'Script & storytelling', 'Thumbnail thinking'],
  },
  {
    title: 'Data & operations',
    items: ['YouTube Analytics', 'Content calendar', 'Title A/B testing', 'Data-led optimisation'],
  },
  {
    title: 'Working with people',
    items: ['Team leadership', 'Briefs & feedback', 'KOL/KOC outreach', 'Deadline management'],
  },
];

// Building my own tools to shorten the repetitive parts of the content workflow.
export const tooling = {
  title: 'Building tools for my own workflow',
  body: 'When a step repeats too many times, I write a tool to do it: pull channel numbers into one place, export reports, suggest titles, batch-process thumbnails.',
  items: ['Google Apps Script', 'APIs & webhooks', 'Automation / workflow', 'Custom dashboards', 'Prompts & AI agents'],
};

export const softSkills = ['YouTube SEO', 'Market research', 'YouTube Analytics', 'Tool building', 'Title & thumbnail optimisation', 'Team leadership', 'Work planning', 'Applied AI'];

// Table of contents: 10 notes = 10 real tasks in a YouTube SEO role.
// `to` starting with "/" opens a project page, "#" jumps to a section on this page.
export const toc = [
  { label: 'CHANNEL STRATEGY', to: '/du-an/dodobee' },
  { label: 'KIDS CONTENT', to: '/du-an/dodobee' },
  { label: 'CHANNEL SETUP', to: '/du-an/dudusingalong' },
  { label: 'MUSIC 24/7', to: '/du-an/dudusingalong' },
  { label: 'KEYWORD RESEARCH', to: '/du-an/pianoodyssey4k' },
  { label: 'SEASONAL SEO', to: '/du-an/pianoodyssey4k' },
  { label: 'THUMBNAIL · CTR', to: '#du-an' },
  { label: 'ANALYTICS', to: '#du-an' },
  { label: 'ARTIST', to: '#thu-vien' },
  { label: 'CV · TOOL', to: '#cv' },
];

// 3 featured channels. `type: 'youtube'` makes the detail page use YoutubeSpread.
// `videos[].id` is the YouTube ID — used for both the thumbnail and the channel link.
export const projects = [
  {
    slug: 'dodobee',
    title: 'DODOBEE',
    subtitle: '3D kids songs — 1.44M subs, 32.7M views from 7 videos',
    category: 'KIDS · YOUTUBE SEO · CHANNEL GROWTH',
    type: 'youtube',
    year: '2019 – 2026',
    role: 'Keyword strategy · Metadata optimisation · Thumbnail system',
    cover: '/images/youtube/dodobee-01.jpg',
    channel: {
      name: 'DoDoBee - Kids Songs',
      handle: '@dodobee',
      url: 'https://www.youtube.com/@dodobee',
      subs: '1.44M',
      views: '32.7M',
      videos: '7',
      since: '2019',
      avg: '4.7M',
    },
    intro:
      'A fully self-produced 3D kids channel: animation and original songs made in-house. I own the SEO side — picking keyword clusters by theme, rewriting titles, descriptions and tags for the whole library, and keeping thumbnails consistent under one formula.',
    body: [
      'The core clusters are nursery rhymes, baby shark, wheels on the bus and animal songs — terms with steady year-round demand that do not depend on a season. Every video is mapped to one primary cluster and two secondary ones, placed straight into the title and the first three lines of the description.',
      'With only 7 videos in the library, each one has to work like a landing page: long titles carrying multiple keyword variants, descriptions with timestamps, playlists grouped by song type. The result is an average of 4.7M views per video — well above other kids channels with a similar subscriber count.',
    ],
    focus: ['Keyword clustering', 'Multi-variant titles', 'Thumbnail system', 'Playlists by song', 'Three-line metadata'],
    formulas: [
      'BABY SHARK SONGS | Swimming Song +More Kids Songs & Nursery Rhymes',
      'My Cat Song | Animal Song | <brand> Kids Songs & Nursery Rhymes',
      'Happy Birthday Song | Sing-along Song for Kids + More Nursery Rhymes',
    ],
    metrics: [
      { value: '1.44M', label: 'subscribers' },
      { value: '32.7M', label: 'total views' },
      { value: '4.7M', label: 'average views / video' },
      { value: '16.6M', label: 'top video' },
    ],
    videos: [
      { id: 'q1SGgXCrwdM', title: 'BABY SHARK SONGS | Swimming Song +More Kids Songs', views: '16.6M', duration: '2:12', thumb: '/images/youtube/dodobee-01.jpg' },
      { id: 'A2k3HjwBNPo', title: 'My Cat Song | Animal Song | DoDoBee Kids Songs', views: '5.4M', duration: '2:05', thumb: '/images/youtube/dodobee-02.jpg' },
      { id: 'f5wVMlTbBHU', title: 'Nursery Rhymes, Kids Songs | Kids Cartoon', views: '3.1M', duration: '2:11', thumb: '/images/youtube/dodobee-03.jpg' },
      { id: 'M5cmr_gcqpA', title: 'Baby Cartoons + More Nursery Rhymes, Songs for Children', views: '2.9M', duration: '1:22', thumb: '/images/youtube/dodobee-04.jpg' },
      { id: 'KyL4m7Kj4PY', title: 'CARTOON, DODOBEE BABY SHARK, NURSERY RHYMES', views: '2.4M', duration: '2:56', thumb: '/images/youtube/dodobee-05.jpg' },
      { id: '79yxGq7O-yA', title: 'Happy Birthday Song | Sing-along Song for Kids', views: '772K', duration: '17:17', thumb: '/images/youtube/dodobee-06.jpg' },
    ],
  },
  {
    slug: 'dudusingalong',
    title: 'DUDU SING ALONG',
    subtitle: 'A brand-new kids channel — 203K subs, plus a music branch',
    category: 'KIDS · CHANNEL SETUP · A/B TEST',
    type: 'youtube',
    year: '2026',
    role: 'Channel built from zero · Publishing schedule · 48h performance checks',
    cover: '/images/youtube/dudusingalong-01.jpg',
    channel: {
      name: 'DuDu Sing Along',
      handle: '@dudusingalong',
      url: 'https://www.youtube.com/@dudusingalong',
      subs: '203K',
      views: '452K',
      videos: '9',
      since: '2026',
      avg: '50K',
    },
    intro:
      'A brand-new kids channel built from zero: locking the niche, setting up the title system, scheduling uploads, and reading each video for the first 7 days to decide whether to push it or stop.',
    body: [
      'Early on the channel had no keyword signal of its own, so the fastest route was to ride songs that already carry demand: helping songs, laughing song, job and career songs, play safe song. Titles follow the niche formula exactly so the algorithm files the channel next to the big players.',
      'In parallel I tested a second branch on the same channel: 1930s–1940s jazz background music. That format runs long, costs little to produce and can loop indefinitely — the first video hit 142K views, well above the kids videos, so the branch stayed and now carries watch time for the channel.',
    ],
    focus: ['New channel', 'Consistent publishing', 'Title A/B testing', 'Long-form music branch', '48h read-out'],
    formulas: [
      '<Song title> | Songs For Kids | Nursery Rhymes & Kids Songs',
      'Vintage Evening Radio Jazz – 1930s 1940s Smooth Swing & Vinyl',
    ],
    metrics: [
      { value: '203K', label: 'subscribers' },
      { value: '452K', label: 'total views' },
      { value: '142K', label: 'top video' },
      { value: '9', label: 'videos published' },
    ],
    videos: [
      { id: '3uZUDc0SbKs', title: 'Vintage Evening Radio Jazz – 1930s 1940s Smooth Swing', views: '142K', duration: 'long', thumb: '/images/youtube/dudusingalong-01.jpg' },
      { id: 'oZa8gzcd2E0', title: 'Vintage Evening Radio Jazz – Vinyl Background Music', views: '93.6K', duration: 'long', thumb: '/images/youtube/dudusingalong-02.jpg' },
      { id: 'lEEH0VlkaWk', title: 'Helping Songs | Good Manner For Kids', views: '22.9K', duration: '2:47', thumb: '/images/youtube/dudusingalong-03.jpg' },
      { id: 'g3UANE97wUg', title: 'The Laughing Song | Laughing With Family', views: '20.9K', duration: '2:20', thumb: '/images/youtube/dudusingalong-04.jpg' },
      { id: 'tk4h28RVgGg', title: 'Job And Career Songs | Educational Songs', views: '16K', duration: '2:07', thumb: '/images/youtube/dudusingalong-05.jpg' },
      { id: 'WsXqP1VlVAY', title: 'Old MacDonald Had A Farm | Nursery Rhymes', views: '2.2K', duration: '2:24', thumb: '/images/youtube/dudusingalong-06.jpg' },
    ],
  },
  {
    slug: 'pianoodyssey4k',
    title: 'PIANO ODYSSEY 4K',
    subtitle: 'Seasonal 4K background music — 139 videos, 5.8M views',
    category: 'MUSIC · SEASONAL SEO · VOLUME PUBLISHING',
    type: 'youtube',
    year: '2025 – 2026',
    role: 'Seasonal keyword clusters · Title architecture · Playlists by country',
    cover: '/images/youtube/pianoodyssey4k-01.jpg',
    channel: {
      name: 'Piano Odyssey 4K',
      handle: '@pianoodyssey4k',
      url: 'https://www.youtube.com/@pianoodyssey4k',
      subs: '11.1K',
      views: '5.8M',
      videos: '139',
      since: '2025',
      avg: '41K',
    },
    intro:
      'A 4K background music channel: nature footage over relaxing piano. This is where I tested a seasonal publishing model — one keyword cluster per season, one playlist per country.',
    body: [
      'The whole library runs on one fixed title formula: location + season + 4K + scene + benefit. Change the location and you have a new video cluster that still sits inside the exact keyword set background-music listeners type into search.',
      'Each video runs about three hours, split into chapters with timestamps in the description and grouped into playlists by country. The autumn cluster alone puts the top video at 171K views — 4× the channel average — while the rest of the library keeps publishing on the same formula.',
    ],
    focus: ['Seasonal keyword clusters', 'Title formula', 'Chapters & timestamps', 'Playlists by country', 'Batch production'],
    formulas: [
      '<Location> Autumn 4K 🍁 | <scene> & Relaxing Piano Music for Stress Relief',
      '<Location> 4K UHD | <scene> with Relaxing Music',
    ],
    metrics: [
      { value: '171K', label: 'top video', lead: true },
      { value: '41K', label: 'average views / video' },
      { value: '139', label: 'videos published' },
      { value: '11.1K', label: 'subscribers' },
    ],
    videos: [
      { id: 'xMCxuMEOuF8', title: 'Shirakawa-go in Autumn 4K — Japan’s Most Beautiful Village', views: '171K', duration: '3:07:13', thumb: '/images/youtube/pianoodyssey4k-01.jpg' },
      { id: 'bTFi8xjOd_A', title: 'New England 4K Amazing Autumn Film — Beautiful Nature Scenery', views: '117K', duration: '3:14:32', thumb: '/images/youtube/pianoodyssey4k-02.jpg' },
      { id: '7JR7erWm3gM', title: 'Kyoto, Japan in Autumn 4K — Amazing Beautiful Nature Scenery', views: '92K', duration: '3:05:40', thumb: '/images/youtube/pianoodyssey4k-03.jpg' },
      { id: 'GfUaR_uE67w', title: 'Germany in Autumn 4K 🍂 Alpine Villages, Golden Forests', views: '75K', duration: '3:05:34', thumb: '/images/youtube/pianoodyssey4k-04.jpg' },
      { id: '_0NA2lqZuEY', title: 'Hokkaido, Japan in Autumn 4K — Beautiful Nature Scenery', views: '63K', duration: '3:07:14', thumb: '/images/youtube/pianoodyssey4k-05.jpg' },
      { id: 'SqkBcYTC9b4', title: 'Nikko, Japan in Autumn 4K — Beautiful Nature Scenery', views: '49K', duration: '3:07:15', thumb: '/images/youtube/pianoodyssey4k-06.jpg' },
    ],
  },
];

// The production run for one video — replaces the old "Logo folio" block.
// Every step names its output and the metric it moves, so the way of working is readable.
export const workflow = {
  title: 'The process behind one video',
  note: 'Seven steps I use on both the kids channels and the 4K music channel. Each step has a concrete output, so it can be handed over or checked without asking me again.',
  steps: [
    {
      no: '01',
      title: 'Topic research',
      output: 'A list of 20 ideas with search volume and competition level',
      metric: 'SEARCH DEMAND',
      detail: 'Scan keywords by niche and cross-check the top 10 results to drop anything the big channels already own.',
    },
    {
      no: '02',
      title: 'Lock the keywords',
      output: '1 primary keyword + 2 secondary keywords per video',
      metric: 'RELEVANCE',
      detail: 'The cluster has to appear intact in the title, the first three description lines and the file name.',
    },
    {
      no: '03',
      title: 'Script & retention beats',
      output: 'A script with a 15-second hook and a chapter timeline',
      metric: 'AVD',
      detail: 'The hook states exactly what the viewer came for; chapters create natural pausing points so nobody scrubs.',
    },
    {
      no: '04',
      title: 'Production & edit',
      output: 'Finished cut, normalised audio, consistent colour',
      metric: 'WATCH TIME',
      detail: 'Premiere / DaVinci for the edit, Audition for voice and music beds, 4K for the scenery formats.',
    },
    {
      no: '05',
      title: 'Title & thumbnail',
      output: '3 title options, 3 thumbnail options',
      metric: 'CTR',
      detail: 'Ship one, keep the other two to swap after 48h if CTR lands under the channel average.',
    },
    {
      no: '06',
      title: 'Publish & metadata',
      output: 'Description with timestamps, tags, end screen, playlist, schedule',
      metric: 'SESSION',
      detail: 'Every video must pull the viewer to at least one more in the same cluster, via playlist or end screen.',
    },
    {
      no: '07',
      title: 'Measure & iterate',
      output: '48h / 7-day / 28-day report, then a push – revise – stop call',
      metric: 'RETENTION',
      detail: 'Read CTR, AVD and traffic sources in Analytics, then write one line of conclusion for next time.',
    },
  ],
};

// Artwork for the "Artist" section — drop files into public/images/artist and it works.
export const artwork = [
  { src: '/images/artist/artist-01.jpg', alt: 'Artist work 01', span: 'col-span-2 row-span-2' },
  { src: '/images/artist/artist-02.jpg', alt: 'Artist work 02' },
  { src: '/images/artist/artist-03.jpg', alt: 'Artist work 03' },
  { src: '/images/artist/artist-07.jpg', alt: 'Artist work 07', span: 'col-span-2' },
  { src: '/images/artist/artist-05.jpg', alt: 'Artist work 05', span: 'col-span-2' },
  { src: '/images/artist/artist-04.jpg', alt: 'Artist work 04' },
  { src: '/images/artist/artist-08.jpg', alt: 'Artist work 08', span: 'col-span-1 row-span-2' },
  { src: '/images/artist/artist-06.jpg', alt: 'Artist work 06', span: 'col-span-2' },
  { src: '/images/artist/artist-09.jpg', alt: 'Artist work 09' },
];
