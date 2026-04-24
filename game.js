const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const floorValue = document.getElementById("floorValue");
const healthValue = document.getElementById("healthValue");
const armorValue = document.getElementById("armorValue");
const weaponValue = document.getElementById("weaponValue");
const scoreValue = document.getElementById("scoreValue");
const bestFloorValue = document.getElementById("bestFloorValue");
const dashValue = document.getElementById("dashValue");
const novaValue = document.getElementById("novaValue");
const beamValue = document.getElementById("beamValue");

const objectiveTitle = document.getElementById("objectiveTitle");
const objectiveText = document.getElementById("objectiveText");
const objectiveProgress = document.getElementById("objectiveProgress");
const objectiveBar = document.getElementById("objectiveBar");

const loadoutWeapon = document.getElementById("loadoutWeapon");
const loadoutArmor = document.getElementById("loadoutArmor");
const loadoutRelics = document.getElementById("loadoutRelics");
const logList = document.getElementById("logList");

const liveStatus = document.getElementById("liveStatus");
const overlay = document.getElementById("overlay");
const statusLabel = document.getElementById("statusLabel");
const overlayHelp = document.getElementById("overlayHelp");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const soundButton = document.getElementById("soundButton");
const dashButton = document.getElementById("dashButton");
const novaButton = document.getElementById("novaButton");
const beamButton = document.getElementById("beamButton");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BEST_SCORE_KEY = "relic-siege-best-score";
const BEST_FLOOR_KEY = "relic-siege-best-floor";

const MOVE_KEYS = new Set(["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"]);

const THEMES = [
  {
    name: "Sunken Vault",
    bgA: "#07131d",
    bgB: "#13304a",
    accent: "#65f0ff",
    accentSoft: "rgba(101, 240, 255, 0.18)",
    rune: "#ffd86a",
    grid: "rgba(201, 239, 255, 0.06)"
  },
  {
    name: "Cinder Keep",
    bgA: "#160d12",
    bgB: "#41202d",
    accent: "#ff9350",
    accentSoft: "rgba(255, 147, 80, 0.16)",
    rune: "#ffe2a4",
    grid: "rgba(255, 225, 210, 0.06)"
  },
  {
    name: "Verdant Circuit",
    bgA: "#08171a",
    bgB: "#123a39",
    accent: "#85ffb9",
    accentSoft: "rgba(133, 255, 185, 0.14)",
    rune: "#c5ffee",
    grid: "rgba(217, 255, 241, 0.05)"
  },
  {
    name: "Azure Rift",
    bgA: "#0d1021",
    bgB: "#203b67",
    accent: "#8fb4ff",
    accentSoft: "rgba(143, 180, 255, 0.16)",
    rune: "#d9e4ff",
    grid: "rgba(223, 236, 255, 0.06)"
  }
];

const BOSS_THEME = {
  name: "Tyrant Crucible",
  bgA: "#110816",
  bgB: "#341848",
  accent: "#ffd86a",
  accentSoft: "rgba(255, 216, 106, 0.16)",
  rune: "#65f0ff",
  grid: "rgba(255, 245, 219, 0.06)"
};

const WEAPON_LIST = [
  {
    key: "iron-bow",
    name: "Iron Bow",
    tier: 1,
    damage: 18,
    fireRate: 0.5,
    projectileSpeed: 560,
    shots: 1,
    spread: 0.02,
    size: 5,
    pierce: 1,
    knockback: 90,
    color: "#d6f6ff"
  },
  {
    key: "twin-fangs",
    name: "Twin Fangs",
    tier: 2,
    damage: 12,
    fireRate: 0.24,
    projectileSpeed: 620,
    shots: 2,
    spread: 0.18,
    size: 4,
    pierce: 1,
    knockback: 72,
    color: "#7ce8ff"
  },
  {
    key: "storm-rifle",
    name: "Storm Rifle",
    tier: 3,
    damage: 15,
    fireRate: 0.18,
    projectileSpeed: 660,
    shots: 1,
    spread: 0.06,
    size: 4,
    pierce: 1,
    knockback: 76,
    color: "#85ffb9"
  },
  {
    key: "ember-cannon",
    name: "Ember Cannon",
    tier: 4,
    damage: 34,
    fireRate: 0.64,
    projectileSpeed: 510,
    shots: 1,
    spread: 0.02,
    size: 8,
    pierce: 2,
    knockback: 168,
    color: "#ffae78"
  },
  {
    key: "void-lance",
    name: "Void Lance",
    tier: 5,
    damage: 25,
    fireRate: 0.32,
    projectileSpeed: 760,
    shots: 1,
    spread: 0.01,
    size: 6,
    pierce: 3,
    knockback: 120,
    color: "#ffd86a"
  },
  {
    key: "sunfall-array",
    name: "Sunfall Array",
    tier: 6,
    damage: 16,
    fireRate: 0.26,
    projectileSpeed: 640,
    shots: 3,
    spread: 0.26,
    size: 5,
    pierce: 1,
    knockback: 88,
    color: "#f5f6ff"
  }
];

const ARMOR_LIST = [
  {
    key: "traveler-cloth",
    name: "Traveler Cloth",
    tier: 1,
    maxHealth: 100,
    armor: 0,
    speed: 255,
    color: "#d6f6ff"
  },
  {
    key: "scout-mail",
    name: "Scout Mail",
    tier: 2,
    maxHealth: 118,
    armor: 1,
    speed: 272,
    color: "#7ce8ff"
  },
  {
    key: "warden-plate",
    name: "Warden Plate",
    tier: 3,
    maxHealth: 138,
    armor: 2,
    speed: 248,
    color: "#ffd86a"
  },
  {
    key: "phantom-weave",
    name: "Phantom Weave",
    tier: 4,
    maxHealth: 130,
    armor: 2,
    speed: 286,
    color: "#c5ffee"
  },
  {
    key: "bastion-shell",
    name: "Bastion Shell",
    tier: 5,
    maxHealth: 156,
    armor: 3,
    speed: 244,
    color: "#ffa57b"
  },
  {
    key: "astral-aegis",
    name: "Astral Aegis",
    tier: 6,
    maxHealth: 176,
    armor: 4,
    speed: 258,
    color: "#e4e9ff"
  }
];

const RELIC_LIST = [
  {
    key: "swiftstep-sigil",
    name: "Swiftstep Sigil",
    tier: 2,
    effect: "dash_cdr",
    value: 0.8,
    color: "#7ce8ff",
    description: "Dash cooldown shortened."
  },
  {
    key: "nova-coil",
    name: "Nova Coil",
    tier: 3,
    effect: "nova_boost",
    value: 38,
    extra: 20,
    color: "#ffd86a",
    description: "Nova hits harder and wider."
  },
  {
    key: "beam-prism",
    name: "Beam Prism",
    tier: 4,
    effect: "beam_mastery",
    value: 52,
    extra: 1.8,
    color: "#c5ffee",
    description: "Beam deals more damage and recharges faster."
  },
  {
    key: "blood-charm",
    name: "Blood Charm",
    tier: 3,
    effect: "lifesteal",
    value: 3,
    color: "#ff9ab0",
    description: "Restore health on kills."
  },
  {
    key: "overclock-rune",
    name: "Overclock Rune",
    tier: 4,
    effect: "fire_rate",
    value: 0.22,
    color: "#85ffb9",
    description: "Basic weapon attacks fire faster."
  },
  {
    key: "titan-core",
    name: "Titan Core",
    tier: 4,
    effect: "guard",
    value: 26,
    extra: 1,
    color: "#ffae78",
    description: "Gain bonus health and armor."
  },
  {
    key: "wind-thread",
    name: "Wind Thread",
    tier: 2,
    effect: "speed",
    value: 24,
    color: "#d6f6ff",
    description: "Movement speed increases."
  },
  {
    key: "warcrest",
    name: "Warcrest",
    tier: 5,
    effect: "damage",
    value: 0.18,
    color: "#f3f2ff",
    description: "All outgoing damage is stronger."
  }
];

const WEAPONS = Object.fromEntries(WEAPON_LIST.map((item) => [item.key, item]));
const ARMORS = Object.fromEntries(ARMOR_LIST.map((item) => [item.key, item]));
const RELICS = Object.fromEntries(RELIC_LIST.map((item) => [item.key, item]));

function readStoredNumber(key) {
  try {
    const raw = localStorage.getItem(key);
    return Number.parseInt(raw || "0", 10) || 0;
  } catch {
    return 0;
  }
}

function writeStoredNumber(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Some file:// browser contexts block storage access; the game should still run.
  }
}

const state = {
  running: false,
  gameOver: false,
  time: 0,
  floor: 1,
  score: 0,
  bestScore: readStoredNumber(BEST_SCORE_KEY),
  bestFloor: readStoredNumber(BEST_FLOOR_KEY),
  audioEnabled: true,
  pointerActive: false,
  pointerX: WIDTH / 2,
  pointerY: HEIGHT / 2,
  keys: new Set(),
  stars: createStars(90),
  enemies: [],
  projectiles: [],
  enemyProjectiles: [],
  pickups: [],
  beacons: [],
  particles: [],
  rings: [],
  beams: [],
  exitPortal: null,
  objective: null,
  currentTheme: THEMES[0],
  floorTimer: 0,
  spawnTimer: 0,
  message: "",
  messageTimer: 0,
  pendingRewards: 0,
  log: ["Boss fights arrive on floors 10, 20, 30, and beyond."],
  screenShake: 0,
  uiTimer: 0,
  nextEntityId: 1,
  lastInputX: 0,
  lastInputY: -1
};

