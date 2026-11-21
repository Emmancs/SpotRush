const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure directories exist
const dirs = [
  'public',
  'public/sounds',
  'public/puzzles/animals/level-001',
  'public/puzzles/animals/level-002',
  'public/puzzles/fantasy/level-001',
  'public/puzzles/underwater/level-001',
  'public/puzzles/kitchen/level-001',
  'public/puzzles/space/level-001',
  'src/assets/images'
];

dirs.forEach(d => {
  const full = path.join(__dirname, '..', d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'src/assets/images/.gitkeep'), '');

// 1. Generate Favicon from logo.svg
async function generateFavicon() {
  const logoPath = path.join(__dirname, '..', 'public/logo.svg');
  const faviconPath = path.join(__dirname, '..', 'public/favicon.ico');
  const svgBuffer = fs.readFileSync(logoPath);
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  console.log('Generated favicon.ico');
}

// 2. Generate minimal valid MP3 audio files
function generateMinimalMp3(outputPath, durationSeconds = 0.5) {
  const frameHeader = Buffer.from([0xFF, 0xFB, 0x90, 0x64]);
  const frameData = Buffer.alloc(414, 0x55);
  const singleFrame = Buffer.concat([frameHeader, frameData]);
  
  const frameCount = Math.max(5, Math.floor(durationSeconds * 38));
  const frames = [];
  for (let i = 0; i < frameCount; i++) {
    frames.push(singleFrame);
  }
  fs.writeFileSync(outputPath, Buffer.concat(frames));
  console.log(`Generated audio: ${path.basename(outputPath)}`);
}

// 3. SVG Scene Generators for each category
function createSavannahSvg(isModified, levelNum = 1) {
  if (levelNum === 1) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ff7e47" />
          <stop offset="50%" stop-color="#fca311" />
          <stop offset="100%" stop-color="#ffd166" />
        </linearGradient>
        <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#b45309" />
          <stop offset="30%" stop-color="#78350f" />
          <stop offset="100%" stop-color="#451a03" />
        </linearGradient>
      </defs>
      
      <rect width="1000" height="480" fill="url(#sky)" />
      
      <circle cx="200" cy="220" r="75" fill="#fef08a" opacity="0.9" />
      <circle cx="200" cy="220" r="100" fill="#fef08a" opacity="0.3" />

      <polygon points="0,480 180,380 340,480" fill="#c2410c" opacity="0.5" />
      <polygon points="260,480 480,350 700,480" fill="#9a3412" opacity="0.6" />
      <polygon points="620,480 820,390 1000,480" fill="#c2410c" opacity="0.5" />

      <rect y="470" width="1000" height="230" fill="url(#ground)" />
      
      <path d="M500,480 Q520,300 540,220 Q560,300 580,480 Z" fill="#291205" />
      <ellipse cx="540" cy="210" rx="140" ry="25" fill="#14532d" />
      <ellipse cx="480" cy="180" rx="90" ry="20" fill="#166534" />
      <ellipse cx="600" cy="190" rx="100" ry="22" fill="#15803d" />
      <ellipse cx="530" cy="160" rx="70" ry="18" fill="#166534" />

      <g transform="translate(680, 260)">
        <ellipse cx="80" cy="180" rx="50" ry="32" fill="#eab308" stroke="#ca8a04" stroke-width="3" />
        <rect x="50" y="200" width="8" height="110" fill="#ca8a04" />
        <rect x="68" y="200" width="8" height="110" fill="#a16207" />
        <rect x="95" y="200" width="8" height="110" fill="#ca8a04" />
        <rect x="110" y="200" width="8" height="110" fill="#a16207" />
        <path d="M50,180 L60,30 L75,30 L90,180 Z" fill="#eab308" />
        <ellipse cx="65" cy="25" rx="14" ry="10" fill="#eab308" />
        <circle cx="68" cy="24" r="2" fill="#000" />
        <polygon points="62,18 64,8 67,18" fill="#a16207" />
        <polygon points="70,18 72,8 75,18" fill="#a16207" />
        <path d="M125,185 Q140,220 135,245" stroke="#ca8a04" stroke-width="4" fill="none" />
        <circle cx="135" cy="245" r="4" fill="#713f12" />
        <circle cx="64" cy="90" r="6" fill="#854d0e" />
        <circle cx="70" cy="130" r="7" fill="#854d0e" />
        <circle cx="78" cy="180" r="8" fill="#854d0e" />
        <circle cx="95" cy="175" r="7" fill="#854d0e" />
      </g>

      <g transform="translate(320, 420)">
        <ellipse cx="60" cy="60" rx="40" ry="25" fill="#f8fafc" stroke="#334155" stroke-width="2" />
        <rect x="35" y="75" width="6" height="60" fill="#334155" />
        <rect x="48" y="75" width="6" height="60" fill="#1e293b" />
        <rect x="75" y="75" width="6" height="60" fill="#334155" />
        <rect x="88" y="75" width="6" height="60" fill="#1e293b" />
        <path d="M40,60 L20,20 L35,15 L50,55 Z" fill="#f8fafc" />
        <ellipse cx="20" cy="18" rx="10" ry="8" fill="#f8fafc" />
        <line x1="45" y1="50" x2="45" y2="75" stroke="#0f172a" stroke-width="3" />
        <line x1="55" y1="45" x2="55" y2="75" stroke="#0f172a" stroke-width="3" />
        <line x1="68" y1="45" x2="68" y2="75" stroke="#0f172a" stroke-width="3" />
        <line x1="80" y1="50" x2="80" y2="72" stroke="#0f172a" stroke-width="3" />
      </g>

      <path d="M120,530 L125,505 L130,530 L135,500 L140,530" stroke="#ca8a04" stroke-width="3" fill="none" />
      <path d="M450,560 L455,535 L460,560 L465,530 L470,560" stroke="#ca8a04" stroke-width="3" fill="none" />
      <path d="M720,540 L725,515 L730,540 L735,510 L740,540" stroke="#ca8a04" stroke-width="3" fill="none" />

      <!-- DIFFERENCE 1: (22.5%, 31.0%) -> Birds flock near sun -->
      ${!isModified ? `
        <g id="diff-1-original">
          <path d="M210,210 Q218,202 225,210 Q232,202 240,210" stroke="#451a03" stroke-width="3" fill="none" />
          <path d="M230,225 Q236,218 242,225 Q248,218 255,225" stroke="#451a03" stroke-width="2.5" fill="none" />
          <path d="M200,228 Q205,222 211,228 Q216,222 222,228" stroke="#451a03" stroke-width="2.5" fill="none" />
        </g>
      ` : `
        <g id="diff-1-modified">
          <ellipse cx="225" cy="217" rx="18" ry="8" fill="#fed7aa" opacity="0.6" />
        </g>
      `}

      <!-- DIFFERENCE 2: (74.0%, 46.5%) -> Giraffe neck spot at (x=740, y=325) -->
      ${!isModified ? `
        <circle id="diff-2-original" cx="742" cy="325" r="10" fill="#854d0e" stroke="#713f12" stroke-width="2" />
      ` : `
        <polygon id="diff-2-modified" points="742,315 745,322 752,325 745,328 742,335 739,328 732,325 739,322" fill="#ef4444" />
      `}

      <!-- DIFFERENCE 3: (38.0%, 68.0%) -> Zebra tail at (x=380, y=476) -->
      ${!isModified ? `
        <path id="diff-3-original" d="M400,470 Q415,490 380,480" stroke="#1e293b" stroke-width="4" fill="none" />
      ` : `
        <circle id="diff-3-modified" cx="380" cy="476" r="8" fill="none" stroke="#eab308" stroke-width="4" />
      `}

      <!-- DIFFERENCE 4: (86.5%, 78.0%) -> Wildflower bouquet at (x=865, y=546) -->
      ${!isModified ? `
        <g id="diff-4-original" transform="translate(865, 546)">
          <circle cx="0" cy="0" r="12" fill="#ec4899" />
          <circle cx="-8" cy="-5" r="8" fill="#f43f5e" />
          <circle cx="8" cy="-4" r="8" fill="#f43f5e" />
          <circle cx="0" cy="0" r="4" fill="#fef08a" />
        </g>
      ` : `
        <ellipse id="diff-4-modified" cx="865" cy="546" rx="14" ry="6" fill="#78716c" />
      `}

      <!-- DIFFERENCE 5: (54.0%, 22.0%) -> Acacia tree golden fruit at (x=540, y=154) -->
      ${!isModified ? `
        <g id="diff-5-original">
          <circle cx="538" cy="154" r="11" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
          <circle cx="546" cy="158" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
        </g>
      ` : `
        <g id="diff-5-modified">
          <circle cx="540" cy="154" r="12" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
        </g>
      `}
    </svg>
    `;
  } else {
    // Level 2 (Rainforest Canopy)
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <rect width="1000" height="700" fill="#064e3b" />
      <circle cx="500" cy="300" r="350" fill="#047857" opacity="0.5" />
      <path d="M0,200 Q300,250 500,180 T1000,220" stroke="#78350f" stroke-width="40" fill="none" />
      <path d="M150,220 Q200,450 350,550" stroke="#14532d" stroke-width="12" fill="none" />
      <path d="M600,200 Q750,420 850,600" stroke="#14532d" stroke-width="14" fill="none" />

      <g transform="translate(180, 175)">
        <ellipse cx="0" cy="0" rx="30" ry="20" fill="#0f172a" />
        <circle cx="10" cy="-8" r="12" fill="#0f172a" />
        <circle cx="12" cy="-9" r="3" fill="#ffffff" />
        <circle cx="13" cy="-9" r="1.5" fill="#000000" />
        <path d="M18,-12 Q50,-8 45,6 Q20,10 18,2 Z" fill="${isModified ? '#3b82f6' : '#f97316'}" stroke="#ea580c" stroke-width="2" />
      </g>

      <g transform="translate(620, 266)">
        <ellipse cx="0" cy="0" rx="28" ry="18" fill="#22c55e" />
        <circle cx="-12" cy="-12" r="9" fill="${isModified ? '#a855f7' : '#ef4444'}" />
        <circle cx="12" cy="-12" r="9" fill="${isModified ? '#a855f7' : '#ef4444'}" />
      </g>

      <g transform="translate(820, 490)">
        <circle cx="0" cy="0" r="18" fill="#d946ef" />
        ${!isModified ? `
          <circle cx="15" cy="-10" r="14" fill="#f43f5e" />
          <circle cx="-15" cy="-10" r="14" fill="#f43f5e" />
        ` : `
          <circle cx="0" cy="-14" r="8" fill="#38bdf8" />
        `}
      </g>

      <g transform="translate(300, 574)">
        ${!isModified ? `
          <ellipse cx="-15" cy="-10" rx="18" ry="24" fill="#0284c7" />
          <ellipse cx="15" cy="-10" rx="18" ry="24" fill="#0284c7" />
          <ellipse cx="0" cy="0" rx="4" ry="16" fill="#0f172a" />
        ` : `
          <ellipse cx="-15" cy="-10" rx="18" ry="24" fill="#eab308" />
          <ellipse cx="15" cy="-10" rx="18" ry="24" fill="#eab308" />
          <ellipse cx="0" cy="0" rx="4" ry="16" fill="#0f172a" />
        `}
      </g>

      <g transform="translate(480, 385)">
        <circle cx="0" cy="0" r="16" fill="${isModified ? '#fbbf24' : '#15803d'}" />
        <circle cx="-10" cy="8" r="12" fill="${isModified ? '#f59e0b' : '#166534'}" />
      </g>
    </svg>
    `;
  }
}

