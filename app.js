const SIM_WEIGHT = 0.6;

const PLAYLIST = [
  { id: "wtVeDaZxAXo", label: "George Strait – Amarillo By Morning" },
  { id: "QuJroujjYDk", label: "George Strait – All My Ex's Live in Texas" },
  { id: "xvZeYDBY4fw", label: "Waylon Jennings – Luckenbach, Texas" },
  { id: "dBN86y30Ufc", label: "Willie Nelson – On The Road Again" },
  { id: "v2LixP7n_hM", label: "Cody Johnson – 'Til You Can't" },
  { id: "LGZ4c0TCnOw", label: "Alan Jackson – Chattahoochee" },
  { id: "d05tQrhNMkA", label: "Brooks & Dunn – Boot Scootin' Boogie" },
];

const SIM_VERDICTS = [
  {
    stamp: "Sim, o tereré já está trincando.",
    copy: "Erva batida, bomba alinhada e guampa suando frio na biblioteca. Pode encostar com a cadeira que o homem já cumpriu o ritual.",
    caption: "Chapéu na cabeça e guampa gelada na mão: o último gângster jamais falha.",
  },
  {
    stamp: "Sim, já rolou tereré hoje.",
    copy: "A água gelada desceu antes mesmo do sol esquentar no Texas. Mais um dia normal na rotina da fronteira.",
    caption: "KING ROP devidamente hidratado no comando do saloon.",
  },
  {
    stamp: "Com certeza já fez.",
    copy: "Térmica cheia, hortelã no ponto e moral intacta. Duvidar do tereré do homem a essa altura do dia é perder aposta.",
    caption: "Tradição mantida pelo último gângster do mundo e do universo.",
  },
];

const NAO_VERDICTS = [
  {
    stamp: "Ainda não saiu o tereré hoje.",
    copy: "Guampa emborcada na mesa, bomba seca e silêncio pesado no escritório. Nem o saloon acreditou nessa cena.",
    caption: "Olhar distante de quem ainda não ouviu a térmica abrir hoje.",
  },
  {
    stamp: "Não fez, seca braba no Texas.",
    copy: "Nem sinal de gelo ou erva fresca até agora. Alguém precisa levar um saco de gelo urgente para salvar a tarde do homem.",
    caption: "A cuia segue vazia na madeira escura da biblioteca.",
  },
  {
    stamp: "Hoje ainda não teve tereré.",
    copy: "Contra todas as expectativas da fronteira, a garrafa térmica segue fechada. Vale girar de novo para ver se o destino muda.",
    caption: "Um raro momento de sede na história do último gângster.",
  },
];

const SHUFFLE_LINES = [
  "Sacudindo a garrafa térmica...",
  "Ouvindo se a bomba roncou...",
  "Conferindo o estoque de gelo...",
  "Consultando os ventos do Texas...",
];

const shell = document.querySelector(".page-shell");
const portraitImg = document.getElementById("portraitImg");
const portraitCaption = document.getElementById("portraitCaption");
const shuffleWord = document.getElementById("shuffleWord");
const verdictStamp = document.getElementById("verdictStamp");
const verdictCopy = document.getElementById("verdictCopy");
const drawButton = document.getElementById("drawButton");
const sessionTally = document.getElementById("sessionTally");

const trackSelect = document.getElementById("trackSelect");
const trackStatus = document.getElementById("trackStatus");
const vinylDot = document.getElementById("vinylDot");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextTrackBtn = document.getElementById("nextTrackBtn");
const toggleVideoBtn = document.getElementById("toggleVideoBtn");
const playerDrawer = document.getElementById("playerDrawer");

let ytPlayer = null;
let playerReady = false;
let pendingAutoplay = false;
let isPlaying = false;
let currentTrackIndex = Math.floor(Math.random() * PLAYLIST.length);
let failedTracks = new Set();

let counts = { sim: 0, nao: 0 };
let lastVerdictText = "";
let isDrawing = false;

// Preload both outcome portraits so the reveal never flashes a half-loaded image.
for (const src of ["./assets/renan-sim.jpg", "./assets/renan-nao.jpg"]) {
  const img = new Image();
  img.src = src;
}

function randomUnit() {
  if (window.crypto && window.crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  }
  return Math.random();
}

function pickVerdict(pool) {
  const candidates = pool.filter((item) => item.stamp !== lastVerdictText);
  const chosen = candidates[Math.floor(randomUnit() * candidates.length)] || pool[0];
  lastVerdictText = chosen.stamp;
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

function updateMusicUI(playing, statusText) {
  isPlaying = playing;
  vinylDot.classList.toggle("is-playing", playing);
  playPauseBtn.textContent = playing ? "Pausar música" : "Tocar música";
  if (statusText) {
    trackStatus.textContent = statusText;
  }
}

// Start playback synchronously inside the click handler so mobile Safari keeps the user gesture token.
function startMusicFromGesture() {
  if (!playerReady || !ytPlayer) {
    pendingAutoplay = true;
    trackStatus.textContent = "Aquecendo a vitrola...";
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
    updateMusicUI(false, "Playlist indisponível nesta rede");
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
          updateMusicUI(true, "Tocando no saloon");
        } else if (event.data === YTState.PAUSED) {
          updateMusicUI(false, "Vitrola pausada");
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
  shuffleWord.textContent = SHUFFLE_LINES[Math.floor(randomUnit() * SHUFFLE_LINES.length)];

  window.setTimeout(() => {
    const fezTerere = randomUnit() < SIM_WEIGHT;

    if (fezTerere) {
      counts.sim += 1;
      const verdict = pickVerdict(SIM_VERDICTS);
      shell.dataset.state = "sim";
      portraitImg.src = "./assets/renan-sim.jpg";
      portraitImg.alt = "KING ROP de chapéu texano segurando uma guampa de tereré gelada";
      portraitCaption.textContent = verdict.caption;
      verdictStamp.textContent = verdict.stamp;
      verdictCopy.textContent = verdict.copy;
    } else {
      counts.nao += 1;
      const verdict = pickVerdict(NAO_VERDICTS);
      shell.dataset.state = "nao";
      portraitImg.src = "./assets/renan-nao.jpg";
      portraitImg.alt = "KING ROP cabisbaixo com a cuia de tereré vazia emborcada na mesa";
      portraitCaption.textContent = verdict.caption;
      verdictStamp.textContent = verdict.stamp;
      verdictCopy.textContent = verdict.copy;
    }

    verdictStamp.hidden = false;
    sessionTally.hidden = false;
    sessionTally.textContent = `Sorteios nesta sessão: ${counts.sim} sim e ${counts.nao} não.`;

    drawButton.textContent = "Sortear de novo";
    drawButton.disabled = false;
    isDrawing = false;
  }, suspenseMs);
}

drawButton.addEventListener("click", runDraw);

playPauseBtn.addEventListener("click", () => {
  if (!playerReady || !ytPlayer) {
    pendingAutoplay = true;
    trackStatus.textContent = "Carregando vitrola...";
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
  toggleVideoBtn.textContent = open ? "Ocultar clipe" : "Mostrar clipe";
});

populatePlaylistSelect();
injectYouTubeAPI();
