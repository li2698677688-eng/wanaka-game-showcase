const list = document.querySelector('#game-list');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const visibleVideos = new Set();
const arrow = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(svg.namespaceURI, 'use');
  use.setAttribute('href', '#arrow-up-right');
  svg.append(use);
  return svg;
};

function createVideo(game, type) {
  const isOriginal = type === 'original';
  const figure = document.createElement('figure');
  figure.className = 'video-column';
  const label = document.createElement('figcaption');
  label.className = 'video-label';
  const title = document.createElement('span');
  title.textContent = isOriginal ? 'Original video' : 'Made with Wanaka';
  const duration = document.createElement('span');
  label.append(title, duration);
  const frame = document.createElement('div');
  frame.className = 'video-frame';
  const video = document.createElement('video');
  video.controls = true;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'none';
  video.poster = `./assets/posters/${game.id}-${type}.jpg`;
  video.dataset.src = `./assets/videos/${game.id}-${type}.mp4`;
  video.setAttribute('aria-label', `${game.name} — ${isOriginal ? 'original video' : 'Wanaka game recording'}`);
  const errorState = document.createElement('div');
  errorState.className = 'video-error';
  errorState.hidden = true;
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'This video could not be played.';
  const download = document.createElement('a');
  download.href = video.dataset.src;
  download.textContent = 'Download video';
  download.setAttribute('download', '');
  errorState.append(errorMessage, download);
  video.addEventListener('error', () => { errorState.hidden = false; });
  video.addEventListener('loadedmetadata', () => {
    const seconds = Math.floor(video.duration);
    duration.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    errorState.hidden = true;
  });
  video.addEventListener('play', () => {
    if (!visibleVideos.has(video) || document.hidden) {
      video.pause();
      return;
    }
    if (!video.muted) document.querySelectorAll('video').forEach(other => { if (other !== video) other.muted = true; });
  });
  video.addEventListener('volumechange', () => {
    if (!video.muted) document.querySelectorAll('video').forEach(other => { if (other !== video) other.muted = true; });
  });
  frame.append(video, errorState);
  figure.append(label, frame);
  const info = document.createElement('div');
  if (isOriginal) {
    info.className = 'game-info';
    const name = document.createElement('h2');
    name.id = `${game.id}-title`;
    name.textContent = game.name;
    info.append(name);
  } else {
    info.className = 'game-action';
    const hasUrl = typeof game.url === 'string' && /^https?:\/\//i.test(game.url);
    const note = document.createElement('p');
    note.className = 'link-note';
    note.id = `${game.id}-link-note`;
    note.textContent = hasUrl ? 'Made with Wanaka' : 'Game link coming soon';
    const action = document.createElement(hasUrl ? 'a' : 'button');
    action.className = 'pill';
    action.textContent = 'Play game';
    action.append(arrow());
    if (hasUrl) {
      action.href = game.url;
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
      action.setAttribute('aria-label', `Play ${game.name} (opens in a new tab)`);
    } else {
      action.disabled = true;
      action.setAttribute('aria-describedby', note.id);
      action.title = 'Game link coming soon';
    }
    info.append(note, action);
  }
  figure.append(info);
  return figure;
}

async function loadGames() {
  try {
    const response = await fetch('./games.json');
    if (!response.ok) throw new Error('Could not load game list');
    const games = await response.json();
    if (!Array.isArray(games) || !games.length || games.some(game => !/^[a-z0-9-]+$/.test(game.id) || typeof game.name !== 'string')) throw new Error('Invalid game list');
    const fragment = document.createDocumentFragment();
    for (const game of games) {
      const section = document.createElement('section');
      section.className = 'game';
      section.id = game.id;
      section.setAttribute('aria-labelledby', `${game.id}-title`);
      const comparison = document.createElement('div');
      comparison.className = 'comparison';
      comparison.append(createVideo(game, 'original'), createVideo(game, 'wanaka'));
      section.append(comparison);
      fragment.append(section);
    }
    list.replaceChildren(fragment);
    const observer = new IntersectionObserver(entries => {
      for (const { target: video, isIntersecting, intersectionRatio } of entries) {
        if (isIntersecting && intersectionRatio >= 0.25) {
          visibleVideos.add(video);
          if (!video.src) video.src = video.dataset.src;
          if (!document.hidden && !reducedMotion.matches) video.play().catch(() => {});
        } else {
          visibleVideos.delete(video);
          video.pause();
        }
      }
    }, { threshold: [0, 0.25] });
    document.querySelectorAll('video').forEach(video => observer.observe(video));
    const playingBeforeHidden = new Set();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        playingBeforeHidden.clear();
        visibleVideos.forEach(video => { if (!video.paused) playingBeforeHidden.add(video); video.pause(); });
      } else {
        playingBeforeHidden.forEach(video => {
          if (visibleVideos.has(video) && !reducedMotion.matches) video.play().catch(() => {});
        });
        playingBeforeHidden.clear();
      }
    });
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch {
    const state = document.createElement('div');
    state.className = 'load-state';
    const message = document.createElement('p');
    message.textContent = 'The games could not be loaded. Please try again.';
    const retry = document.createElement('button');
    retry.className = 'pill';
    retry.textContent = 'Try again';
    retry.addEventListener('click', loadGames);
    state.append(message, retry);
    list.replaceChildren(state);
  }
}
loadGames();
