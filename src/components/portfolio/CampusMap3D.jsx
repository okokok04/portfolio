import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ============================================================
// Bản đồ campus 3D (isometric) cho box "Học vấn".
// Toàn bộ cảnh dựng bằng hình khối cơ bản trong three.js nên không
// cần tải file mô hình. Kéo để xoay, cuộn để zoom.
// Bố cục và màu sắc bám theo ảnh chụp trên không ban ngày của khuôn
// viên Đại học Thăng Long: Tòa A, Tòa B, Thư viện, Sân trường, Hội
// trường, Giảng đường, Sân bóng rổ, Căng tin, Lán xe, Cổng vào,
// Vườn sinh viên và đường cao tốc phía sau.
// ============================================================

const GROUND = 0xdfe3e2;
const GRASS = 0x8ec46b;
const GRASS_DARK = 0x6fae52;
const CAMPUS_PAD = 0xf4f1ea;
const ROAD = 0xd0d4d8;
const ROAD_LINE = 0xfbfcfc;
const PLAZA_FLOOR = 0xeeebe4;
const ROOF = 0xb5bac2;
const ROOF_LIGHT = 0xe9eaea;
const WALL = '#f4f1e9';
const GLASS = '#a3b8d3';
const GLASS_DARK = '#7189a8';
const COURT_BLUE = 0x3f80d4;
const COURT_RED = 0xd9412f;
const TREE = 0x5fae4d;
const TREE_DARK = 0x337a33;
const TERRACOTTA = 0xc25a41;
const ROUTE_COLOR = 0xe23a52;
const ACCENT = 0xd9412f;

// Toạ độ tính theo "đơn vị mét" quy ước, gốc gần giữa sân trường.
// +x là hướng đông (bên phải ảnh), +z là hướng nam (phía trước ảnh).
const BUILDINGS = [
  {
    id: 'toa-a',
    label: 'BLOCK A',
    x: -3.2,
    z: -6.0,
    w: 6.0,
    d: 4.6,
    h: 11.2,
    style: 'glass',
    priority: 1,
    parapet: true,
    rooftop: 'tower',
    canopy: true,
  },
  {
    id: 'toa-b',
    label: 'BLOCK B',
    x: -9.6,
    z: 1.0,
    w: 3.9,
    d: 10.6,
    h: 8.4,
    style: 'glass',
    plinth: 0x3f74b8,
    priority: 2,
    rooftop: 'units',
  },
  {
    id: 'thu-vien',
    label: 'LIBRARY',
    x: 9.4,
    z: -7.0,
    w: 4.4,
    d: 3.8,
    h: 4.8,
    style: 'white',
    priority: 1,
    rooftop: 'units',
    canopy: true,
  },
  {
    id: 'hoi-truong',
    label: 'ASSEMBLY HALL',
    x: 14.0,
    z: -2.6,
    w: 6.8,
    d: 4.4,
    h: 3.6,
    style: 'white',
    target: true,
    priority: 1,
    vault: 2.3,
    banner: true,
  },
  {
    id: 'giang-duong',
    label: 'LECTURE HALL',
    x: 13.4,
    z: 3.4,
    w: 7.6,
    d: 3.4,
    h: 3.0,
    style: 'white',
    priority: 1,
    sign: true,
  },
  {
    id: 'cang-tin',
    label: 'CANTEEN',
    x: 1.8,
    z: 9.6,
    w: 3.8,
    d: 3.2,
    h: 2.6,
    style: 'white',
    priority: 2,
  },
];

const GATE = { x: -13.4, z: 13.0 };
const COURT = { x: 3.6, z: -1.6, w: 6.2, d: 7.4 };
const PLAZA = { x: 8.7, z: -1.4, w: 3.4, d: 6.0 };
const LAN_XE = { x: -13.4, z: 2.0, w: 3.0, d: 7.0 };

// Lối đi bộ: cổng vào → căng tin → vườn sinh viên → hội trường
const ROUTE = [
  [-13.4, 13.0],
  [-10.6, 12.4],
  [-6.6, 11.8],
  [-2.6, 11.4],
  [1.6, 11.6],
  [4.4, 10.6],
  [6.2, 8.6],
  [7.4, 6.0],
  [8.0, 3.4],
  [8.4, 1.8],
  [9.4, 0.6],
  [11.4, 0.4],
  [13.2, 0.4],
];

