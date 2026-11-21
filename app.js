const SIM_WEIGHT = 0.6;
const DEFAULT_LANG = "pt-BR";
const STORAGE_LANG_KEY = "kingrop_lang";

// Tracks sourced from Spotify playlist "OLD TEXAS COWBOY SONGS" (3lwlAD79CzQpdY5ZoC8Xvj), plus Texas Country staples.
const COWBOY_COUNT = 20;
const PLAYLIST = [
  { id: "K16ZNrWRzo0", label: "Ernest Tubb – Waltz Across Texas" },
  { id: "JQc5gDXQGIs", label: "Roy Rogers – Tumbling Tumbleweeds" },
  { id: "5zhDJZipPV0", label: "Bob Wills & His Texas Playboys – New San Antonio Rose" },
  { id: "-JX50rZae2M", label: "Eddy Arnold – Cattle Call" },
  { id: "E5F-O_19lSI", label: "Gene Autry – Back In the Saddle Again" },
  { id: "zWm5WErkffQ", label: "Marty Robbins – El Paso" },
  { id: "4WXYjm74WFI", label: "Hank Williams – I'm So Lonesome I Could Cry" },
  { id: "qEIBmGZxAhg", label: "Jimmie Rodgers – Blue Yodel (T for Texas)" },
  { id: "VJeBtHjqJz0", label: "Frankie Laine – Rawhide" },
  { id: "kE7Ks8ai82o", label: "Asleep At The Wheel – Way Down Texas Way" },
  { id: "sYQoBDI0DNE", label: "Ernest Tubb – Half My Heart's In Texas" },
  { id: "-NuX79Ud8zI", label: "Marty Robbins – Big Iron" },
  { id: "l_9pVRZ0QKw", label: "Tex Ritter – Jingle, Jangle, Jingle" },
  { id: "vNefwlE1oCg", label: "Moe Bandy – Deep In The Heart Of Texas" },
  { id: "A-0KHkf5V98", label: "Ernest Tubb – Walkin' The Floor Over You" },
  { id: "8Z_SOobHOw4", label: "Gene Autry – Don't Fence Me In" },
  { id: "tTuHC8XM0P0", label: "Willie Nelson – Texas In My Soul" },
  { id: "fvcBktt6V7k", label: "Ray Price – Home In San Antone" },
  { id: "ANeSmrTf26U", label: "Sons of the Pioneers – Riders In The Sky" },
  { id: "uzzAbOrCce4", label: "Gene Autry – Lone Star Moon" },
  { id: "wtVeDaZxAXo", label: "George Strait – Amarillo By Morning" },
  { id: "QuJroujjYDk", label: "George Strait – All My Ex's Live in Texas" },
  { id: "xvZeYDBY4fw", label: "Waylon Jennings – Luckenbach, Texas" },
  { id: "dBN86y30Ufc", label: "Willie Nelson – On The Road Again" },
  { id: "v2LixP7n_hM", label: "Cody Johnson – 'Til You Can't" },
  { id: "LGZ4c0TCnOw", label: "Alan Jackson – Chattahoochee" },
  { id: "d05tQrhNMkA", label: "Brooks & Dunn – Boot Scootin' Boogie" },
];