const player = createPlayer();
let audioContext = null;
let lastFrame = performance.now();

function createPlayer() {
  return {
    x: WIDTH / 2,
    y: HEIGHT - 92,
    vx: 0,
    vy: 0,
    radius: 18,
    angle: -Math.PI / 2,
    weaponKey: "iron-bow",
    armorKey: "traveler-cloth",
    relicKeys: [],
    maxHealth: 100,
    health: 100,
    armor: 0,
    moveSpeed: 255,
    damageBonus: 0,
    fireRateBonus: 0,
    dashCdr: 0,
    novaCdr: 0,
    beamCdr: 0,
    beamDamageBonus: 0,
    novaDamageBonus: 0,
    novaRadiusBonus: 0,
    bonusHealth: 0,
    bonusArmor: 0,
    speedBonus: 0,
    lifesteal: 0,
    fireCooldown: 0,
    dashCooldown: 0,
    novaCooldown: 0,
    beamCooldown: 0,
    dashBaseCooldown: 4.2,
    novaBaseCooldown: 8.2,
    beamBaseCooldown: 12.5,
    invulnerable: 0,
    dashTimer: 0,
    dashAngle: -Math.PI / 2,
    dashHitIds: new Set(),
    trail: []
  };
}

function createStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    size: 0.8 + Math.random() * 2.4,
    twinkle: Math.random() * Math.PI * 2,
    speed: 6 + Math.random() * 18
  }));
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getWeapon() {
  return WEAPONS[player.weaponKey];
}

function getArmor() {
  return ARMORS[player.armorKey];
}

function getRelicSummary() {
  if (player.relicKeys.length === 0) {
    return "None yet";
  }

  if (player.relicKeys.length <= 3) {
    return player.relicKeys.map((key) => RELICS[key].name).join(", ");
  }

  const shown = player.relicKeys.slice(0, 3).map((key) => RELICS[key].name);
  return `${shown.join(", ")} +${player.relicKeys.length - 3} more`;
}

function recalculateHeroStats(preserveRatio = false) {
  const previousMax = player.maxHealth || 100;
  const previousRatio = previousMax > 0 ? player.health / previousMax : 1;
  const armorItem = getArmor();

  player.maxHealth = armorItem.maxHealth;
  player.armor = armorItem.armor;
  player.moveSpeed = armorItem.speed;
  player.damageBonus = 0;
  player.fireRateBonus = 0;
  player.dashCdr = 0;
  player.novaCdr = 0;
  player.beamCdr = 0;
  player.beamDamageBonus = 0;
  player.novaDamageBonus = 0;
  player.novaRadiusBonus = 0;
  player.bonusHealth = 0;
  player.bonusArmor = 0;
  player.speedBonus = 0;
  player.lifesteal = 0;

  for (const relicKey of player.relicKeys) {
    const relic = RELICS[relicKey];
    if (!relic) {
      continue;
    }

    switch (relic.effect) {
      case "dash_cdr":
        player.dashCdr += relic.value;
        break;
      case "nova_boost":
        player.novaDamageBonus += relic.value;
        player.novaRadiusBonus += relic.extra;
        break;
      case "beam_mastery":
        player.beamDamageBonus += relic.value;
        player.beamCdr += relic.extra;
        break;
      case "lifesteal":
        player.lifesteal += relic.value;
        break;
      case "fire_rate":
        player.fireRateBonus += relic.value;
        break;
      case "guard":
        player.bonusHealth += relic.value;
        player.bonusArmor += relic.extra;
        break;
      case "speed":
        player.speedBonus += relic.value;
        break;
      case "damage":
        player.damageBonus += relic.value;
        break;
      default:
        break;
    }
  }

  player.maxHealth += player.bonusHealth;
  player.armor += player.bonusArmor;
  player.moveSpeed += player.speedBonus;
  player.dashBaseCooldown = clamp(4.2 - player.dashCdr, 1.8, 4.2);
  player.novaBaseCooldown = clamp(8.2 - player.novaCdr, 4.4, 8.2);
  player.beamBaseCooldown = clamp(12.5 - player.beamCdr, 6.4, 12.5);

  if (preserveRatio) {
    player.health = clamp(player.maxHealth * previousRatio, 1, player.maxHealth);
  } else {
    player.health = Math.min(player.health, player.maxHealth);
  }
}

function initAudio() {
  if (!state.audioEnabled) {
    return;
  }

  if (!audioContext) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) {
      return;
    }
    audioContext = new Context();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(frequency, duration, type, volume, glide = 0) {
  if (!state.audioEnabled || !audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  const endFrequency = Math.max(28, frequency + glide);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  if (glide !== 0) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function addParticles(x, y, color, amount, speed) {
  for (let index = 0; index < amount; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = randomRange(speed * 0.3, speed);
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * magnitude,
      vy: Math.sin(angle) * magnitude,
      size: randomRange(2, 5.5),
      life: randomRange(0.35, 0.95),
      maxLife: randomRange(0.35, 0.95),
      color
    });
  }
}

function addRing(x, y, color, radius, width = 10, life = 0.4) {
  state.rings.push({
    x,
    y,
    radius,
    width,
    life,
    maxLife: life,
    color
  });
}

function addBeam(x1, y1, x2, y2, color, life = 0.18) {
  state.beams.push({
    x1,
    y1,
    x2,
    y2,
    color,
    life,
    maxLife: life
  });
}

function logEvent(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 6);
  renderLog();
}

function renderLog() {
  logList.textContent = "";
  for (const entry of state.log) {
    const item = document.createElement("li");
    item.textContent = entry;
    logList.appendChild(item);
  }
}

function setOverlay(title, help) {
  statusLabel.textContent = title;
  overlayHelp.textContent = help;
}

function pushMessage(text, duration = 2.4) {
  state.message = text;
  state.messageTimer = duration;
}

function maybeSaveRecords() {
  let changed = false;

  if (Math.floor(state.score) > state.bestScore) {
    state.bestScore = Math.floor(state.score);
    changed = true;
  }

  if (state.floor > state.bestFloor) {
    state.bestFloor = state.floor;
    changed = true;
  }

  if (changed) {
    writeStoredNumber(BEST_SCORE_KEY, state.bestScore);
    writeStoredNumber(BEST_FLOOR_KEY, state.bestFloor);
  }
}

function resetRun() {
  state.running = false;
  state.gameOver = false;
  state.time = 0;
  state.floor = 1;
  state.score = 0;
  state.pointerActive = false;
  state.pointerX = WIDTH / 2;
  state.pointerY = HEIGHT / 2;
  state.keys.clear();
  state.log = ["Boss fights arrive on floors 10, 20, 30, and beyond."];
  state.message = "";
  state.messageTimer = 0;
  state.uiTimer = 0;
  state.screenShake = 0;
  state.nextEntityId = 1;
  state.lastInputX = 0;
  state.lastInputY = -1;

  Object.assign(player, createPlayer());
  recalculateHeroStats(false);
  player.health = player.maxHealth;

  renderLog();
  prepareFloor(1, true);
  overlay.classList.remove("is-hidden");
  restartButton.hidden = true;
  setOverlay(
    "Press Start to begin",
    "Move with WASD or the arrow keys, trigger abilities to survive, finish the objective, grab your reward, and step into the exit portal."
  );
  updateUi(true);
}

function startAdventure() {
  if (state.running) {
    return;
  }

  if (state.gameOver) {
    resetRun();
  }

  initAudio();
  state.running = true;
  overlay.classList.add("is-hidden");
  restartButton.hidden = true;
  pushMessage(`Floor ${state.floor} | ${state.currentTheme.name}`);
}

function endRun() {
  state.running = false;
  state.gameOver = true;
  maybeSaveRecords();
  overlay.classList.remove("is-hidden");
  restartButton.hidden = false;
  setOverlay(
    `Fallen on floor ${state.floor}`,
    `Score ${Math.floor(state.score)}. Best floor ${state.bestFloor}. Press Restart Run to dive back in.`
  );
  pushMessage("The run has ended.");
  playTone(160, 0.24, "triangle", 0.09);
  playTone(110, 0.3, "sawtooth", 0.05, -28);
}

function prepareFloor(floor, isFreshRun = false) {
  state.floor = floor;
  state.floorTimer = 0;
  state.spawnTimer = 0.8;
  state.enemies = [];
  state.projectiles = [];
  state.enemyProjectiles = [];
  state.pickups = [];
  state.beacons = [];
  state.particles = [];
  state.rings = [];
  state.beams = [];
  state.exitPortal = null;
  state.pendingRewards = 0;
  state.currentTheme = floor % 10 === 0 ? BOSS_THEME : THEMES[(floor - 1) % THEMES.length];

  player.x = WIDTH / 2;
  player.y = HEIGHT - 92;
  player.vx = 0;
  player.vy = 0;
  player.angle = -Math.PI / 2;
  player.trail = [];
  player.dashHitIds = new Set();
  player.fireCooldown = 0.18;
  player.dashCooldown = Math.max(0, player.dashCooldown - 0.5);
  player.novaCooldown = Math.max(0, player.novaCooldown - 0.5);
  player.beamCooldown = Math.max(0, player.beamCooldown - 0.5);
  player.invulnerable = 0.8;

  if (!isFreshRun) {
    const healAmount = Math.round(player.maxHealth * 0.18) + 12;
    player.health = Math.min(player.maxHealth, player.health + healAmount);
  }

  state.objective = createObjectiveForFloor(floor);
  pushMessage(floor % 10 === 0 ? `Boss floor ${floor}` : `Floor ${floor} | ${state.currentTheme.name}`, 2.8);
  logEvent(floor % 10 === 0 ? `Entered boss floor ${floor}.` : `Entered floor ${floor}.`);
  updateUi(true);
}

