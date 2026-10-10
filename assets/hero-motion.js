(() => {
  const video = document.querySelector('#hero-video');
  const button = document.querySelector('.motion-toggle');
  if (!video || !button || typeof video.play !== 'function') return;

  const media = video.parentElement;
  const icon = button.querySelector('.motion-icon');
  const label = button.querySelector('.motion-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let userPaused = false;
  let userRequested = false;
  let inView = true;

  video.muted = true;
  video.defaultMuted = true;
  button.hidden = false;

  function syncButton() {
    const playing = !video.paused && !video.ended;
    icon.textContent = playing ? 'Ⅱ' : '▶';
    label.textContent = playing ? 'Pause motion' : 'Play motion';
  }

  function allowed() {
    return userRequested || (!reducedMotion.matches && !connection?.saveData);
  }

  function reconcile() {
    if (userPaused || !inView || document.hidden || !allowed()) {
      video.pause();
      syncButton();
      return;
    }
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => {
      syncButton();
    });
  }

  button.addEventListener('click', () => {
    if (!video.paused && !video.ended) {
      userPaused = true;
      video.pause();
    } else {
      userPaused = false;
      userRequested = true;
      reconcile();
    }
    syncButton();
  });

  video.addEventListener('playing', () => {
    media.classList.add('motion-ready');
    syncButton();
  });
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    media.classList.remove('motion-ready');
    syncButton();
  });
  document.addEventListener('visibilitychange', reconcile);

  function preferenceChanged() {
    userRequested = false;
    if (!allowed()) {
      video.pause();
      video.removeAttribute('src');
      video.load();
      media.classList.remove('motion-ready');
    }
    reconcile();
  }
  reducedMotion.addEventListener('change', preferenceChanged);
  connection?.addEventListener?.('change', preferenceChanged);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      reconcile();
    }, {threshold: 0.05});
    observer.observe(video.closest('.hero'));
  }
  reconcile();
})();