const I18N = {
  "pt-BR": {
    pageTitle: "KING ROP já fez o tereré dele hoje?",
    heading: "KING ROP já fez o tereré dele hoje? 🧉🤠",
    idleCopy:
      "Será que a guampa já está trincando de gelo 🥶 ou hoje deu seca na fronteira 🌵? Aperte para tirar a prova e ligar o som do saloon.",
    idleCaption: "KING ROP, o último gângster do mundo e do universo. ☝🏻👊🏻👏🏻",
    idleAlt: "Retrato de KING ROP sentado em uma poltrona de couro na biblioteca",
    simAlt: "KING ROP de chapéu texano segurando uma guampa de tereré gelada",
    naoAlt: "KING ROP cabisbaixo com a cuia de tereré vazia emborcada na mesa",
    drawIdle: "Tirar a prova de hoje 🎲",
    drawAgain: "Sortear de novo 🎲",
    tally: (sim, nao) => `🧉 Placar desta sessão: ${sim} sim e ${nao} não.`,
    jukeboxAria: "Vitrola texana",
    trackSelectLabel: "Escolher música texana",
    playMusic: "Tocar música",
    pauseMusic: "Pausar música",
    nextTrack: "Próxima moda",
    showVideo: "Mostrar clipe",
    hideVideo: "Ocultar clipe",
    socialsAria: "Redes sociais do KING ROP",
    socialsLabel: "Redes do KING ROP:",
    madeBy: "Feito com ❤️ por",
    musicStatus: {
      ready: "🤠 Vitrola do Texas pronta",
      warming: "Aquecendo a vitrola...",
      loading: "Carregando vitrola...",
      playing: "🤠 Tocando no saloon",
      paused: "⏸️ Vitrola pausada",
      unavailable: "Playlist indisponível nesta rede",
    },
    shuffle: [
      "Sacudindo a garrafa térmica... 🧊",
      "Ouvindo se a bomba roncou... 🧉",
      "Conferindo o estoque de gelo... 🥶",
      "Consultando os ventos do Texas... 🤠🌵",
    ],
    sim: [
      {
        stamp: "Sim, o tereré já está trincando! 🥶🧊",
        copy: "Erva batida, bomba alinhada e guampa suando frio na biblioteca 🧉❄️. Pode encostar com a cadeira que o homem já cumpriu o ritual.",
        caption: "Chapéu na cabeça e guampa gelada na mão: o último gângster jamais falha. 🤠🧉",
      },
      {
        stamp: "Sim, já rolou tereré hoje! 🧉🤠",
        copy: "A água gelada desceu antes mesmo do sol esquentar no Texas 🧊☀️. Mais um dia normal na rotina da fronteira.",
        caption: "KING ROP devidamente hidratado no comando do saloon. 🤠❄️",
      },
      {
        stamp: "Com certeza já fez! 🥶🌿",
        copy: "Térmica cheia, hortelã no ponto e moral intacta 🧊🧉. Duvidar do tereré do homem a essa altura do dia é perder aposta.",
        caption: "Tradição mantida pelo último gângster do mundo e do universo. ☝🏻👊🏻",
      },
    ],
    nao: [
      {
        stamp: "Ainda não saiu o tereré hoje... 🏜️😔",
        copy: "Guampa emborcada na mesa, bomba seca e silêncio pesado no escritório 🥀. Nem o saloon acreditou nessa cena.",
        caption: "Olhar distante de quem ainda não ouviu a térmica abrir hoje. 💀🏜️",
      },
      {
        stamp: "Não fez, seca braba no Texas! 🌵🥵",
        copy: "Nem sinal de gelo ou erva fresca até agora 🏜️. Alguém precisa levar um saco de gelo urgente para salvar a tarde do homem 🧊🆘.",
        caption: "A cuia segue vazia na madeira escura da biblioteca. 🥀",
      },
      {
        stamp: "Hoje ainda não teve tereré... 😢🌵",
        copy: "Contra todas as expectativas da fronteira, a garrafa térmica segue fechada 🔒🥵. Vale girar de novo para ver se o destino muda.",
        caption: "Um raro momento de sede na história do último gângster. 🏜️",
      },
    ],
  },
  en: {
    pageTitle: "Has KING ROP made his tereré today?",
    heading: "Has KING ROP made his tereré today? 🧉🤠",
    idleCopy:
      "Is that horn cup already freezing cold 🥶 or did a West Texas drought hit the study today 🌵? Hit the button to find out and fire up the saloon jukebox.",
    idleCaption: "KING ROP, the last gangster in the world and the universe. ☝🏻👊🏻👏🏻",
    idleAlt: "Portrait of KING ROP sitting in a leather library armchair",
    simAlt: "KING ROP wearing a Stetson cowboy hat and holding a frosty cup of tereré",
    naoAlt: "KING ROP looking downcast with an empty tereré cup upside down on the desk",
    drawIdle: "Check today's tereré 🎲",
    drawAgain: "Draw again 🎲",
    tally: (sim, nao) => `🧉 Session tally: ${sim} yes and ${nao} no.`,
    jukeboxAria: "Texas jukebox",
    trackSelectLabel: "Pick a Texas country song",
    playMusic: "Play music",
    pauseMusic: "Pause music",
    nextTrack: "Next track",
    showVideo: "Show video",
    hideVideo: "Hide video",
    socialsAria: "KING ROP social links",
    socialsLabel: "KING ROP's socials:",
    madeBy: "Made with ❤️ by",
    musicStatus: {
      ready: "🤠 Texas jukebox ready",
      warming: "Warming up the jukebox...",
      loading: "Loading jukebox...",
      playing: "🤠 Playing in the saloon",
      paused: "⏸️ Jukebox paused",
      unavailable: "Playlist unavailable on this network",
    },
    shuffle: [
      "Shaking the ice thermos... 🧊",
      "Listening for the silver straw... 🧉",
      "Checking the ice supply... 🥶",
      "Reading the West Texas wind... 🤠🌵",
    ],
    sim: [
      {
        stamp: "Yes, the tereré is ice-cold! 🥶🧊",
        copy: "Fresh yerba packed, metal straw set, and the cup sweating cold in the library 🧉❄️. Pull up a chair—the boss has honored the ritual.",
        caption: "Stetson on and frosty cup in hand: the last gangster never misses. 🤠🧉",
      },
      {
        stamp: "Yep, today's tereré is served! 🧉🤠",
        copy: "Ice water hit the yerba before the Texas sun even warmed the porch 🧊☀️. Just another day of frontier discipline.",
        caption: "KING ROP properly hydrated and running the saloon. 🤠❄️",
      },
      {
        stamp: "Without a doubt, he made it! 🥶🌿",
        copy: "Thermos full, mint crisp, and composure intact 🧊🧉. Betting against this man's tereré is easy money lost.",
        caption: "Tradition upheld by the last gangster in the world and the universe. ☝🏻👊🏻",
      },
    ],
    nao: [
      {
        stamp: "No tereré yet today... 🏜️😔",
        copy: "Cup turned upside down on the desk, dry straw, and heavy silence in the study 🥀. Even the saloon went quiet.",
        caption: "The thousand-yard stare of a man whose thermos hasn't opened yet. 💀🏜️",
      },
      {
        stamp: "Not yet—rough drought in Texas! 🌵🥵",
        copy: "No sign of ice or fresh yerba so far 🏜️. Somebody rush a bag of ice over to save the man's afternoon 🧊🆘.",
        caption: "The cup sits dry on the dark mahogany desk. 🥀",
      },
      {
        stamp: "Still no tereré today... 😢🌵",
        copy: "Against every frontier expectation, the thermos remains sealed shut 🔒🥵. Spin again and see if fate turns around.",
        caption: "A rare moment of thirst in the history of the last gangster. 🏜️",
      },
    ],
  },
  es: {
    pageTitle: "¿KING ROP ya preparó su tereré hoy?",
    heading: "¿KING ROP ya preparó su tereré hoy? 🧉🤠",
    idleCopy:
      "¿La guampa ya está escarchada de frío 🥶 o pegó la sequía en la frontera 🌵? Toca el botón para salir de dudas y encender la rockola del saloon.",
    idleCaption: "KING ROP, el último gánster del mundo y del universo. ☝🏻👊🏻👏🏻",
    idleAlt: "Retrato de KING ROP sentado en un sillón de cuero en la biblioteca",
    simAlt: "KING ROP con sombrero tejano sosteniendo una guampa de tereré bien fría",
    naoAlt: "KING ROP cabizbajo con la guampa de tereré vacía boca abajo sobre el escritorio",
    drawIdle: "Probar la suerte de hoy 🎲",
    drawAgain: "Sortear de nuevo 🎲",
    tally: (sim, nao) => `🧉 Marcador de esta sesión: ${sim} sí y ${nao} no.`,
    jukeboxAria: "Rockola tejana",
    trackSelectLabel: "Elegir canción tejana",
    playMusic: "Poner música",
    pauseMusic: "Pausar música",
    nextTrack: "Siguiente tema",
    showVideo: "Mostrar video",
    hideVideo: "Ocultar video",
    socialsAria: "Redes sociales de KING ROP",
    socialsLabel: "Redes de KING ROP:",
    madeBy: "Hecho con ❤️ por",
    musicStatus: {
      ready: "🤠 Rockola de Texas lista",
      warming: "Calentando la rockola...",
      loading: "Cargando rockola...",
      playing: "🤠 Sonando en el saloon",
      paused: "⏸️ Rockola en pausa",
      unavailable: "Playlist no disponible en esta red",
    },
    shuffle: [
      "Sacudiendo el termo con hielo... 🧊",
      "Escuchando si roncó la bombilla... 🧉",
      "Revisando la reserva de hielo... 🥶",
      "Consultando los vientos de Texas... 🤠🌵",
    ],
    sim: [
      {
        stamp: "¡Sí, el tereré ya está helado! 🥶🧊",
        copy: "Yerba lista, bombilla firme y la guampa sudando frío en la biblioteca 🧉❄️. Acerca una silla, que el hombre ya cumplió el ritual.",
        caption: "Sombrero puesto y guampa helada en mano: el último gánster nunca falla. 🤠🧉",
      },
      {
        stamp: "¡Sí, hoy ya salió tereré! 🧉🤠",
        copy: "El agua helada bajó antes de que calentara el sol en Texas 🧊☀️. Otro día normal en la rutina de la frontera.",
        caption: "KING ROP bien hidratado al mando del saloon. 🤠❄️",
      },
      {
        stamp: "¡Seguro que ya lo armó! 🥶🌿",
        copy: "Termo lleno, menta en su punto y presencia intacta 🧊🧉. Dudar del tereré del hombre a esta hora es perder la apuesta.",
        caption: "Tradición intacta del último gánster del mundo y del universo. ☝🏻👊🏻",
      },
    ],
    nao: [
      {
        stamp: "Todavía no salió el tereré hoy... 🏜️😔",
        copy: "Guampa boca abajo en la mesa, bombilla seca y silencio pesado en el estudio 🥀. Ni en el saloon lo podían creer.",
        caption: "La mirada perdida de quien aún no escuchó abrir el termo hoy. 💀🏜️",
      },
      {
        stamp: "¡No hizo, sequía brava en Texas! 🌵🥵",
        copy: "Ni rastro de hielo o yerba fresca hasta ahora 🏜️. Que alguien lleve una bolsa de hielo urgente para salvarle la tarde 🧊🆘.",
        caption: "La guampa sigue vacía sobre la madera oscura de la biblioteca. 🥀",
      },
      {
        stamp: "Hoy todavía no hubo tereré... 😢🌵",
        copy: "Contra todo pronóstico de la frontera, el termo sigue cerrado 🔒🥵. Tira otra vez a ver si cambia el destino.",
        caption: "Un raro momento de sed en la historia del último gánster. 🏜️",
      },
    ],
  },
};