function drawWindowCanvas({
  cols = 4,
  rows = 5,
  wall = WALL,
  glass = GLASS,
  frame = GLASS_DARK,
  pad = 5,
} = {}) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, size, size);

  const cw = size / cols;
  const ch = size / rows;

  for (let r = 0; r < rows; r += 1) {
    // Khe tối mảnh giữa các tầng để toà nhà có nhịp khi nhìn từ xa.
    ctx.fillStyle = frame;
    ctx.globalAlpha = 0.22;
    ctx.fillRect(0, r * ch + ch - 1.6, size, 1.6);
    ctx.globalAlpha = 1;

    for (let c = 0; c < cols; c += 1) {
      // Ban ngày cửa kính phản chiếu trời xanh, không còn ô sáng đèn như bản đêm.
      ctx.fillStyle = glass;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(c * cw + pad * 0.5, r * ch + pad, cw - pad, ch - pad * 1.7);
      ctx.fillStyle = frame;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(c * cw + pad * 0.5, r * ch + ch - pad * 1.7, cw - pad, 1.2);
      ctx.globalAlpha = 1;
    }
  }
  return canvas;
}

export default function CampusMap3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const disposables = [];
    const track = (item) => {
      disposables.push(item);
      return item;
    };

    const scene = new THREE.Scene();

    // --- Texture cửa sổ: vẽ một lần rồi lặp lại trên các mặt đứng ---
    const glassCanvas = drawWindowCanvas({
      cols: 4,
      rows: 5,
      wall: WALL,
      glass: GLASS,
      frame: GLASS_DARK,
      pad: 5,
    });
    const whiteCanvas = drawWindowCanvas({
      cols: 3,
      rows: 4,
      wall: '#fbfaf7',
      glass: '#c2d0e0',
      frame: '#93a6bd',
      pad: 7,
    });

    const makeTexture = (canvas, repX, repY) => {
      const texture = track(new THREE.CanvasTexture(canvas));
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(Math.max(0.7, repX), Math.max(0.6, repY));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      return texture;
    };

    // Mỗi tầng cao 1.15 "mét" quy ước để số tầng trên texture khớp chiều cao.
    const wallMaterial = (canvas, rows, faceW, faceH) =>
      track(
        new THREE.MeshStandardMaterial({
          map: makeTexture(canvas, faceW / 6, faceH / (rows * 1.15)),
          roughness: 0.86,
          metalness: 0.02,
        }),
      );

    // --- Bộ nhớ đệm vật liệu phẳng để không tạo trùng lặp ---
    const flatCache = new Map();
    const flat = (color, roughness = 0.9) => {
      const key = `${color}:${roughness}`;
      if (!flatCache.has(key)) {
        flatCache.set(
          key,
          track(new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.01 })),
        );
      }
      return flatCache.get(key);
    };

    const addBox = (w, h, d, color, x, y, z, roughness = 0.9) => {
      const mesh = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), flat(color, roughness));
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };

    const addPlane = (w, d, color, x, z, y = 0.01, roughness = 0.95) => {
      const mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(w, d)), flat(color, roughness));
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };

    const addLine = (points, color, opacity = 0.9, close = false) => {
      const vectors = points.map(([x, z, y = 0.2]) => new THREE.Vector3(x, y, z));
      if (close) vectors.push(vectors[0].clone());
      const line = new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints(vectors)),
        track(
          new THREE.LineBasicMaterial({
            color,
            transparent: opacity < 1,
            opacity,
          }),
        ),
      );
      scene.add(line);
      return line;
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';
    mount.appendChild(canvas);

    // --- Ánh sáng: nắng ban ngày + hắt trời xanh cho mặt khuất ---
    scene.add(new THREE.AmbientLight(0xffffff, 1.25));
    const sunLight = new THREE.DirectionalLight(0xfff3de, 1.5);
    sunLight.position.set(16, 26, 20);
    scene.add(sunLight);
    const skyFill = new THREE.DirectionalLight(0xbdd4f2, 0.62);
    skyFill.position.set(-20, 12, -18);
    scene.add(skyFill);

    // --- Mặt nền chung + thảm cỏ + đường bao quanh ---
    addPlane(170, 170, GROUND, 0, 0, -0.06);

    addPlane(44, 5.5, GRASS, 1.0, -18.9, -0.04, 1);
    addPlane(3.6, 16, GRASS, -19.0, 2.0, -0.04, 1);
    addPlane(4.4, 24, GRASS, 22.2, 3.0, -0.04, 1);
    addPlane(44, 6, GRASS_DARK, 0, 19.0, -0.04, 1);

    // Sân khuôn viên (nền sáng màu đá)
    addPlane(32.5, 23, CAMPUS_PAD, 1.25, 1.5, 0.02);
    // Vườn sinh viên và dải cây trong khuôn viên
    addPlane(8.6, 6.6, GRASS, 8.4, 9.0, 0.028, 1);

    // --- Đường nội bộ quanh khuôn viên ---
    addPlane(36, 1.5, ROAD, 1.0, -11.1, 0.012);
    addPlane(2.6, 30, ROAD, -16.6, 2.9, 0.012);
    addPlane(2.6, 30, ROAD, 19.0, 2.9, 0.012);
    addPlane(39.5, 2.6, ROAD, 1.2, 14.4, 0.012);

    // --- Đường cao tốc phía sau: 2 chiều, dải phân cách xanh, vạch kẻ ---
    const HIGHWAY_Z = -14.7;
    addPlane(66, 5.0, ROAD, 0, HIGHWAY_Z, 0.008);
    addBox(66, 0.2, 0.7, GRASS_DARK, 0, 0.1, HIGHWAY_Z, 0.95);
    [-16.2, -13.2].forEach((laneZ) => {
      for (let i = -7; i <= 7; i += 1) {
        addBox(1.7, 0.03, 0.16, ROAD_LINE, i * 4.2, 0.032, laneZ, 0.75);
      }
    });
    [-17.05, -12.35].forEach((edgeZ) => {
      addBox(66, 0.02, 0.12, ROAD_LINE, 0, 0.03, edgeZ, 0.75);
    });

    // --- Xe chạy trên cao tốc ---
    const addCar = (x, z, color, flip = false) => {
      addBox(0.98, 0.3, 0.48, color, x, 0.2, z, 0.55);
      addBox(0.5, 0.26, 0.42, 0x5d6773, x + (flip ? 0.08 : -0.08), 0.46, z, 0.5);
    };
    /** @type {Array<[number, number, number, boolean]>} */
    const highwayCars = [
      [-17.4, -16.35, 0xf4f5f6, false],
      [-8.2, -16.35, 0x3a4149, false],
      [1.6, -16.35, 0xc7ccd1, false],
      [11.4, -16.35, 0xbf3b31, false],
      [20.2, -16.35, 0xf4f5f6, false],
      [-21.2, -13.1, 0xc7ccd1, true],
      [-12.0, -13.1, 0xf4f5f6, true],
      [-2.4, -13.1, 0x4a6fa5, true],
      [7.6, -13.1, 0x3a4149, true],
      [16.8, -13.1, 0xf4f5f6, true],
    ];
    highwayCars.forEach(([x, z, color, flip]) => addCar(x, z, color, flip));

    // --- Sân vận động + nhà lớn bên kia đường (nền phía sau) ---
    addPlane(9.5, 5.5, 0x63b352, -15.5, -20.4, -0.03, 1);
    addLine(
      [
        [-19.9, -22.6, -0.028],
        [-11.1, -22.6, -0.028],
        [-11.1, -18.2, -0.028],
        [-19.9, -18.2, -0.028],
      ],
      0xffffff,
      0.8,
      true,
    );
    addBox(7.2, 2.8, 3.2, 0xe6e8e9, -3.4, 1.4, -20.2, 0.9);
    addBox(7.4, 0.3, 3.4, 0xc3c8cb, -3.4, 2.95, -20.2, 0.85);
    addBox(6.0, 2.2, 2.8, 0xd9dde0, 8.6, 1.1, -20.6, 0.9);

    // --- Sân bóng rổ: nền xanh, viền đỏ, vạch trắng và hai rổ ---
    addBox(COURT.w, 0.18, COURT.d, COURT_BLUE, COURT.x, 0.09, COURT.z, 0.95);
    const courtTop = 0.19;
    addBox(COURT.w, 0.05, 0.22, COURT_RED, COURT.x, 0.2, COURT.z - COURT.d / 2 + 0.16, 0.85);
    addBox(COURT.w, 0.05, 0.22, COURT_RED, COURT.x, 0.2, COURT.z + COURT.d / 2 - 0.16, 0.85);
    addBox(0.22, 0.05, COURT.d, COURT_RED, COURT.x - COURT.w / 2 + 0.16, 0.2, COURT.z, 0.85);
    addBox(0.22, 0.05, COURT.d, COURT_RED, COURT.x + COURT.w / 2 - 0.16, 0.2, COURT.z, 0.85);
    const courtHalfW = COURT.w / 2 - 0.55;
    const courtHalfD = COURT.d / 2 - 0.55;
    addLine(
      [
        [COURT.x - courtHalfW, COURT.z - courtHalfD, courtTop],
        [COURT.x + courtHalfW, COURT.z - courtHalfD, courtTop],
        [COURT.x + courtHalfW, COURT.z + courtHalfD, courtTop],
        [COURT.x - courtHalfW, COURT.z + courtHalfD, courtTop],
      ],
      0xffffff,
      0.95,
      true,
    );
    addLine(
      [
        [COURT.x - courtHalfW, COURT.z, courtTop],
        [COURT.x + courtHalfW, COURT.z, courtTop],
      ],
      0xffffff,
      0.9,
    );
    const centerRing = new THREE.LineLoop(
      track(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 36 }, (_, i) => {
            const angle = (i / 36) * Math.PI * 2;
            return new THREE.Vector3(
              COURT.x + Math.cos(angle) * 1.05,
              courtTop,
              COURT.z + Math.sin(angle) * 1.05,
            );
          }),
        ),
      ),
      track(new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })),
    );
    scene.add(centerRing);

    // Hai rổ hai đầu sân: cột đỏ, bảng trắng, vành đỏ.
    [COURT.z - courtHalfD + 0.15, COURT.z + courtHalfD - 0.15].forEach((hoopZ, index) => {
      const inward = index === 0 ? 1 : -1;
      addBox(0.12, 2.7, 0.12, COURT_RED, COURT.x, 1.35, hoopZ, 0.7);
      addBox(1.5, 0.9, 0.1, 0xfbfbfb, COURT.x, 2.55, hoopZ, 0.8);
      const rim = new THREE.Mesh(
        track(new THREE.TorusGeometry(0.3, 0.045, 8, 20)),
        track(new THREE.MeshStandardMaterial({ color: COURT_RED, roughness: 0.6 })),
      );
      rim.rotation.x = -Math.PI / 2;
      rim.position.set(COURT.x, 2.2, hoopZ + inward * 0.36);
      scene.add(rim);
    });

    // --- Sân trường: quảng trường nhỏ + mái che lối đi bộ ---
    addBox(PLAZA.w, 0.12, PLAZA.d, PLAZA_FLOOR, PLAZA.x, 0.06, PLAZA.z, 0.95);
    addBox(1.9, 0.12, 5.2, 0xf9f9f6, 9.0, 2.5, -1.2, 0.85);
    [-3.4, -1.4, 0.6].forEach((columnZ) => {
      [8.2, 9.8].forEach((columnX) => {
        addBox(0.12, 2.45, 0.12, 0xe8e9e6, columnX, 1.22, columnZ, 0.85);
      });
    });

    // --- Lán xe: nền nhựa + vạch chia ô ---
    addBox(LAN_XE.w, 0.1, LAN_XE.d, 0xd9dcde, LAN_XE.x, 0.05, LAN_XE.z, 0.95);
    for (let i = 0; i < 5; i += 1) {
      addLine(
        [
          [LAN_XE.x - LAN_XE.w / 2 + 0.25 + i * 0.64, LAN_XE.z - 2.6, 0.12],
          [LAN_XE.x - LAN_XE.w / 2 + 0.25 + i * 0.64, LAN_XE.z + 2.9, 0.12],
        ],
        ROAD_LINE,
        0.75,
      );
    }
    addCar(LAN_XE.x - 0.7, LAN_XE.z - 1.8, 0xf4f5f6);
    addCar(LAN_XE.x + 0.2, LAN_XE.z + 1.4, 0x3a4149);

    // --- Lối xe từ cổng vào lán xe ---
    addPlane(2.6, 7.6, ROAD, GATE.x, 9.4, 0.014);

    // --- Toà nhà: tường có texture cửa sổ, mái phẳng, chi tiết trên mái ---
    const addBuilding = (b) => {
      const { x, z, w, d, h } = b;
      const isGlass = b.style === 'glass';
      const wallCanvas = isGlass ? glassCanvas : whiteCanvas;
      const wallRows = isGlass ? 5 : 4;
      const sideX = wallMaterial(wallCanvas, wallRows, d, h);
      const sideZ = wallMaterial(wallCanvas, wallRows, w, h);
      const roofMaterial = flat(isGlass ? ROOF : ROOF_LIGHT, 0.92);

      const plinthHeight = b.plinth ? 1.2 : 0;
      const bodyHeight = h - plinthHeight;
      const body = new THREE.Mesh(track(new THREE.BoxGeometry(w, bodyHeight, d)), [
        sideX,
        sideX,
        roofMaterial,
        roofMaterial,
        sideZ,
        sideZ,
      ]);
      body.position.set(x, plinthHeight + bodyHeight / 2, z);
      scene.add(body);

      if (b.plinth) {
        // Khối đế xanh ở chân Tòa B, đúng như ảnh chụp.
        addBox(w + 0.2, plinthHeight, d + 0.2, b.plinth, x, plinthHeight / 2, z, 0.85);
      }

      if (b.parapet) {
        addBox(w + 0.26, 0.42, d + 0.26, ROOF, x, h + 0.16, z, 0.9);
      }

      if (b.rooftop === 'tower') {
        addBox(1.6, 1.15, 1.5, ROOF_LIGHT, x - 1.3, h + 0.58, z - 0.5, 0.9);
        addBox(0.8, 0.55, 0.8, 0xc6cbd1, x + 1.5, h + 0.28, z + 0.9, 0.9);
        addBox(0.7, 0.5, 0.7, 0xc6cbd1, x + 0.5, h + 0.25, z - 1.2, 0.9);
      }

      if (b.rooftop === 'units') {
        // Cụm máy điều hoà trên mái cho toà nhà không bị "trống".
        for (let i = 0; i < 4; i += 1) {
          const offsetX = -w / 2 + 0.9 + (i % 2) * (w - 1.8);
          const offsetZ = -d / 2 + 0.9 + Math.floor(i / 2) * (d - 1.8);
          addBox(0.72, 0.5, 0.72, 0xd2d6da, x + offsetX, h + 0.25, z + offsetZ, 0.9);
        }
      }

      if (b.canopy) {
        // Mái hiên nhỏ trước cửa chính (mặt hướng ra sân).
        addBox(w * 0.55, 0.12, 1.1, 0xf3f3ef, x, 2.55, z + d / 2 + 0.5, 0.85);
      }

      if (b.vault) {
        // Mái vòm bán nguyệt kiểu "vỏ sò" của Hội trường.
        const vault = new THREE.Mesh(
          track(
            new THREE.CylinderGeometry(
              b.vault,
              b.vault,
              w * 0.94,
              26,
              1,
              true,
              0,
              Math.PI,
            ),
          ),
          track(
            new THREE.MeshStandardMaterial({
              color: 0xf6f6f3,
              roughness: 0.78,
              metalness: 0.06,
              side: THREE.DoubleSide,
            }),
          ),
        );
        vault.rotation.z = Math.PI / 2;
        vault.position.set(x, h, z);
        scene.add(vault);
      }

      if (b.banner) {
        // Băng rôn đỏ dựng đứng trên mặt tiền Hội trường.
        addBox(0.55, 2.1, 0.12, ACCENT, x + w / 2 - 1.0, 2.2, z + d / 2 + 0.08, 0.8);
      }

      if (b.sign) {
        addBox(1.2, 1.2, 0.14, COURT_RED, x + w / 2 - 1.1, 1.9, z + d / 2 + 0.09, 0.8);
      }
    };

    BUILDINGS.forEach(addBuilding);

    // --- Cổng vào: hai trụ + dầm ngang ---
    const gateGroup = new THREE.Group();
    [-1.4, 1.4].forEach((offset) => {
      const pillar = new THREE.Mesh(
        track(new THREE.BoxGeometry(0.55, 2.8, 0.55)),
        flat(0xf0efe9, 0.85),
      );
      pillar.position.set(GATE.x + offset, 1.4, GATE.z);
      gateGroup.add(pillar);
    });
    const gateBeam = new THREE.Mesh(track(new THREE.BoxGeometry(3.5, 0.42, 0.72)), flat(0x3f74b8, 0.8));
    gateBeam.position.set(GATE.x, 3.0, GATE.z);
    gateGroup.add(gateBeam);
    scene.add(gateGroup);

    // --- Cây xanh (instanced): vườn sinh viên, dải cây ven đường, cao tốc ---
    const treeGeometry = track(new THREE.IcosahedronGeometry(0.85, 0));
    const treeMaterial = track(
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, flatShading: true }),
    );
    const treeZones = [
      { xMin: 4.0, xMax: 12.4, zMin: 5.4, zMax: 12.4, count: 24 },
      { xMin: -11.2, xMax: -6.6, zMin: 8.0, zMax: 12.6, count: 8 },
      { xMin: -21.4, xMax: -18.8, zMin: -9.0, zMax: 12.0, count: 10 },
      { xMin: 23.0, xMax: 25.4, zMin: 3.0, zMax: 12.6, count: 8 },
      { xMin: -1.4, xMax: 6.6, zMin: -9.9, zMax: -9.0, count: 8 },
      { xMin: 12.0, xMax: 17.0, zMin: -8.8, zMax: -6.6, count: 7 },
      { xMin: -22.0, xMax: 24.0, zMin: 16.2, zMax: 18.2, count: 22 },
      { xMin: -26.0, xMax: 24.0, zMin: -23.4, zMax: -22.0, count: 16 },
    ];
    const treeCount = treeZones.reduce((sum, zone) => sum + zone.count, 0);
    const trees = new THREE.InstancedMesh(treeGeometry, treeMaterial, treeCount);
    let seed = 2026;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const dummy = new THREE.Object3D();
    const treeColor = new THREE.Color();
    const treeBase = new THREE.Color(TREE);
    const treeShade = new THREE.Color(TREE_DARK);
    let treeIndex = 0;
    treeZones.forEach((zone) => {
      for (let i = 0; i < zone.count; i += 1) {
        const scale = 0.62 + random() * 0.85;
        dummy.position.set(
          zone.xMin + random() * (zone.xMax - zone.xMin),
          0.62 * scale,
          zone.zMin + random() * (zone.zMax - zone.zMin),
        );
        dummy.rotation.y = random() * Math.PI;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        trees.setMatrixAt(treeIndex, dummy.matrix);
        treeColor.copy(treeBase).lerp(treeShade, random() * 0.8);
        trees.setColorAt(treeIndex, treeColor);
        treeIndex += 1;
      }
    });
    trees.instanceMatrix.needsUpdate = true;
    if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
    scene.add(trees);

    // --- Nhà dân ven khuôn viên: tường nhạt + mái dốc ngói đỏ ---
    const addHouse = (x, z, w, d, wallHeight, roofColor) => {
      addBox(w, wallHeight, d, 0xf7f3e9, x, wallHeight / 2, z, 0.92);
      const roofSize = w * 0.76;
      const roof = new THREE.Mesh(
        track(new THREE.BoxGeometry(roofSize, roofSize, d * 1.05)),
        flat(roofColor, 0.9),
      );
      roof.rotation.z = Math.PI / 4;
      roof.position.set(x, wallHeight, z);
      scene.add(roof);
    };
    [
      [-19.6, 18.4, 2.8, 3.0, 1.9, TERRACOTTA],
      [-16.8, 19.8, 2.4, 2.6, 1.7, 0xb04a36],
      [-14.2, 18.2, 2.6, 2.8, 1.8, TERRACOTTA],
      [-20.8, 21.6, 2.5, 2.7, 1.7, 0x9e4a39],
      [-16.0, 22.0, 2.7, 2.5, 1.8, TERRACOTTA],
      [-22.6, 2.0, 2.6, 2.8, 1.8, TERRACOTTA],
      [-22.2, 7.0, 2.4, 2.6, 1.7, 0xa9503c],
      [20.6, 8.0, 2.6, 2.8, 1.8, TERRACOTTA],
      [20.9, -3.0, 2.4, 2.6, 1.7, 0xb04a36],
    ].forEach(([x, z, w, d, wallHeight, roofColor]) => addHouse(x, z, w, d, wallHeight, roofColor));

    // Khối chung cư cao tầng phía sau bên phải khuôn viên.
    addBox(3.6, 6.6, 3.0, 0xeef0f1, 20.9, 3.3, 1.6, 0.9);
    addBox(3.8, 0.3, 3.2, 0xc9ced2, 20.9, 6.75, 1.6, 0.85);
    addBox(3.64, 1.1, 3.04, 0x4a6fa5, 20.9, 0.55, 1.6, 0.8);

    // --- Lối đi bộ: đường nét + điểm sáng nhấp nháy ---
    const routeCurve = new THREE.CatmullRomCurve3(
      ROUTE.map(([x, z]) => new THREE.Vector3(x, 0.17, z)),
    );
    const routePoints = routeCurve.getPoints(110);

    const routeLine = new THREE.Line(
      track(new THREE.BufferGeometry().setFromPoints(routePoints)),
      track(new THREE.LineBasicMaterial({ color: ROUTE_COLOR, transparent: true, opacity: 0.55 })),
    );
    scene.add(routeLine);

    const routeDots = new THREE.Points(
      track(new THREE.BufferGeometry().setFromPoints(routePoints)),
      track(
        new THREE.PointsMaterial({
          color: 0xff8fa4,
          size: 4.2,
          sizeAttenuation: false,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        }),
      ),
    );
    scene.add(routeDots);

    // --- Beacon đánh dấu Hội trường (nơi diễn ra lễ tốt nghiệp) ---
    const target = BUILDINGS.find((b) => b.target);
    const beacon = new THREE.Group();
    const ringMaterial = track(
      new THREE.MeshBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const ring = new THREE.Mesh(track(new THREE.RingGeometry(1.2, 1.38, 48)), ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(target.x, 0.24, target.z + target.d / 2 + 1.0);
    beacon.add(ring);

    const beamMaterial = track(
      new THREE.MeshBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    const beamGeometry = track(new THREE.CylinderGeometry(0.5, 1.15, 9.5, 24, 1, true));
    const beaconBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    beaconBeam.position.set(target.x, 4.75, target.z + target.d / 2 + 1.0);
    beacon.add(beaconBeam);
    scene.add(beacon);

    // --- Camera isometric ---
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
    let azimuth = 1.78;
    let polar = 0.72;
    const radius = 90;
    let zoom = 1;
    const lookAt = new THREE.Vector3(1.2, 1.4, 0.0);

    const applyCamera = () => {
      camera.position.set(
        radius * Math.sin(polar) * Math.cos(azimuth),
        radius * Math.cos(polar),
        radius * Math.sin(polar) * Math.sin(azimuth),
      );
      camera.lookAt(lookAt);
      camera.updateMatrixWorld();
    };

    // --- HTML labels: crisp text instead of sprites ---
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.pointerEvents = 'none';
    mount.appendChild(overlay);

    const labelDefs = [
      ...BUILDINGS.map((b) => ({
        text: b.label,
        target: Boolean(b.target),
        priority: b.priority ?? 2,
        anchor: new THREE.Vector3(b.x, b.h + (b.vault || 0) + 1.05, b.z),
      })),
      {
        text: 'MAIN QUAD',
        target: false,
        priority: 2,
        anchor: new THREE.Vector3(7.4, 3.4, -2.6),
      },
      {
        text: 'BASKETBALL COURT',
        target: false,
        priority: 1,
        anchor: new THREE.Vector3(COURT.x, 2.0, COURT.z + 1.6),
      },
      {
        text: 'PARKING',
        target: false,
        priority: 3,
        anchor: new THREE.Vector3(LAN_XE.x, 1.8, LAN_XE.z),
      },
      {
        text: 'MAIN GATE',
        target: false,
        priority: 1,
        anchor: new THREE.Vector3(GATE.x, 4.0, GATE.z),
      },
      {
        text: 'STUDENT GARDEN',
        target: false,
        priority: 3,
        anchor: new THREE.Vector3(8.8, 2.0, 9.2),
      },
    ];

    const labels = labelDefs.map((def) => {
      const el = document.createElement('div');
      el.textContent = def.text;
      el.style.position = 'absolute';
      el.style.left = '0';
      el.style.top = '0';
      el.style.whiteSpace = 'nowrap';
      el.style.padding = '3px 7px';
      el.style.borderRadius = '5px';
      el.style.fontSize = '8.5px';
      el.style.lineHeight = '1.2';
      el.style.letterSpacing = '0.09em';
      el.style.textTransform = 'uppercase';
      el.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';
      el.style.fontWeight = '600';
      el.style.color = def.target ? '#ffffff' : 'rgba(35,47,62,0.94)';
      el.style.background = def.target ? 'rgba(217,65,47,0.95)' : 'rgba(255,255,255,0.92)';
      el.style.border = def.target
        ? '1px solid rgba(255,255,255,0.65)'
        : '1px solid rgba(35,47,62,0.16)';
      el.style.boxShadow = def.target
        ? '0 4px 14px rgba(190,50,35,0.45)'
        : '0 2px 8px rgba(30,42,58,0.22)';
      el.style.opacity = '0';
      el.style.transition = 'opacity 200ms ease';
      overlay.appendChild(el);
      return { el, priority: def.priority, anchor: def.anchor };
    });

    const projected = new THREE.Vector3();

    const updateLabels = (width, height) => {
      labels.forEach(({ el, priority, anchor }) => {
        const visible = width >= 460 ? true : width >= 340 ? priority <= 2 : priority === 1;
        if (!visible) {
          el.style.opacity = '0';
          return;
        }
        projected.copy(anchor).project(camera);
        const inFront = projected.z < 1;
        el.style.opacity = inFront ? '1' : '0';
        if (!inFront) return;
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });
    };

    // --- Kích thước ---
    const VIEW_HEIGHT = 33;
    const resize = () => {
      const width = mount.clientWidth || 320;
      const height = mount.clientHeight || 240;
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.left = (-VIEW_HEIGHT * aspect) / 2;
      camera.right = (VIEW_HEIGHT * aspect) / 2;
      camera.top = VIEW_HEIGHT / 2;
      camera.bottom = -VIEW_HEIGHT / 2;
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    };
    resize();

    // --- Tương tác: kéo xoay, cuộn zoom ---
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleSince = 0;

    const onPointerDown = (event) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragging) return;
      azimuth -= (event.clientX - lastX) * 0.0075;
      polar = Math.min(1.28, Math.max(0.42, polar - (event.clientY - lastY) * 0.005));
      lastX = event.clientX;
      lastY = event.clientY;
      idleSince = performance.now();
      applyCamera();
    };

    const endDrag = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
      idleSince = performance.now();
    };

    const onWheel = (event) => {
      event.preventDefault();
      zoom = Math.min(2.2, Math.max(0.62, zoom * (event.deltaY > 0 ? 0.92 : 1.08)));
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
      idleSince = performance.now();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', endDrag);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // --- Vòng lặp render ---
    const clock = new THREE.Clock();
    let frame = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      if (!reduceMotion && !dragging && performance.now() - idleSince > 2200) {
        azimuth += 0.0011;
        applyCamera();
      }

      // Nhấp nháy nhẹ cho đường đi và beacon để cảnh không bị "chết".
      const pulse = 0.55 + Math.sin(elapsed * 2.2) * 0.35;
      routeDots.material.opacity = pulse;
      ringMaterial.opacity = 0.45 + Math.sin(elapsed * 1.6) * 0.28;
      beamMaterial.opacity = 0.1 + Math.sin(elapsed * 1.6) * 0.06;
      ring.scale.setScalar(1 + Math.sin(elapsed * 1.6) * 0.06);

      renderer.render(scene, camera);
      updateLabels(mount.clientWidth || 320, mount.clientHeight || 240);
      frame = requestAnimationFrame(renderFrame);
    };

    applyCamera();
    resize();

    // Chỉ chạy khi khu vực này nằm trong khung nhìn.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !frame) {
          clock.start();
          frame = requestAnimationFrame(renderFrame);
        } else if (!visible && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(mount);

    return () => {
      io.disconnect();
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', endDrag);
      canvas.removeEventListener('pointercancel', endDrag);
      canvas.removeEventListener('pointerleave', endDrag);
      canvas.removeEventListener('wheel', onWheel);
      disposables.forEach((item) => item.dispose?.());
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[12px] bg-[#e8ecef] ${className}`}
      role="img"
      aria-label="3D map of the Thang Long University campus: Block A, Block B, Library, Main quad, Assembly hall, Lecture hall, Basketball court, Canteen, Parking, Main gate, Student garden"
    >
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-2 top-2 rounded-full border border-[#25313f]/10 bg-white/75 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#25313f]/80 backdrop-blur-sm">
        3D · isometric
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-[#25313f]/10 bg-white/75 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#25313f]/80 backdrop-blur-sm">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