function createFantasySvg(isModified) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#312e81" />
        <stop offset="100%" stop-color="#4c1d95" />
      </linearGradient>
    </defs>
    <rect width="1000" height="700" fill="url(#nightSky)" />

    <circle cx="720" cy="238" r="110" fill="#fef08a" opacity="0.85" />
    <circle cx="720" cy="238" r="140" fill="#fef08a" opacity="0.2" />

    ${!isModified ? `
      <path d="M690,230 Q720,200 745,230 Q720,220 700,240 Z" fill="#1e1b4b" />
      <path d="M710,215 L730,195 L725,218 Z" fill="#1e1b4b" />
    ` : `
      <circle cx="720" cy="238" r="15" fill="#ffffff" opacity="0.9" />
    `}

    <polygon points="50,500 250,280 450,500" fill="#1e1b4b" opacity="0.8" />
    <polygon points="350,500 580,240 800,500" fill="#2e1065" opacity="0.7" />

    <rect x="220" y="240" width="120" height="180" fill="#3b0764" />
    <polygon points="210,240 280,140 350,240" fill="#581c87" />
    <rect x="260" y="320" width="40" height="70" rx="20" fill="#fbbf24" opacity="0.8" />

    ${!isModified ? `
      <circle cx="280" cy="140" r="16" fill="#38bdf8" />
      <circle cx="280" cy="140" r="24" fill="#38bdf8" opacity="0.4" />
    ` : `
      <circle cx="280" cy="140" r="16" fill="#ef4444" />
      <circle cx="280" cy="140" r="24" fill="#ef4444" opacity="0.4" />
    `}

    <path d="M0,480 Q500,450 1000,490 L1000,700 L0,700 Z" fill="#1e1b4b" />

    <ellipse cx="450" cy="460" rx="90" ry="30" fill="#4c1d95" stroke="#a855f7" stroke-width="4" />
    <path d="M440,460 Q450,390 460,460" stroke="#38bdf8" stroke-width="6" fill="none" />
    
    ${!isModified ? `
      <polygon points="450,410 460,430 450,450 440,430" fill="#a855f7" stroke="#e9d5ff" stroke-width="2" />
    ` : `
      <polygon points="450,410 460,430 450,450 440,430" fill="#f59e0b" stroke="#fef08a" stroke-width="2" />
    `}

    <g transform="translate(150, 532)">
      <path d="M-15,10 Q0,-25 15,10 Z" fill="${isModified ? '#10b981' : '#ec4899'}" />
      <rect x="-3" y="10" width="6" height="18" fill="#f1f5f9" />
      <circle cx="-5" cy="0" r="2.5" fill="#ffffff" />
      <circle cx="5" cy="2" r="2" fill="#ffffff" />
    </g>

    <g transform="translate(850, 588)">
      <rect x="-30" y="-15" width="60" height="30" rx="5" fill="#78350f" stroke="#d97706" stroke-width="2" />
      ${!isModified ? `
        <circle cx="0" cy="0" r="9" fill="none" stroke="#fbbf24" stroke-width="3" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#fbbf24" stroke-width="3" />
      ` : `
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="#38bdf8" />
        <circle cx="0" cy="0" r="3" fill="#0f172a" />
      `}
    </g>
  </svg>
  `;
}

function createUnderwaterSvg(isModified) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="40%" stop-color="#0369a1" />
        <stop offset="100%" stop-color="#082f49" />
      </linearGradient>
    </defs>
    <rect width="1000" height="700" fill="url(#ocean)" />

    <polygon points="100,0 250,700 150,700 50,0" fill="#ffffff" opacity="0.08" />
    <polygon points="400,0 600,700 480,700 350,0" fill="#ffffff" opacity="0.09" />
    <polygon points="750,0 900,700 800,700 700,0" fill="#ffffff" opacity="0.08" />

    <path d="M0,560 Q300,520 600,570 T1000,550 L1000,700 L0,700 Z" fill="#ca8a04" />
    <path d="M0,580 Q400,550 800,600 T1000,580 L1000,700 L0,700 Z" fill="#a16207" />

    <path d="M80,560 Q60,420 120,460 Q160,380 180,480 Q220,420 200,560 Z" fill="#f43f5e" />
    <path d="M850,550 Q890,390 920,450 Q960,370 980,550 Z" fill="#8b5cf6" />

    <g transform="translate(200, 294)">
      <ellipse cx="0" cy="0" rx="35" ry="20" fill="${isModified ? '#3b82f6' : '#ea580c'}" />
      <polygon points="30,0 55,-15 55,15" fill="${isModified ? '#3b82f6' : '#ea580c'}" />
      <path d="M-10,-18 Q-5,0 -10,18" stroke="#ffffff" stroke-width="8" fill="none" />
      <path d="M10,-15 Q15,0 10,15" stroke="#ffffff" stroke-width="6" fill="none" />
      <circle cx="-20" cy="-4" r="3" fill="#000000" />
    </g>

    <g transform="translate(680, 154)">
      <ellipse cx="0" cy="0" rx="45" ry="30" fill="#15803d" stroke="#14532d" stroke-width="3" />
      <ellipse cx="-45" cy="0" rx="14" ry="10" fill="#22c55e" />
      <ellipse cx="-15" cy="-35" rx="18" ry="8" fill="#22c55e" transform="rotate(-30)" />
      <ellipse cx="-15" cy="35" rx="18" ry="8" fill="#22c55e" transform="rotate(30)" />
      ${!isModified ? `
        <circle cx="0" cy="0" r="14" fill="#a3e635" />
      ` : `
        <polygon points="0,-12 12,0 0,12 -12,0" fill="#eab308" />
      `}
    </g>

    <g transform="translate(800, 448)">
      <rect x="-35" y="-10" width="70" height="40" rx="6" fill="#78350f" stroke="#ca8a04" stroke-width="3" />
      <path d="M-35,-10 Q0,-35 35,-10 Z" fill="#92400e" stroke="#ca8a04" stroke-width="3" />
      ${!isModified ? `
        <polygon points="-8,-30 8,-30 4,-15 -4,-15" fill="#facc15" />
        <rect x="-2" y="-15" width="4" height="10" fill="#eab308" />
        <ellipse cx="0" cy="-5" rx="8" ry="3" fill="#ca8a04" />
      ` : `
        <circle cx="-10" cy="-15" r="4" fill="#ffffff" />
        <circle cx="0" cy="-12" r="4" fill="#ffffff" />
        <circle cx="10" cy="-15" r="4" fill="#ffffff" />
      `}
    </g>

    <g transform="translate(350, 560)">
      <ellipse cx="0" cy="0" rx="25" ry="10" fill="#db2777" />
      <path d="M-15,0 Q-25,-30 -10,-40" stroke="${isModified ? '#06b6d4' : '#f472b6'}" stroke-width="5" fill="none" />
      <path d="M0,0 Q0,-35 10,-45" stroke="${isModified ? '#06b6d4' : '#f472b6'}" stroke-width="5" fill="none" />
      <path d="M15,0 Q25,-30 20,-40" stroke="${isModified ? '#06b6d4' : '#f472b6'}" stroke-width="5" fill="none" />
    </g>

    <g transform="translate(520, 336)">
      <ellipse cx="0" cy="15" rx="35" ry="15" fill="#7c3aed" stroke="#5b21b6" stroke-width="2" />
      <path d="M-35,15 Q0,-20 35,15 Z" fill="#a78bfa" stroke="#5b21b6" stroke-width="2" />
      ${!isModified ? `
        <circle cx="0" cy="6" r="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
      ` : `
        <circle cx="0" cy="6" r="10" fill="#10b981" stroke="#059669" stroke-width="1.5" />
      `}
    </g>
  </svg>
  `;
}