const shell = document.querySelector(".page-shell");
const mainHeading = document.getElementById("mainHeading");
const portraitImg = document.getElementById("portraitImg");
const portraitCaption = document.getElementById("portraitCaption");
const shuffleWord = document.getElementById("shuffleWord");
const verdictStamp = document.getElementById("verdictStamp");
const verdictCopy = document.getElementById("verdictCopy");
const drawButton = document.getElementById("drawButton");
const sessionTally = document.getElementById("sessionTally");

const jukeboxSection = document.getElementById("jukeboxSection");
const trackSelectLabel = document.getElementById("trackSelectLabel");
const trackSelect = document.getElementById("trackSelect");
const trackStatus = document.getElementById("trackStatus");
const vinylDot = document.getElementById("vinylDot");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextTrackBtn = document.getElementById("nextTrackBtn");
const toggleVideoBtn = document.getElementById("toggleVideoBtn");
const playerDrawer = document.getElementById("playerDrawer");

const socialsNav = document.getElementById("socialsNav");
const socialsLabel = document.getElementById("socialsLabel");
const authorCreditPrefix = document.getElementById("authorCreditPrefix");
const langButtons = document.querySelectorAll(".lang-btn");

let currentLang = resolveInitialLang();
let ytPlayer = null;
let playerReady = false;
let pendingAutoplay = false;
let isPlaying = false;
let musicStateKey = "ready";
let currentTrackIndex = Math.floor(Math.random() * COWBOY_COUNT);
let failedTracks = new Set();