function createObjectiveForFloor(floor) {
  if (floor % 10 === 0) {
    const boss = spawnBoss(floor);
    return {
      type: "boss",
      title: `Defeat ${boss.name}`,
      description: "Boss fight. Avoid its patterns, use abilities, and finish the tyrant.",
      progress: 0,
      target: boss.maxHealth,
      completed: false
    };
  }

  const typeIndex = floor < 4 ? (floor - 1) % 3 : (floor - 1) % 4;
  const types = floor < 4 ? ["collect", "hunt", "beacon"] : ["collect", "hunt", "beacon", "elite"];
  const type = types[typeIndex];

  if (type === "collect") {
    const target = 3 + Math.floor(floor / 2);
    for (let index = 0; index < target; index += 1) {
      state.pickups.push(createObjectiveCore());
    }
    spawnEnemyWave(2 + Math.floor(floor / 2));
    return {
      type,
      title: "Recover Ancient Cores",
      description: "Sweep the arena and collect every glowing core while enemies try to cut you off.",
      progress: 0,
      target,
      completed: false
    };
  }

  if (type === "hunt") {
    const target = 6 + floor * 2;
    spawnEnemyWave(3 + Math.floor(floor / 2));
    return {
      type,
      title: "Purge the Swarm",
      description: "Defeat enough enemies to clear the floor and earn a new upgrade.",
      progress: 0,
      target,
      completed: false
    };
  }

  if (type === "beacon") {
    const target = floor < 6 ? 2 : 3;
    state.beacons = createBeacons(target);
    spawnEnemyWave(3 + Math.floor(floor / 2));
    return {
      type,
      title: "Secure the Beacons",
      description: "Stand near each beacon until its charge completes, then move to the next one.",
      progress: 0,
      target,
      completed: false
    };
  }

  const elite = spawnEnemy("elite", { objectiveElite: true });
  spawnEnemyWave(2 + Math.floor(floor / 3));
  elite.health *= 1.12;
  elite.maxHealth = elite.health;
  return {
    type: "elite",
    title: "Hunt the Floor Captain",
    description: "Bring down the elite commander. The rest of the floor will scatter when it falls.",
    progress: 0,
    target: 1,
    completed: false
  };
}

function createBeacons(count) {
  const layouts = [
    [
      { x: WIDTH * 0.26, y: HEIGHT * 0.28 },
      { x: WIDTH * 0.73, y: HEIGHT * 0.68 }
    ],
    [
      { x: WIDTH * 0.22, y: HEIGHT * 0.24 },
      { x: WIDTH * 0.76, y: HEIGHT * 0.25 },
      { x: WIDTH * 0.5, y: HEIGHT * 0.72 }
    ]
  ];

  const chosen = count === 2 ? layouts[0] : layouts[1];
  return chosen.map((point) => ({
    x: point.x,
    y: point.y,
    radius: 24,
    progress: 0,
    active: false,
    pulse: Math.random() * Math.PI * 2
  }));
}

function spawnEnemyWave(count) {
  for (let index = 0; index < count; index += 1) {
    spawnEnemy(pickEnemyKindForFloor(state.floor));
  }
}

function pickEnemyKindForFloor(floor) {
  const roll = Math.random();

  if (floor < 3) {
    return "skitter";
  }

  if (roll < 0.45) {
    return "skitter";
  }
  if (roll < 0.74) {
    return "ranger";
  }
  if (roll < 0.92) {
    return "brute";
  }
  return "elite";
}

function spawnAtEdge(radius) {
  const side = Math.floor(Math.random() * 4);
  if (side === 0) {
    return { x: -radius, y: randomRange(radius, HEIGHT - radius) };
  }
  if (side === 1) {
    return { x: WIDTH + radius, y: randomRange(radius, HEIGHT - radius) };
  }
  if (side === 2) {
    return { x: randomRange(radius, WIDTH - radius), y: -radius };
  }
  return { x: randomRange(radius, WIDTH - radius), y: HEIGHT + radius };
}

function spawnEnemy(kind, options = {}) {
  const templates = {
    skitter: {
      radius: 13,
      hp: 32,
      hpScale: 5,
      speed: 118,
      speedScale: 2.6,
      touchDamage: 11,
      color: "#ff5f75",
      score: 28,
      behavior: "melee"
    },
    brute: {
      radius: 19,
      hp: 72,
      hpScale: 8,
      speed: 76,
      speedScale: 1.7,
      touchDamage: 17,
      color: "#ff9350",
      score: 46,
      behavior: "melee"
    },
    ranger: {
      radius: 16,
      hp: 46,
      hpScale: 6,
      speed: 88,
      speedScale: 1.9,
      touchDamage: 10,
      color: "#8fb4ff",
      score: 38,
      behavior: "ranged",
      projectileDamage: 11,
      preferredDistance: 176,
      fireRate: 1.8
    },
    elite: {
      radius: 24,
      hp: 148,
      hpScale: 13,
      speed: 94,
      speedScale: 1.8,
      touchDamage: 21,
      color: "#ffd86a",
      score: 96,
      behavior: "hybrid",
      projectileDamage: 16,
      preferredDistance: 150,
      fireRate: 1.45
    }
  };

  const template = templates[kind];
  const position = spawnAtEdge(template.radius);
  const enemy = {
    id: state.nextEntityId++,
    kind,
    x: options.x ?? position.x,
    y: options.y ?? position.y,
    vx: 0,
    vy: 0,
    radius: template.radius,
    maxHealth: template.hp + state.floor * template.hpScale,
    health: template.hp + state.floor * template.hpScale,
    speed: template.speed + state.floor * template.speedScale,
    touchDamage: template.touchDamage + state.floor * 0.9,
    color: template.color,
    score: template.score + state.floor * 2,
    behavior: template.behavior,
    projectileDamage: template.projectileDamage ? template.projectileDamage + state.floor * 0.8 : 0,
    preferredDistance: template.preferredDistance || 0,
    fireRate: template.fireRate || 0,
    shootCooldown: randomRange(0.4, template.fireRate || 1.2),
    hitFlash: 0,
    objectiveElite: Boolean(options.objectiveElite),
    elite: kind === "elite",
    boss: false,
    strafeSeed: Math.random() * Math.PI * 2,
    chargeCooldown: 4 + Math.random(),
    dead: false
  };

  state.enemies.push(enemy);
  return enemy;
}

function spawnBoss(floor) {
  const names = ["Ashen Warden", "Void Hydra", "Storm Matriarch", "Iron Tyrant"];
  const name = names[(Math.floor(floor / 10) - 1) % names.length];
  const boss = {
    id: state.nextEntityId++,
    kind: "boss",
    name,
    x: WIDTH / 2,
    y: HEIGHT * 0.22,
    vx: 0,
    vy: 0,
    radius: 46,
    maxHealth: 520 + floor * 68,
    health: 520 + floor * 68,
    speed: 82 + floor * 1.3,
    touchDamage: 24 + floor * 1.6,
    projectileDamage: 17 + floor * 1.3,
    color: "#ffd86a",
    score: 520 + floor * 44,
    behavior: "boss",
    boss: true,
    elite: true,
    hitFlash: 0,
    shootCooldown: 1.05,
    radialCooldown: 3.8,
    summonCooldown: 6.8,
    chargeCooldown: 4.9,
    chargeTimer: 0,
    chargeAngle: 0,
    dead: false
  };

  state.enemies.push(boss);
  return boss;
}

function createObjectiveCore() {
  return {
    kind: "objective-core",
    x: randomRange(60, WIDTH - 60),
    y: randomRange(72, HEIGHT - 60),
    radius: 13,
    bob: Math.random() * Math.PI * 2,
    spin: Math.random() * Math.PI * 2
  };
}

function createHealPickup(x, y, amount = 24) {
  return {
    kind: "heal",
    x,
    y,
    amount,
    radius: 12,
    bob: Math.random() * Math.PI * 2,
    spin: Math.random() * Math.PI * 2
  };
}

function rarityLabel(tier) {
  if (tier <= 2) {
    return "Common";
  }
  if (tier <= 4) {
    return "Rare";
  }
  return "Legendary";
}