function createKitchenSvg(isModified) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="wall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fff7ed" />
        <stop offset="100%" stop-color="#fed7aa" />
      </linearGradient>
    </defs>
    <rect width="1000" height="420" fill="url(#wall)" />
    
    <rect x="80" y="180" width="340" height="18" fill="#78350f" rx="3" />
    <rect x="580" y="180" width="340" height="18" fill="#78350f" rx="3" />

    <rect y="420" width="1000" height="280" fill="#334155" />
    <rect y="405" width="1000" height="25" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

    <g transform="translate(250, 140)">
      <rect x="-35" y="0" width="24" height="40" rx="3" fill="#fdba74" stroke="#c2410c" stroke-width="2" />
      <rect x="10" y="0" width="24" height="40" rx="3" fill="#86efac" stroke="#15803d" stroke-width="2" />
      <rect x="-12" y="-5" width="24" height="45" rx="3" fill="#fca5a5" stroke="#b91c1c" stroke-width="2" />
      <rect x="-8" y="10" width="16" height="15" fill="${isModified ? '#3b82f6' : '#ffffff'}" />
    </g>

    <g transform="translate(700, 196)">
      <circle cx="0" cy="0" r="30" fill="#ea580c" stroke="#9a3412" stroke-width="4" />
      ${!isModified ? `
        <rect x="-6" y="-70" width="12" height="45" rx="4" fill="#78350f" />
      ` : `
        <rect x="-6" y="-70" width="12" height="45" rx="4" fill="#eab308" />
      `}
    </g>

    <g transform="translate(500, 455)">
      <ellipse cx="0" cy="20" rx="70" ry="25" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" />
      <rect x="-60" y="-30" width="120" height="50" fill="#fbcfe8" rx="6" />
      <ellipse cx="0" cy="-30" rx="60" ry="20" fill="#f472b6" />
      ${!isModified ? `
        <polygon points="0,-45 -8,-32 8,-32" fill="#ef4444" />
        <circle cx="0" cy="-45" r="3" fill="#22c55e" />
      ` : `
        <circle cx="-10" cy="-38" r="6" fill="#3b82f6" />
        <circle cx="0" cy="-42" r="6" fill="#1d4ed8" />
        <circle cx="10" cy="-38" r="6" fill="#3b82f6" />
      `}
    </g>

    <g transform="translate(180, 546)">
      <rect x="-60" y="-12" width="120" height="24" rx="10" fill="#b45309" stroke="#78350f" stroke-width="2" />
      ${!isModified ? `
        <ellipse cx="0" cy="0" rx="30" ry="8" fill="#ffffff" opacity="0.8" />
      ` : `
        <ellipse cx="0" cy="0" rx="20" ry="6" fill="#451a03" />
      `}
    </g>

    <g transform="translate(820, 504)">
      <ellipse cx="0" cy="15" rx="55" ry="25" fill="#b45309" stroke="#78350f" stroke-width="3" />
      <ellipse cx="-15" cy="-10" rx="14" ry="40" fill="#fde047" stroke="#ca8a04" stroke-width="2" transform="rotate(-20)" />
      <ellipse cx="15" cy="-10" rx="14" ry="40" fill="#fde047" stroke="#ca8a04" stroke-width="2" transform="rotate(20)" />
      ${!isModified ? `
        <line x1="-18" y1="-20" x2="-8" y2="-15" stroke="#854d0e" stroke-width="3" />
      ` : `
        <circle cx="0" cy="5" r="14" fill="#f97316" stroke="#c2410c" stroke-width="2" />
      `}
    </g>
  </svg>
  `;
}

function createSpaceSvg(isModified) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <rect width="1000" height="700" fill="#030712" />
    
    <circle cx="120" cy="80" r="1.5" fill="#ffffff" />
    <circle cx="280" cy="60" r="2" fill="#ffffff" />
    <circle cx="450" cy="110" r="1.5" fill="#ffffff" />
    <circle cx="680" cy="90" r="2.5" fill="#fef08a" />
    <circle cx="920" cy="140" r="1.5" fill="#ffffff" />
    <circle cx="150" cy="320" r="2" fill="#ffffff" />
    <circle cx="880" cy="450" r="2" fill="#ffffff" />

    <g transform="translate(800, 210)">
      <circle cx="0" cy="0" r="75" fill="#c2410c" />
      <ellipse cx="0" cy="0" rx="140" ry="30" fill="none" stroke="#fdba74" stroke-width="12" opacity="0.8" transform="rotate(-20)" />
      ${!isModified ? `
        <ellipse cx="-20" cy="15" rx="14" ry="8" fill="#ffffff" opacity="0.9" />
      ` : `
        <circle cx="-20" cy="15" r="12" fill="#06b6d4" />
      `}
    </g>

    <g transform="translate(500, 480)">
      <rect x="-80" y="-40" width="160" height="80" rx="15" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4" />
      <circle cx="0" cy="0" r="20" fill="#38bdf8" />
      <rect x="-240" y="-30" width="140" height="60" fill="#1e3a8a" stroke="#60a5fa" stroke-width="3" />
      <rect x="100" y="-30" width="140" height="60" fill="#1e3a8a" stroke="#60a5fa" stroke-width="3" />
      ${!isModified ? `
        <line x1="120" y1="-25" x2="220" y2="25" stroke="#93c5fd" stroke-width="6" opacity="0.8" />
      ` : `
        <line x1="120" y1="25" x2="220" y2="-25" stroke="#f43f5e" stroke-width="6" opacity="0.9" />
      `}
    </g>

    <g transform="translate(320, 168)">
      <path d="M-30,20 Q0,-15 30,20 Z" fill="#94a3b8" stroke="#cbd5e1" stroke-width="3" />
      ${!isModified ? `
        <line x1="0" y1="5" x2="0" y2="-20" stroke="#ef4444" stroke-width="4" />
        <circle cx="0" cy="-20" r="4" fill="#ef4444" />
      ` : `
        <line x1="0" y1="5" x2="0" y2="-20" stroke="#10b981" stroke-width="4" />
        <circle cx="0" cy="-20" r="4" fill="#10b981" />
      `}
    </g>

    <g transform="translate(180, 420)">
      <ellipse cx="0" cy="0" rx="20" ry="26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <circle cx="0" cy="-25" r="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      ${!isModified ? `
        <ellipse cx="2" cy="-25" rx="9" ry="7" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" />
      ` : `
        <ellipse cx="2" cy="-25" rx="9" ry="7" fill="#a855f7" stroke="#9333ea" stroke-width="1.5" />
      `}
    </g>

    <g transform="translate(420, 595)">
      <polygon points="-15,0 15,0 8,-20 -8,-20" fill="#64748b" />
      ${!isModified ? `
        <polygon points="-12,0 0,35 12,0" fill="#38bdf8" />
        <polygon points="-6,0 0,20 6,0" fill="#ffffff" />
      ` : `
        <polygon points="-12,0 0,35 12,0" fill="#f97316" />
        <polygon points="-6,0 0,20 6,0" fill="#fef08a" />
      `}
    </g>
  </svg>
  `;
}