let counts = { sim: 0, nao: 0 };
let lastOutcome = null;
let lastVerdictIndex = { sim: -1, nao: -1 };
let activeShuffleIndex = 0;
let isDrawing = false;

// Preload both outcome portraits so the reveal never flashes a half-loaded image.
for (const src of ["./assets/renan-sim.jpg", "./assets/renan-nao.jpg"]) {
  const img = new Image();
  img.src = src;
}

function resolveInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang && I18N[queryLang]) {
    return queryLang;
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_LANG_KEY);
    if (saved && I18N[saved]) {
      return saved;
    }
  } catch (_) {
    // Ignore storage access errors in restricted webviews.
  }
  return DEFAULT_LANG;
}

function t() {
  return I18N[currentLang] || I18N[DEFAULT_LANG];
}

function randomUnit() {
  if (window.crypto && window.crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  }
  return Math.random();
}

function pickVerdictIndex(type) {
  const pool = t()[type];
  const prev = lastVerdictIndex[type];
  const indices = pool.map((_, idx) => idx).filter((idx) => idx !== prev);
  const chosen = indices[Math.floor(randomUnit() * indices.length)] ?? 0;
  lastVerdictIndex[type] = chosen;
  return chosen;
}

function populatePlaylistSelect() {
  PLAYLIST.forEach((track, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = track.label;
    if (idx === currentTrackIndex) {
      opt.selected = true;
    }
    trackSelect.appendChild(opt);
  });
}