function chooseBetterItem(list, currentTier, floorCap, atLeastOneTierBetter) {
  let candidates = list.filter((item) => item.tier <= floorCap && item.tier > currentTier);
  if (atLeastOneTierBetter && candidates.length === 0) {
    candidates = list.filter((item) => item.tier <= floorCap && item.tier >= currentTier);
  }
  if (candidates.length === 0) {
    candidates = list.filter((item) => item.tier <= floorCap);
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function createRewardPickups(isBoss = false) {
  const rewards = [];
  const floorCap = Math.min(6, 1 + Math.floor((state.floor + (isBoss ? 3 : 1)) / 2));

  if (state.floor === 1) {
    rewards.push(makeWeaponReward(floorCap, true));
  } else if (state.floor === 2) {
    rewards.push(makeArmorReward(floorCap, true));
  } else if (isBoss) {
    rewards.push(makeWeaponReward(floorCap, true));
    rewards.push(makeRelicReward(floorCap, true));
  } else {
    const roll = Math.random();
    if (roll < 0.42) {
      rewards.push(makeWeaponReward(floorCap, false));
    } else if (roll < 0.76) {
      rewards.push(makeArmorReward(floorCap, false));
    } else {
      rewards.push(makeRelicReward(floorCap, false));
    }
  }

  const spacing = rewards.length === 1 ? [0] : [-54, 54];
  rewards.forEach((reward, index) => {
    state.pickups.push({
      kind: "reward",
      reward,
      x: WIDTH / 2 + spacing[index],
      y: HEIGHT / 2 + 30,
      radius: 16,
      bob: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2
    });
  });

  state.pendingRewards = rewards.length;
}

function makeWeaponReward(floorCap, strongerBias) {
  const current = getWeapon();
  const choice = chooseBetterItem(WEAPON_LIST, current.tier, floorCap, strongerBias);
  return {
    slot: "weapon",
    key: choice.key,
    name: choice.name,
    tier: choice.tier,
    rarity: rarityLabel(choice.tier),
    color: choice.color,
    description: `${choice.damage} dmg, ${Math.round(1 / choice.fireRate)} tempo`
  };
}

function makeArmorReward(floorCap, strongerBias) {
  const current = getArmor();
  const choice = chooseBetterItem(ARMOR_LIST, current.tier, floorCap, strongerBias);
  return {
    slot: "armor",
    key: choice.key,
    name: choice.name,
    tier: choice.tier,
    rarity: rarityLabel(choice.tier),
    color: choice.color,
    description: `${choice.maxHealth} health, ${choice.armor} armor`
  };
}

function makeRelicReward(floorCap, strongerBias) {
  let candidates = RELIC_LIST.filter((item) => item.tier <= floorCap && !player.relicKeys.includes(item.key));
  if (strongerBias && candidates.length > 0) {
    const bestTier = Math.max(...candidates.map((item) => item.tier));
    candidates = candidates.filter((item) => item.tier >= bestTier - 1);
  }
  if (candidates.length === 0) {
    return makeArmorReward(floorCap, false);
  }
  const choice = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    slot: "relic",
    key: choice.key,
    name: choice.name,
    tier: choice.tier,
    rarity: rarityLabel(choice.tier),
    color: choice.color,
    description: choice.description
  };
}

function spawnExitPortal() {
  state.exitPortal = {
    x: WIDTH / 2,
    y: HEIGHT * 0.18,
    radius: 28,
    spin: 0,
    open: state.pendingRewards === 0
  };
}

function applyReward(reward) {
  if (reward.slot === "weapon") {
    if (reward.key !== player.weaponKey) {
      player.weaponKey = reward.key;
      state.score += 140 + reward.tier * 12;
      logEvent(`Equipped weapon: ${reward.name}.`);
    } else {
      state.score += 85;
      player.health = Math.min(player.maxHealth, player.health + 10);
      logEvent(`Salvaged duplicate ${reward.name} into bonus score.`);
    }
  } else if (reward.slot === "armor") {
    if (reward.key !== player.armorKey) {
      player.armorKey = reward.key;
      recalculateHeroStats(true);
      player.health = Math.min(player.maxHealth, player.health + 16);
      state.score += 140 + reward.tier * 12;
      logEvent(`Equipped armor: ${reward.name}.`);
    } else {
      state.score += 85;
      player.health = Math.min(player.maxHealth, player.health + 12);
      logEvent(`Reinforced your existing ${reward.name}.`);
    }
  } else if (reward.slot === "relic") {
    if (!player.relicKeys.includes(reward.key)) {
      player.relicKeys.push(reward.key);
      recalculateHeroStats(true);
      player.health = Math.min(player.maxHealth, player.health + 12);
      state.score += 180 + reward.tier * 14;
      logEvent(`Relic claimed: ${reward.name}.`);
    } else {
      state.score += 100;
      logEvent(`Duplicate relic converted into essence.`);
    }
  }

  addParticles(player.x, player.y, reward.color, 18, 170);
  pushMessage(`${reward.rarity} ${reward.slot} acquired: ${reward.name}`, 2.8);
  playTone(580, 0.12, "triangle", 0.045, 120);
  playTone(820, 0.16, "sine", 0.03, 180);

  state.pendingRewards = Math.max(0, state.pendingRewards - 1);
  if (state.pendingRewards === 0 && state.exitPortal) {
    state.exitPortal.open = true;
    logEvent("The exit portal has opened.");
  }

  updateUi(true);
}

function getAbilityAngle() {
  if (state.pointerActive) {
    const dx = state.pointerX - player.x;
    const dy = state.pointerY - player.y;
    if (Math.hypot(dx, dy) > 16) {
      return Math.atan2(dy, dx);
    }
  }

  const inputMagnitude = Math.hypot(state.lastInputX, state.lastInputY);
  if (inputMagnitude > 0.01) {
    return Math.atan2(state.lastInputY, state.lastInputX);
  }

  const target = getNearestEnemy(520);
  if (target) {
    return Math.atan2(target.y - player.y, target.x - player.x);
  }

  return player.angle;
}

function getNearestEnemy(range = Infinity) {
  let nearest = null;
  let nearestDistance = range;
  for (const enemy of state.enemies) {
    const enemyDistance = distance(player.x, player.y, enemy.x, enemy.y);
    if (enemyDistance < nearestDistance) {
      nearest = enemy;
      nearestDistance = enemyDistance;
    }
  }
  return nearest;
}

function triggerDash() {
  if (!state.running || player.dashCooldown > 0) {
    return;
  }

  initAudio();
  player.dashAngle = getAbilityAngle();
  player.dashTimer = 0.16;
  player.dashCooldown = player.dashBaseCooldown;
  player.invulnerable = 0.36;
  player.dashHitIds = new Set();
  addRing(player.x, player.y, "#6af0ff", 34, 8, 0.26);
  addParticles(player.x, player.y, "#6af0ff", 16, 210);
  playTone(290, 0.14, "square", 0.05, 180);
}

function triggerNova() {
  if (!state.running || player.novaCooldown > 0) {
    return;
  }

  initAudio();
  const radius = 132 + player.novaRadiusBonus;
  const damage = 48 + state.floor * 3 + player.novaDamageBonus;
  let hits = 0;

  for (const enemy of state.enemies) {
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const enemyDistance = Math.max(1, Math.hypot(dx, dy));
    if (enemyDistance > radius + enemy.radius) {
      continue;
    }

    hits += 1;
    const angle = Math.atan2(dy, dx);
    dealDamageToEnemy(enemy, damage, angle, 240, "#ffd86a");
  }

  player.novaCooldown = player.novaBaseCooldown;
  addRing(player.x, player.y, "#ffd86a", radius, 16, 0.44);
  addParticles(player.x, player.y, "#ffd86a", 22, 220);
  state.screenShake = Math.max(state.screenShake, 5);
  pushMessage(hits > 0 ? `Nova struck ${hits} foes.` : "Nova discharged.");
  playTone(340, 0.18, "triangle", 0.06, -120);
  playTone(620, 0.14, "sine", 0.03, 180);
}

function triggerBeam() {
  if (!state.running || player.beamCooldown > 0) {
    return;
  }

  initAudio();
  const angle = getAbilityAngle();
  const length = 360;
  const damage = 70 + state.floor * 4 + player.beamDamageBonus;
  const x2 = player.x + Math.cos(angle) * length;
  const y2 = player.y + Math.sin(angle) * length;
  let hits = 0;

  for (const enemy of state.enemies) {
    const d = distanceToSegment(enemy.x, enemy.y, player.x, player.y, x2, y2);
    if (d <= enemy.radius + 12) {
      hits += 1;
      dealDamageToEnemy(enemy, damage, angle, 180, "#85ffb9");
    }
  }

  player.beamCooldown = player.beamBaseCooldown;
  addBeam(player.x, player.y, x2, y2, "#85ffb9");
  addParticles(x2, y2, "#85ffb9", 14, 180);
  state.screenShake = Math.max(state.screenShake, 3);
  pushMessage(hits > 0 ? `Beam pierced ${hits} targets.` : "Beam fired.");
  playTone(480, 0.16, "sawtooth", 0.05, 220);
  playTone(760, 0.22, "triangle", 0.03, -60);
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const lineDx = x2 - x1;
  const lineDy = y2 - y1;
  const lineLengthSquared = lineDx * lineDx + lineDy * lineDy;

  if (lineLengthSquared === 0) {
    return Math.hypot(px - x1, py - y1);
  }

  const t = clamp(((px - x1) * lineDx + (py - y1) * lineDy) / lineLengthSquared, 0, 1);
  const projX = x1 + t * lineDx;
  const projY = y1 + t * lineDy;
  return Math.hypot(px - projX, py - projY);
}

function spawnPlayerProjectile(angle, weapon) {
  state.projectiles.push({
    x: player.x + Math.cos(angle) * (player.radius + 6),
    y: player.y + Math.sin(angle) * (player.radius + 6),
    vx: Math.cos(angle) * weapon.projectileSpeed,
    vy: Math.sin(angle) * weapon.projectileSpeed,
    radius: weapon.size,
    damage: weapon.damage * (1 + player.damageBonus),
    knockback: weapon.knockback,
    pierce: weapon.pierce,
    color: weapon.color,
    life: 1.6
  });
}

function autoFire(dt) {
  player.fireCooldown = Math.max(0, player.fireCooldown - dt);
  if (player.fireCooldown > 0) {
    return;
  }

  const target = getNearestEnemy(520);
  if (!target) {
    return;
  }

  const weapon = getWeapon();
  const baseAngle = Math.atan2(target.y - player.y, target.x - player.x);
  player.angle = baseAngle;

  for (let shotIndex = 0; shotIndex < weapon.shots; shotIndex += 1) {
    const spreadOffset = weapon.shots === 1 ? 0 : weapon.spread * (shotIndex - (weapon.shots - 1) / 2);
    spawnPlayerProjectile(baseAngle + spreadOffset, weapon);
  }

  player.fireCooldown = weapon.fireRate / (1 + player.fireRateBonus);
}

function hurtPlayer(amount, sourceX, sourceY) {
  if (player.invulnerable > 0 || !state.running) {
    return;
  }

  const mitigated = Math.max(3, amount - player.armor * 2.4);
  player.health -= mitigated;
  player.invulnerable = 0.72;
  state.screenShake = Math.max(state.screenShake, 4);

  const dx = player.x - sourceX;
  const dy = player.y - sourceY;
  const angle = Math.atan2(dy, dx);
  player.vx += Math.cos(angle) * 180;
  player.vy += Math.sin(angle) * 180;

  addParticles(player.x, player.y, "#ff6d84", 16, 220);
  playTone(220, 0.12, "sawtooth", 0.065, -50);
  playTone(140, 0.18, "triangle", 0.05, -20);

  if (player.health <= 0) {
    player.health = 0;
    endRun();
  } else {
    pushMessage(`Took ${Math.ceil(mitigated)} damage.`, 1.5);
  }
}

function dealDamageToEnemy(enemy, amount, angle, knockback, color) {
  if (enemy.dead) {
    return;
  }

  enemy.health -= amount;
  enemy.hitFlash = 0.12;
  enemy.vx += Math.cos(angle) * knockback;
  enemy.vy += Math.sin(angle) * knockback;
  addParticles(enemy.x, enemy.y, color, enemy.boss ? 5 : 3, 90);

  if (enemy.health <= 0) {
    enemy.dead = true;
    handleEnemyDefeat(enemy);
  }
}

function handleEnemyDefeat(enemy) {
  state.score += enemy.score;
  addParticles(enemy.x, enemy.y, enemy.color, enemy.boss ? 26 : 14, enemy.boss ? 220 : 150);

  if (player.lifesteal > 0) {
    player.health = Math.min(player.maxHealth, player.health + player.lifesteal);
  }

  if (!enemy.boss && Math.random() < 0.08) {
    state.pickups.push(createHealPickup(enemy.x, enemy.y, 20 + Math.floor(state.floor / 2)));
  }

  if (state.objective && !state.objective.completed) {
    if (state.objective.type === "hunt" && !enemy.boss) {
      state.objective.progress += 1;
      if (state.objective.progress >= state.objective.target) {
        completeObjective(false);
      }
    }

    if (state.objective.type === "elite" && enemy.objectiveElite) {
      state.objective.progress = 1;
      completeObjective(false);
    }

    if (state.objective.type === "boss" && enemy.boss) {
      state.objective.progress = state.objective.target;
      completeObjective(true);
    }
  }

  if (enemy.boss) {
    playTone(170, 0.24, "sawtooth", 0.06, -40);
    playTone(280, 0.3, "triangle", 0.05, 140);
  }
}

function completeObjective(isBoss) {
  if (!state.objective || state.objective.completed) {
    return;
  }

  state.objective.completed = true;
  state.score += isBoss ? 600 + state.floor * 28 : 220 + state.floor * 18;
  state.enemies = [];
  state.enemyProjectiles = [];
  addParticles(WIDTH / 2, HEIGHT / 2, isBoss ? "#ffd86a" : "#6af0ff", isBoss ? 40 : 24, 230);
  createRewardPickups(isBoss);
  spawnExitPortal();
  pushMessage(isBoss ? "Boss defeated. Claim your spoils." : "Objective complete. Claim your reward.", 3);
  logEvent(isBoss ? `Boss floor ${state.floor} cleared.` : `Objective cleared on floor ${state.floor}.`);
  playTone(isBoss ? 420 : 540, 0.18, "triangle", 0.06, 160);
  playTone(isBoss ? 720 : 780, 0.22, "sine", 0.03, 220);
  updateUi(true);
}

function advanceFloor() {
  prepareFloor(state.floor + 1, false);
  maybeSaveRecords();
}

function getInputVector() {
  let inputX = 0;
  let inputY = 0;

  if (state.keys.has("w") || state.keys.has("arrowup")) {
    inputY -= 1;
  }
  if (state.keys.has("s") || state.keys.has("arrowdown")) {
    inputY += 1;
  }
  if (state.keys.has("a") || state.keys.has("arrowleft")) {
    inputX -= 1;
  }
  if (state.keys.has("d") || state.keys.has("arrowright")) {
    inputX += 1;
  }

  if (state.pointerActive) {
    const dx = state.pointerX - player.x;
    const dy = state.pointerY - player.y;
    const pointerDistance = Math.hypot(dx, dy);
    if (pointerDistance > 8) {
      inputX += dx / pointerDistance;
      inputY += dy / pointerDistance;
    }
  }

  const magnitude = Math.hypot(inputX, inputY);
  if (magnitude > 0) {
    inputX /= magnitude;
    inputY /= magnitude;
    state.lastInputX = inputX;
    state.lastInputY = inputY;
  }

  return { x: inputX, y: inputY, magnitude };
}

function updatePlayer(dt) {
  const input = getInputVector();

  player.invulnerable = Math.max(0, player.invulnerable - dt);
  player.dashCooldown = Math.max(0, player.dashCooldown - dt);
  player.novaCooldown = Math.max(0, player.novaCooldown - dt);
  player.beamCooldown = Math.max(0, player.beamCooldown - dt);

  if (player.dashTimer > 0) {
    player.dashTimer = Math.max(0, player.dashTimer - dt);
    player.vx = Math.cos(player.dashAngle) * 560;
    player.vy = Math.sin(player.dashAngle) * 560;

    for (const enemy of state.enemies) {
      if (player.dashHitIds.has(enemy.id)) {
        continue;
      }
      const enemyDistance = distance(player.x, player.y, enemy.x, enemy.y);
      if (enemyDistance <= player.radius + enemy.radius + 8) {
        player.dashHitIds.add(enemy.id);
        dealDamageToEnemy(enemy, 26 + state.floor * 2 + player.damageBonus * 20, player.dashAngle, 180, "#6af0ff");
      }
    }
  } else {
    const acceleration = player.moveSpeed * 6;
    player.vx += input.x * acceleration * dt;
    player.vy += input.y * acceleration * dt;
    player.vx -= player.vx * 6.4 * dt;
    player.vy -= player.vy * 6.4 * dt;

    const speed = Math.hypot(player.vx, player.vy);
    if (speed > player.moveSpeed) {
      const ratio = player.moveSpeed / speed;
      player.vx *= ratio;
      player.vy *= ratio;
    }
  }

  player.x = clamp(player.x + player.vx * dt, player.radius, WIDTH - player.radius);
  player.y = clamp(player.y + player.vy * dt, player.radius, HEIGHT - player.radius);

  if (state.pointerActive || input.magnitude > 0) {
    player.angle = getAbilityAngle();
  } else {
    const target = getNearestEnemy(420);
    if (target) {
      player.angle = Math.atan2(target.y - player.y, target.x - player.x);
    }
  }

  player.trail.unshift({
    x: player.x,
    y: player.y,
    life: 0.28
  });
  player.trail = player.trail.slice(0, 14);
  for (const segment of player.trail) {
    segment.life -= dt;
  }
  player.trail = player.trail.filter((segment) => segment.life > 0);

  autoFire(dt);
}

function updateEnemy(enemy, dt) {
  enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);

  if (enemy.boss) {
    updateBoss(enemy, dt);
    return;
  }

  enemy.shootCooldown = Math.max(0, enemy.shootCooldown - dt);
  enemy.chargeCooldown = Math.max(0, enemy.chargeCooldown - dt);

  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const directionX = dx / dist;
  const directionY = dy / dist;
  let desiredX = directionX;
  let desiredY = directionY;
  let speedMultiplier = 1;

  if (enemy.behavior === "ranged" || enemy.behavior === "hybrid") {
    const preferred = enemy.preferredDistance;
    if (dist < preferred - 20) {
      desiredX = -directionX;
      desiredY = -directionY;
    } else if (dist > preferred + 20) {
      desiredX = directionX;
      desiredY = directionY;
    } else {
      const strafeAngle = Math.atan2(dy, dx) + Math.PI / 2;
      desiredX = Math.cos(strafeAngle + Math.sin(state.time + enemy.strafeSeed) * 0.35);
      desiredY = Math.sin(strafeAngle + Math.sin(state.time + enemy.strafeSeed) * 0.35);
      speedMultiplier = 0.92;
    }

    if (enemy.shootCooldown <= 0 && dist < 400) {
      fireEnemyShot(enemy, Math.atan2(dy, dx));
      enemy.shootCooldown = enemy.fireRate;
    }

    if (enemy.behavior === "hybrid" && enemy.chargeCooldown <= 0 && dist > 120) {
      enemy.vx += directionX * 190;
      enemy.vy += directionY * 190;
      enemy.chargeCooldown = 4.4;
    }
  }

  enemy.vx += desiredX * enemy.speed * 4 * dt;
  enemy.vy += desiredY * enemy.speed * 4 * dt;
  enemy.vx -= enemy.vx * 4.8 * dt;
  enemy.vy -= enemy.vy * 4.8 * dt;

  const velocity = Math.hypot(enemy.vx, enemy.vy);
  const maxSpeed = enemy.speed * speedMultiplier;
  if (velocity > maxSpeed) {
    const ratio = maxSpeed / velocity;
    enemy.vx *= ratio;
    enemy.vy *= ratio;
  }

  enemy.x = clamp(enemy.x + enemy.vx * dt, enemy.radius, WIDTH - enemy.radius);
  enemy.y = clamp(enemy.y + enemy.vy * dt, enemy.radius, HEIGHT - enemy.radius);

  if (distance(player.x, player.y, enemy.x, enemy.y) < player.radius + enemy.radius * 0.9) {
    hurtPlayer(enemy.touchDamage, enemy.x, enemy.y);
  }
}