// Main execution
async function main() {
  console.log('Generating game assets...');
  await generateFavicon();

  generateMinimalMp3(path.join(__dirname, '..', 'public/sounds/correct.mp3'), 0.4);
  generateMinimalMp3(path.join(__dirname, '..', 'public/sounds/complete.mp3'), 0.8);

  const puzzles = [
    { dir: 'public/puzzles/animals/level-001', gen: (mod) => createSavannahSvg(mod, 1) },
    { dir: 'public/puzzles/animals/level-002', gen: (mod) => createSavannahSvg(mod, 2) },
    { dir: 'public/puzzles/fantasy/level-001', gen: (mod) => createFantasySvg(mod) },
    { dir: 'public/puzzles/underwater/level-001', gen: (mod) => createUnderwaterSvg(mod) },
    { dir: 'public/puzzles/kitchen/level-001', gen: (mod) => createKitchenSvg(mod) },
    { dir: 'public/puzzles/space/level-001', gen: (mod) => createSpaceSvg(mod) },
  ];

  for (const p of puzzles) {
    const fullDir = path.join(__dirname, '..', p.dir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }

    const origSvg = p.gen(false);
    await sharp(Buffer.from(origSvg))
      .webp({ quality: 90 })
      .toFile(path.join(fullDir, 'original.webp'));

    const modSvg = p.gen(true);
    await sharp(Buffer.from(modSvg))
      .webp({ quality: 90 })
      .toFile(path.join(fullDir, 'modified.webp'));

    console.log(`Rendered WebP for ${p.dir}`);
  }

  console.log('All assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});

