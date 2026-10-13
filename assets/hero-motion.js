(() => {
  const video = document.querySelector('#hero-video');
  const button = document.querySelector('.motion-toggle');
  if (!video || !button || typeof video.play !== 'function') return;
  const media = video.parentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let userPaused = false;
  let userRequested = false;
  let inView = !('IntersectionObserver' in window);
  let pending = false;
  let failed = false;
  video.muted = true;
  video.defaultMuted = true;
  button.hidden = false;

  const allowed = () => userRequested || (!reducedMotion.matches && !connection?.saveData);
  const shouldPlay = () => !userPaused && inView && !document.hidden && allowed() && !failed;
  function syncButton() {
    const playing = (!video.paused && !video.ended) || (pending && shouldPlay());
    button.dataset.playing = String(playing);
    button.setAttribute('aria-label', playing ? 'Pause background motion' : 'Play background motion');
    button.setAttribute('aria-pressed', String(playing));
  }
  function reconcile() {
    if (!shouldPlay()) { video.pause(); syncButton(); return; }
    if (pending || (!video.paused && !video.ended)) return;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    pending = true;
    syncButton();
    let retry = false;
    Promise.resolve(video.play()).then(() => {
      if (!shouldPlay()) video.pause();
    }).catch(error => {
      // Keep the poster and allow a deliberate retry after blocked autoplay.
      if (shouldPlay() && error?.name === 'AbortError') retry = true;
      else if (shouldPlay()) userPaused = true;
      media.classList.remove('motion-ready');
    }).finally(() => { pending = false; syncButton(); if (retry) reconcile(); });
  }
  button.addEventListener('click', () => {
    if ((!video.paused && !video.ended) || (pending && shouldPlay())) {
      userPaused = true;
      video.pause();
    } else {
      userPaused = false;
      userRequested = true;
      if (failed) { failed = false; video.removeAttribute('src'); video.load(); }
      reconcile();
    }
    syncButton();
  });
  video.addEventListener('playing', () => {
    if (!shouldPlay()) { video.pause(); return; }
    media.classList.add('motion-ready');
    syncButton();
  });
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    failed = true;
    video.pause();
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