function updateBoss(boss, dt) {
  boss.hitFlash = Math.max(0, boss.hitFlash - dt);
  boss.shootCooldown = Math.max(0, boss.shootCooldown - dt);
  boss.radialCooldown = Math.max(0, boss.radialCooldown - dt);
  boss.summonCooldown = Math.max(0, boss.summonCooldown - dt);
  boss.chargeCooldown = Math.max(0, boss.chargeCooldown - dt);

  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const angleToPlayer = Math.atan2(dy, dx);

  if (boss.chargeTimer > 0) {
    boss.chargeTimer = Math.max(0, boss.chargeTimer - dt);
    boss.vx = Math.cos(boss.chargeAngle) * 430;
    boss.vy = Math.sin(boss.chargeAngle) * 430;
    addParticles(boss.x, boss.y, "#ffd86a", 2, 60);
  } else {
    const orbitAngle = angleToPlayer + Math.sin(state.time * 1.2) * 0.9;
    const desiredDistance = 180;
    const desiredX =
      dist > desiredDistance + 20 ? Math.cos(angleToPlayer) : dist < desiredDistance - 20 ? -Math.cos(angleToPlayer) : Math.cos(orbitAngle + Math.PI / 2);
    const desiredY =
      dist > desiredDistance + 20 ? Math.sin(angleToPlayer) : dist < desiredDistance - 20 ? -Math.sin(angleToPlayer) : Math.sin(orbitAngle + Math.PI / 2);

    boss.vx += desiredX * boss.speed * 4.2 * dt;
    boss.vy += desiredY * boss.speed * 4.2 * dt;
    boss.vx -= boss.vx * 4.4 * dt;
    boss.vy -= boss.vy * 4.4 * dt;

    if (boss.shootCooldown <= 0) {
      fireEnemySpread(boss, angleToPlayer, 3, 0.22, boss.projectileDamage, "#ffd86a", 300);
      boss.shootCooldown = 1.2;
    }

    if (boss.radialCooldown <= 0) {
      fireRadialBurst(boss, 12, boss.projectileDamage - 2, "#ff8c6f", 220);
      boss.radialCooldown = 4.2;
      pushMessage(`${boss.name} unleashes a radial burst!`, 1.8);
    }

    if (boss.summonCooldown <= 0) {
      spawnEnemy(Math.random() < 0.5 ? "ranger" : "skitter");
      spawnEnemy(Math.random() < 0.5 ? "brute" : "skitter");
      boss.summonCooldown = 7.2;
      logEvent(`${boss.name} summoned reinforcements.`);
    }

    if (boss.chargeCooldown <= 0) {
      boss.chargeTimer = 0.5;
      boss.chargeAngle = angleToPlayer;
      boss.chargeCooldown = 5.4;
      pushMessage(`${boss.name} is charging!`, 1.4);
    }
  }

  const bossSpeed = Math.hypot(boss.vx, boss.vy);
  const bossMaxSpeed = boss.chargeTimer > 0 ? 430 : boss.speed + 42;
  if (bossSpeed > bossMaxSpeed) {
    const ratio = bossMaxSpeed / bossSpeed;
    boss.vx *= ratio;
    boss.vy *= ratio;
  }

  boss.x = clamp(boss.x + boss.vx * dt, boss.radius, WIDTH - boss.radius);
  boss.y = clamp(boss.y + boss.vy * dt, boss.radius, HEIGHT - boss.radius);

  if (distance(player.x, player.y, boss.x, boss.y) < player.radius + boss.radius * 0.88) {
    hurtPlayer(boss.touchDamage, boss.x, boss.y);
  }
}