function renderMusicStatus() {
  const dict = t();
  vinylDot.classList.toggle("is-playing", isPlaying);
  playPauseBtn.textContent = isPlaying ? dict.pauseMusic : dict.playMusic;
  trackStatus.textContent = dict.musicStatus[musicStateKey] || dict.musicStatus.ready;
}

function updateMusicUI(playing, stateKey) {
  isPlaying = playing;
  if (stateKey) {
    musicStateKey = stateKey;
  }
  renderMusicStatus();
}

function renderOutcomeOrIdle() {
  const dict = t();
  if (!lastOutcome) {
    portraitImg.alt = dict.idleAlt;
    portraitCaption.textContent = dict.idleCaption;
    verdictStamp.hidden = true;
    verdictCopy.textContent = dict.idleCopy;
    drawButton.textContent = dict.drawIdle;
    sessionTally.hidden = true;
    return;
  }

  const verdict = dict[lastOutcome.type][lastOutcome.index];
  portraitImg.alt = lastOutcome.type === "sim" ? dict.simAlt : dict.naoAlt;
  portraitCaption.textContent = verdict.caption;
  verdictStamp.textContent = verdict.stamp;
  verdictStamp.hidden = false;
  verdictCopy.textContent = verdict.copy;
  drawButton.textContent = dict.drawAgain;
  sessionTally.hidden = false;
  sessionTally.textContent = dict.tally(counts.sim, counts.nao);
}

function applyLanguage(lang, persist = true) {
  if (!I18N[lang]) {
    return;
  }
  currentLang = lang;
  const dict = t();

  document.documentElement.lang = lang;
  document.title = dict.pageTitle;
  mainHeading.textContent = dict.heading;
  shuffleWord.textContent = dict.shuffle[activeShuffleIndex % dict.shuffle.length];

  jukeboxSection.setAttribute("aria-label", dict.jukeboxAria);
  trackSelectLabel.textContent = dict.trackSelectLabel;
  nextTrackBtn.textContent = dict.nextTrack;
  const drawerOpen = playerDrawer.classList.contains("is-open");
  toggleVideoBtn.textContent = drawerOpen ? dict.hideVideo : dict.showVideo;

  socialsNav.setAttribute("aria-label", dict.socialsAria);
  socialsLabel.textContent = dict.socialsLabel;
  authorCreditPrefix.textContent = dict.madeBy;

  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  renderMusicStatus();
  renderOutcomeOrIdle();

  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch (_) {
      // Ignore storage write errors.
    }
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url);
  }
}

// Start playback synchronously inside the click handler so mobile Safari keeps the user gesture token.
function startMusicFromGesture() {
  if (!playerReady || !ytPlayer) {
    pendingAutoplay = true;
    musicStateKey = "warming";
    renderMusicStatus();
    return;
  }
  if (!isPlaying) {
    ytPlayer.unMute();
    ytPlayer.setVolume(85);
    ytPlayer.playVideo();
  }
}