function fireEnemyShot(enemy, angle) {
  fireEnemySpread(enemy, angle, 1, 0, enemy.projectileDamage, enemy.color, 240);
}

function fireEnemySpread(enemy, angle, count, spread, damage, color, speed) {
  for (let index = 0; index < count; index += 1) {
    const angleOffset = count === 1 ? 0 : spread * (index - (count - 1) / 2);
    const shotAngle = angle + angleOffset;
    state.enemyProjectiles.push({
      x: enemy.x + Math.cos(shotAngle) * (enemy.radius + 4),
      y: enemy.y + Math.sin(shotAngle) * (enemy.radius + 4),
      vx: Math.cos(shotAngle) * speed,
      vy: Math.sin(shotAngle) * speed,
      radius: enemy.boss ? 7 : 5,
      damage,
      life: enemy.boss ? 4.8 : 3.4,
      color
    });
  }
}

function fireRadialBurst(enemy, count, damage, color, speed) {
  for (let index = 0; index < count; index += 1) {
    const shotAngle = (Math.PI * 2 * index) / count;
    state.enemyProjectiles.push({
      x: enemy.x + Math.cos(shotAngle) * (enemy.radius + 4),
      y: enemy.y + Math.sin(shotAngle) * (enemy.radius + 4),
      vx: Math.cos(shotAngle) * speed,
      vy: Math.sin(shotAngle) * speed,
      radius: 6,
      damage,
      life: 5.2,
      color
    });
  }
}

function updateProjectiles(dt) {
  for (let index = state.projectiles.length - 1; index >= 0; index -= 1) {
    const projectile = state.projectiles[index];
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    projectile.life -= dt;

    if (
      projectile.life <= 0 ||
      projectile.x < -20 ||
      projectile.x > WIDTH + 20 ||
      projectile.y < -20 ||
      projectile.y > HEIGHT + 20
    ) {
      state.projectiles.splice(index, 1);
      continue;
    }

    let removeProjectile = false;
    for (const enemy of state.enemies) {
      if (enemy.dead) {
        continue;
      }
      const hitDistance = distance(projectile.x, projectile.y, enemy.x, enemy.y);
      if (hitDistance <= projectile.radius + enemy.radius * 0.86) {
        const angle = Math.atan2(projectile.vy, projectile.vx);
        dealDamageToEnemy(enemy, projectile.damage, angle, projectile.knockback, projectile.color);
        projectile.pierce -= 1;
        if (projectile.pierce <= 0) {
          removeProjectile = true;
          break;
        }
      }
    }

    if (removeProjectile) {
      state.projectiles.splice(index, 1);
    }
  }

  for (let index = state.enemyProjectiles.length - 1; index >= 0; index -= 1) {
    const projectile = state.enemyProjectiles[index];
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    projectile.life -= dt;

    if (
      projectile.life <= 0 ||
      projectile.x < -30 ||
      projectile.x > WIDTH + 30 ||
      projectile.y < -30 ||
      projectile.y > HEIGHT + 30
    ) {
      state.enemyProjectiles.splice(index, 1);
      continue;
    }

    const hitDistance = distance(projectile.x, projectile.y, player.x, player.y);
    if (hitDistance <= projectile.radius + player.radius * 0.9) {
      hurtPlayer(projectile.damage, projectile.x, projectile.y);
      state.enemyProjectiles.splice(index, 1);
    }
  }
}

function updatePickups(dt) {
  for (let index = state.pickups.length - 1; index >= 0; index -= 1) {
    const pickup = state.pickups[index];
    pickup.bob += dt * 2.4;
    pickup.spin += dt * 2.2;

    const pickupDistance = distance(player.x, player.y, pickup.x, pickup.y);
    if (pickupDistance > player.radius + pickup.radius) {
      continue;
    }

    if (pickup.kind === "objective-core") {
      state.score += 55;
      if (state.objective && state.objective.type === "collect" && !state.objective.completed) {
        state.objective.progress += 1;
        if (state.objective.progress >= state.objective.target) {
          completeObjective(false);
        }
      }
      addParticles(pickup.x, pickup.y, "#6af0ff", 10, 120);
      playTone(560, 0.08, "triangle", 0.03, 120);
    } else if (pickup.kind === "heal") {
      player.health = Math.min(player.maxHealth, player.health + pickup.amount);
      addParticles(pickup.x, pickup.y, "#85ffb9", 12, 130);
      pushMessage("Recovered health.", 1.4);
      playTone(500, 0.08, "sine", 0.03, 80);
    } else if (pickup.kind === "reward") {
      applyReward(pickup.reward);
    }

    state.pickups.splice(index, 1);
  }
}

function updateBeacons(dt) {
  if (!state.objective || state.objective.type !== "beacon" || state.objective.completed) {
    return;
  }

  let activeCount = 0;

  for (const beacon of state.beacons) {
    beacon.pulse += dt * 2;
    if (beacon.active) {
      activeCount += 1;
      continue;
    }

    const beaconDistance = distance(player.x, player.y, beacon.x, beacon.y);
    if (beaconDistance < 50) {
      beacon.progress = clamp(beacon.progress + dt * 0.62, 0, 1);
      if (Math.random() < 0.18) {
        addParticles(beacon.x, beacon.y, "#85ffb9", 1, 40);
      }
      if (beacon.progress >= 1) {
        beacon.active = true;
        activeCount += 1;
        addParticles(beacon.x, beacon.y, "#85ffb9", 16, 150);
        logEvent("A beacon was secured.");
      }
    } else {
      beacon.progress = Math.max(0, beacon.progress - dt * 0.05);
    }
  }

  state.objective.progress = activeCount;
  if (activeCount >= state.objective.target) {
    completeObjective(false);
  }
}

function updatePortal(dt) {
  if (!state.exitPortal) {
    return;
  }

  state.exitPortal.spin += dt * 2.2;
  if (!state.exitPortal.open) {
    return;
  }

  const portalDistance = distance(player.x, player.y, state.exitPortal.x, state.exitPortal.y);
  if (portalDistance <= player.radius + state.exitPortal.radius) {
    advanceFloor();
  }
}

function updateSpawns(dt) {
  if (!state.objective || state.objective.completed || state.objective.type === "boss") {
    return;
  }

  state.spawnTimer -= dt;
  if (state.spawnTimer > 0) {
    return;
  }

  let cap = 3 + Math.floor(state.floor / 2);
  if (state.objective.type === "beacon") {
    cap += 1;
  }
  if (state.objective.type === "elite") {
    cap = 4;
  }

  if (state.enemies.length < cap) {
    if (state.objective.type === "elite" && !state.enemies.some((enemy) => enemy.objectiveElite)) {
      spawnEnemy("elite", { objectiveElite: true });
    } else {
      spawnEnemy(pickEnemyKindForFloor(state.floor));
    }
  }

  state.spawnTimer = Math.max(0.45, 1.35 - state.floor * 0.03);
}

function updateParticles(dt) {
  for (const particle of state.particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 0.985;
    particle.vy *= 0.985;
    particle.life -= dt;
  }
  state.particles = state.particles.filter((particle) => particle.life > 0);

  for (const ring of state.rings) {
    ring.radius += dt * 140;
    ring.life -= dt;
  }
  state.rings = state.rings.filter((ring) => ring.life > 0);

  for (const beam of state.beams) {
    beam.life -= dt;
  }
  state.beams = state.beams.filter((beam) => beam.life > 0);
}

function updateGameplay(dt) {
  state.time += dt;

  if (!state.running) {
    updateParticles(dt);
    updateUi(false, dt);
    return;
  }

  state.floorTimer += dt;
  state.messageTimer = Math.max(0, state.messageTimer - dt);
  state.screenShake = Math.max(0, state.screenShake - dt * 18);

  updatePlayer(dt);
  updateSpawns(dt);
  updateBeacons(dt);

  for (const enemy of state.enemies) {
    updateEnemy(enemy, dt);
  }

  updateProjectiles(dt);
  updatePickups(dt);
  updatePortal(dt);
  updateParticles(dt);

  state.enemies = state.enemies.filter((enemy) => !enemy.dead);
  updateUi(false, dt);
}

function updateUi(force, dt = 0.016) {
  if (!force) {
    state.uiTimer -= dt;
    if (state.uiTimer > 0) {
      return;
    }
  }

  state.uiTimer = 0.08;

  floorValue.textContent = String(state.floor);
  healthValue.textContent = `${Math.ceil(player.health)} / ${player.maxHealth}`;
  armorValue.textContent = String(player.armor);
  weaponValue.textContent = getWeapon().name;
  scoreValue.textContent = String(Math.floor(state.score));
  bestFloorValue.textContent = String(state.bestFloor);
  dashValue.textContent = player.dashCooldown <= 0 ? "Ready" : `${player.dashCooldown.toFixed(1)}s`;
  novaValue.textContent = player.novaCooldown <= 0 ? "Ready" : `${player.novaCooldown.toFixed(1)}s`;
  beamValue.textContent = player.beamCooldown <= 0 ? "Ready" : `${player.beamCooldown.toFixed(1)}s`;

  dashButton.disabled = !state.running || player.dashCooldown > 0;
  novaButton.disabled = !state.running || player.novaCooldown > 0;
  beamButton.disabled = !state.running || player.beamCooldown > 0;
  soundButton.textContent = state.audioEnabled ? "Sound On" : "Sound Off";

  loadoutWeapon.textContent = getWeapon().name;
  loadoutArmor.textContent = getArmor().name;
  loadoutRelics.textContent = getRelicSummary();

  if (!state.objective) {
    objectiveTitle.textContent = "Preparing floor";
    objectiveText.textContent = "Stand by.";
    objectiveProgress.textContent = "0 / 0";
    objectiveBar.style.width = "0%";
  } else {
    objectiveTitle.textContent = state.objective.title;
    let ratio = 0;
    let progressText = `${state.objective.progress} / ${state.objective.target}`;
    let description = state.objective.description;

    if (state.objective.type === "boss") {
      const boss = state.enemies.find((enemy) => enemy.boss);
      if (boss) {
        ratio = 1 - boss.health / boss.maxHealth;
        progressText = `${Math.ceil(boss.health)} HP remaining`;
      } else {
        ratio = 1;
        progressText = "Boss defeated";
      }
    } else {
      ratio = state.objective.target > 0 ? state.objective.progress / state.objective.target : 0;
    }

    if (state.objective.completed) {
      description = state.pendingRewards > 0 ? "Claim your upgrade to unlock the exit portal." : "The exit portal is open. Step through to continue.";
      progressText = state.pendingRewards > 0 ? `${state.pendingRewards} reward pickup${state.pendingRewards === 1 ? "" : "s"} remaining` : "Portal open";
      ratio = 1;
    }

    objectiveText.textContent = description;
    objectiveProgress.textContent = progressText;
    objectiveBar.style.width = `${clamp(ratio, 0, 1) * 100}%`;
  }

  if (state.messageTimer > 0) {
    liveStatus.textContent = state.message;
  } else if (!state.objective) {
    liveStatus.textContent = "Preparing floor...";
  } else if (state.objective.completed) {
    liveStatus.textContent = state.pendingRewards > 0 ? "Collect your reward to unlock the portal." : "Portal open. Step inside to advance.";
  } else if (state.objective.type === "boss") {
    const boss = state.enemies.find((enemy) => enemy.boss);
    liveStatus.textContent = boss ? `${boss.name} is active.` : "Boss defeated.";
  } else {
    liveStatus.textContent = `${state.currentTheme.name} | ${state.objective.title}`;
  }
}