function loadTrack(index, shouldPlay) {
  currentTrackIndex = ((index % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
  trackSelect.value = String(currentTrackIndex);
  const track = PLAYLIST[currentTrackIndex];

  if (!playerReady || !ytPlayer) {
    pendingAutoplay = shouldPlay;
    return;
  }

  if (shouldPlay) {
    ytPlayer.loadVideoById(track.id);
    ytPlayer.unMute();
    ytPlayer.setVolume(85);
  } else {
    ytPlayer.cueVideoById(track.id);
  }
}

function skipBrokenTrack() {
  failedTracks.add(currentTrackIndex);
  if (failedTracks.size >= PLAYLIST.length) {
    updateMusicUI(false, "unavailable");
    return;
  }
  loadTrack(currentTrackIndex + 1, true);
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  ytPlayer = new window.YT.Player("ytPlayer", {
    width: "280",
    height: "158",
    videoId: PLAYLIST[currentTrackIndex].id,
    playerVars: {
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin.startsWith("http") ? window.location.origin : undefined,
    },
    events: {
      onReady: () => {
        playerReady = true;
        if (pendingAutoplay) {
          pendingAutoplay = false;
          ytPlayer.unMute();
          ytPlayer.setVolume(85);
          ytPlayer.playVideo();
        }
      },
      onStateChange: (event) => {
        const YTState = window.YT.PlayerState;
        if (event.data === YTState.PLAYING) {
          failedTracks.clear();
          updateMusicUI(true, "playing");
        } else if (event.data === YTState.PAUSED) {
          updateMusicUI(false, "paused");
        } else if (event.data === YTState.ENDED) {
          loadTrack(currentTrackIndex + 1, true);
        }
      },
      onError: () => {
        skipBrokenTrack();
      },
    },
  });
};

function injectYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  document.head.appendChild(tag);
}

function runDraw() {
  if (isDrawing) {
    return;
  }

  startMusicFromGesture();
  isDrawing = true;
  drawButton.disabled = true;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const suspenseMs = prefersReducedMotion ? 60 : 620;

  shell.dataset.state = "drawing";
  const shufflePool = t().shuffle;
  activeShuffleIndex = Math.floor(randomUnit() * shufflePool.length);
  shuffleWord.textContent = shufflePool[activeShuffleIndex];

  window.setTimeout(() => {
    const fezTerere = randomUnit() < SIM_WEIGHT;

    if (fezTerere) {
      counts.sim += 1;
      const idx = pickVerdictIndex("sim");
      lastOutcome = { type: "sim", index: idx };
      shell.dataset.state = "sim";
      portraitImg.src = "./assets/renan-sim.jpg";
    } else {
      counts.nao += 1;
      const idx = pickVerdictIndex("nao");
      lastOutcome = { type: "nao", index: idx };
      shell.dataset.state = "nao";
      portraitImg.src = "./assets/renan-nao.jpg";
    }

    renderOutcomeOrIdle();
    drawButton.disabled = false;
    isDrawing = false;
  }, suspenseMs);
}

drawButton.addEventListener("click", runDraw);

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang, true);
  });
});

playPauseBtn.addEventListener("click", () => {
  if (!playerReady || !ytPlayer) {
    pendingAutoplay = true;
    musicStateKey = "loading";
    renderMusicStatus();
    return;
  }
  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.unMute();
    ytPlayer.setVolume(85);
    ytPlayer.playVideo();
  }
});

nextTrackBtn.addEventListener("click", () => {
  loadTrack(currentTrackIndex + 1, true);
});

trackSelect.addEventListener("change", (event) => {
  const idx = Number(event.target.value);
  loadTrack(idx, true);
});

toggleVideoBtn.addEventListener("click", () => {
  const open = playerDrawer.classList.toggle("is-open");
  toggleVideoBtn.setAttribute("aria-expanded", String(open));
  toggleVideoBtn.textContent = open ? t().hideVideo : t().showVideo;
});

populatePlaylistSelect();
applyLanguage(currentLang, false);
injectYouTubeAPI();