function drawBackground() {
  const theme = state.currentTheme;
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, theme.bgA);
  gradient.addColorStop(1, theme.bgB);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (const star of state.stars) {
    const twinkle = 0.45 + 0.55 * Math.sin(state.time * 1.7 + star.twinkle);
    const offsetY = (star.y + state.time * star.speed) % HEIGHT;
    ctx.fillStyle = `rgba(255,255,255,${0.16 + twinkle * 0.38})`;
    ctx.beginPath();
    ctx.arc(star.x, offsetY, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= WIDTH; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= HEIGHT; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  ctx.strokeStyle = theme.accentSoft;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(WIDTH * 0.5, HEIGHT * 0.5, 148 + Math.sin(state.time * 0.7) * 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(WIDTH * 0.5, HEIGHT * 0.5, 250 + Math.cos(state.time * 0.52) * 6, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBeacons() {
  for (const beacon of state.beacons) {
    const alpha = beacon.active ? 0.85 : 0.32 + 0.18 * Math.sin(beacon.pulse);
    ctx.save();
    ctx.translate(beacon.x, beacon.y);
    ctx.strokeStyle = beacon.active ? "rgba(133, 255, 185, 0.8)" : "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, beacon.radius + 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(133, 255, 185, ${alpha})`;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, beacon.radius + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * beacon.progress);
    ctx.stroke();

    ctx.fillStyle = beacon.active ? "rgba(133, 255, 185, 0.24)" : "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.arc(0, 0, beacon.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawPortal() {
  if (!state.exitPortal) {
    return;
  }

  const portal = state.exitPortal;
  ctx.save();
  ctx.translate(portal.x, portal.y);
  ctx.rotate(portal.spin);
  ctx.shadowBlur = portal.open ? 28 : 12;
  ctx.shadowColor = portal.open ? "rgba(106, 240, 255, 0.55)" : "rgba(255, 255, 255, 0.18)";
  ctx.strokeStyle = portal.open ? "rgba(106, 240, 255, 0.95)" : "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, portal.radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = portal.open ? "rgba(255, 216, 106, 0.9)" : "rgba(255, 255, 255, 0.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -portal.radius - 10);
  ctx.lineTo(0, portal.radius + 10);
  ctx.moveTo(-portal.radius - 10, 0);
  ctx.lineTo(portal.radius + 10, 0);
  ctx.stroke();
  ctx.restore();
}

function drawPickups() {
  for (const pickup of state.pickups) {
    ctx.save();
    ctx.translate(pickup.x, pickup.y + Math.sin(pickup.bob) * 4);
    ctx.rotate(pickup.spin);

    if (pickup.kind === "objective-core") {
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(106, 240, 255, 0.45)";
      ctx.fillStyle = "#6af0ff";
      ctx.beginPath();
      ctx.moveTo(0, -pickup.radius);
      ctx.lineTo(pickup.radius, 0);
      ctx.lineTo(0, pickup.radius);
      ctx.lineTo(-pickup.radius, 0);
      ctx.closePath();
      ctx.fill();
    } else if (pickup.kind === "heal") {
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(133, 255, 185, 0.45)";
      ctx.fillStyle = "#85ffb9";
      ctx.beginPath();
      ctx.arc(0, 0, pickup.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0b1820";
      ctx.fillRect(-3, -8, 6, 16);
      ctx.fillRect(-8, -3, 16, 6);
    } else if (pickup.kind === "reward") {
      const reward = pickup.reward;
      ctx.shadowBlur = 20;
      ctx.shadowColor = hexToRgba(reward.color, 0.5);
      ctx.fillStyle = reward.color;

      if (reward.slot === "weapon") {
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(8, -2);
        ctx.lineTo(4, 16);
        ctx.lineTo(-4, 16);
        ctx.lineTo(-8, -2);
        ctx.closePath();
        ctx.fill();
      } else if (reward.slot === "armor") {
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(14, -7);
        ctx.lineTo(10, 14);
        ctx.lineTo(0, 18);
        ctx.lineTo(-10, 14);
        ctx.lineTo(-14, -7);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(14, 8);
        ctx.lineTo(-14, 8);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.65)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  }
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.fillStyle = projectile.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = hexToRgba(projectile.color, 0.6);
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const projectile of state.enemyProjectiles) {
    ctx.fillStyle = projectile.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = hexToRgba(projectile.color, 0.55);
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowBlur = 0;
}

function drawEnemies() {
  for (const enemy of state.enemies) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.shadowBlur = enemy.boss ? 28 : enemy.elite ? 18 : 12;
    ctx.shadowColor = enemy.boss ? "rgba(255, 216, 106, 0.52)" : hexToRgba(enemy.color, 0.45);
    ctx.fillStyle = enemy.hitFlash > 0 ? "#ffffff" : enemy.color;

    if (enemy.boss) {
      ctx.beginPath();
      for (let point = 0; point < 14; point += 1) {
        const angle = (Math.PI * 2 * point) / 14;
        const radius = point % 2 === 0 ? enemy.radius : enemy.radius * 0.62;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (point === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#1b0f18";
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius * (enemy.boss ? 0.28 : 0.32), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const hpRatio = clamp(enemy.health / enemy.maxHealth, 0, 1);
    if (enemy.elite || enemy.boss) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
      ctx.fillRect(enemy.x - 26, enemy.y - enemy.radius - 16, 52, 6);
      ctx.fillStyle = enemy.boss ? "#ffd86a" : "#ffffff";
      ctx.fillRect(enemy.x - 26, enemy.y - enemy.radius - 16, 52 * hpRatio, 6);
    }
  }
}

function drawParticles() {
  for (const particle of state.particles) {
    const alpha = clamp(particle.life / particle.maxLife, 0, 1);
    ctx.fillStyle = hexToRgba(particle.color, alpha);
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const ring of state.rings) {
    const alpha = clamp(ring.life / ring.maxLife, 0, 1);
    ctx.strokeStyle = hexToRgba(ring.color, alpha);
    ctx.lineWidth = ring.width * alpha;
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const beam of state.beams) {
    const alpha = clamp(beam.life / beam.maxLife, 0, 1);
    ctx.strokeStyle = hexToRgba(beam.color, alpha);
    ctx.lineWidth = 16 * alpha;
    ctx.beginPath();
    ctx.moveTo(beam.x1, beam.y1);
    ctx.lineTo(beam.x2, beam.y2);
    ctx.stroke();
    ctx.lineWidth = 4 * alpha;
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.stroke();
  }
}

function drawPlayer() {
  for (let index = 0; index < player.trail.length; index += 1) {
    const segment = player.trail[index];
    const alpha = clamp(segment.life / 0.28, 0, 1) * (1 - index / player.trail.length);
    ctx.fillStyle = `rgba(106, 240, 255, ${alpha * 0.28})`;
    ctx.beginPath();
    ctx.arc(segment.x, segment.y, player.radius * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle + Math.PI / 2);
  ctx.shadowBlur = 22;
  ctx.shadowColor = player.invulnerable > 0 ? "rgba(255, 216, 106, 0.55)" : "rgba(106, 240, 255, 0.52)";
  ctx.fillStyle = player.invulnerable > 0 ? "#ffd86a" : "#6af0ff";
  ctx.beginPath();
  ctx.moveTo(0, -player.radius * 1.35);
  ctx.lineTo(player.radius * 0.8, player.radius * 0.95);
  ctx.lineTo(0, player.radius * 0.38);
  ctx.lineTo(-player.radius * 0.8, player.radius * 0.95);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#09131d";
  ctx.beginPath();
  ctx.arc(0, 0, player.radius * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (state.pointerActive) {
    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(state.pointerX, state.pointerY, 14, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawBossBar() {
  const boss = state.enemies.find((enemy) => enemy.boss);
  if (!boss) {
    return;
  }

  const width = 320;
  const x = (WIDTH - width) / 2;
  const y = 20;
  const ratio = clamp(boss.health / boss.maxHealth, 0, 1);

  ctx.fillStyle = "rgba(0, 0, 0, 0.44)";
  ctx.fillRect(x, y, width, 16);
  ctx.fillStyle = "#ffd86a";
  ctx.fillRect(x, y, width * ratio, 16);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.strokeRect(x, y, width, 16);

  ctx.fillStyle = "#edf6ff";
  ctx.font = '700 16px "Trebuchet MS"';
  ctx.textAlign = "center";
  ctx.fillText(boss.name, WIDTH / 2, y - 6);
  ctx.textAlign = "start";
}

function drawFloorBadge() {
  ctx.fillStyle = "rgba(4, 15, 27, 0.62)";
  ctx.fillRect(18, HEIGHT - 48, 180, 28);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.strokeRect(18, HEIGHT - 48, 180, 28);
  ctx.fillStyle = "#edf6ff";
  ctx.font = '700 15px "Trebuchet MS"';
  ctx.fillText(`Floor ${state.floor} | ${state.currentTheme.name}`, 30, HEIGHT - 29);
}

function render() {
  ctx.save();
  if (state.screenShake > 0) {
    ctx.translate(randomRange(-state.screenShake, state.screenShake), randomRange(-state.screenShake, state.screenShake));
  }

  drawBackground();
  drawBeacons();
  drawPortal();
  drawPickups();
  drawProjectiles();
  drawEnemies();
  drawParticles();
  drawPlayer();
  drawBossBar();
  drawFloorBadge();

  if (player.invulnerable > 0 && !state.gameOver) {
    ctx.fillStyle = `rgba(255, 216, 106, ${Math.min(0.18, player.invulnerable * 0.18)})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  ctx.restore();
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastFrame) / 1000);
  lastFrame = now;
  updateGameplay(dt);
  render();
  requestAnimationFrame(loop);
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * WIDTH,
    y: ((event.clientY - rect.top) / rect.height) * HEIGHT
  };
}

function handlePointer(event) {
  const point = getCanvasPoint(event);
  state.pointerX = point.x;
  state.pointerY = point.y;
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (MOVE_KEYS.has(key)) {
    state.keys.add(key);
    event.preventDefault();
  }

  if ((key === "shift" || key === " " || key === "q" || key === "e") && event.repeat) {
    event.preventDefault();
    return;
  }

  if (key === "shift") {
    event.preventDefault();
    if (!state.running) {
      startAdventure();
    } else {
      triggerDash();
    }
  }

  if (key === " " || key === "q") {
    event.preventDefault();
    if (!state.running) {
      startAdventure();
    } else {
      triggerNova();
    }
  }

  if (key === "e") {
    event.preventDefault();
    if (!state.running) {
      startAdventure();
    } else {
      triggerBeam();
    }
  }

  if (key === "enter" && !state.running) {
    event.preventDefault();
    startAdventure();
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (MOVE_KEYS.has(key)) {
    state.keys.delete(key);
  }
});

canvas.addEventListener("pointerdown", (event) => {
  handlePointer(event);
  state.pointerActive = true;
  initAudio();
  if (!state.running) {
    startAdventure();
  }
});

canvas.addEventListener("pointermove", (event) => {
  if (state.pointerActive) {
    handlePointer(event);
  }
});

window.addEventListener("pointerup", () => {
  state.pointerActive = false;
});

window.addEventListener("pointercancel", () => {
  state.pointerActive = false;
});

startButton.addEventListener("click", () => {
  startAdventure();
});

restartButton.addEventListener("click", () => {
  resetRun();
  startAdventure();
});

dashButton.addEventListener("click", () => {
  triggerDash();
});

novaButton.addEventListener("click", () => {
  triggerNova();
});

beamButton.addEventListener("click", () => {
  triggerBeam();
});

soundButton.addEventListener("click", () => {
  state.audioEnabled = !state.audioEnabled;
  if (state.audioEnabled) {
    initAudio();
  }
  updateUi(true);
});

resetRun();
requestAnimationFrame(loop);
