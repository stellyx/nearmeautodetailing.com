(() => {
  const form = document.querySelector('#detail-brief');
  const output = document.querySelector('#brief-message');
  const textLink = document.querySelector('#text-brief');
  const copyButton = document.querySelector('#copy-brief');
  const status = document.querySelector('#brief-status');
  if (!form || !output || !textLink || !copyButton || !status) return;
  const service = form.elements.service;
  let revision = 0;
  let copying = false;
  const clean = value => value.trim().replace(/\s+/g, ' ');
  function update() {
    revision++;
    const vehicle = clean(form.elements.vehicle.value);
    const area = clean(form.elements.area.value);
    const priorities = clean(form.elements.priorities.value);
    const lines = [`Hi Near Me Auto Detailing, I’m interested in ${service.value.toLowerCase()}.`];
    if (vehicle) lines.push(`Vehicle: ${vehicle}.`);
    if (area) lines.push(`Area: ${area}.`);
    if (priorities) lines.push(`Priorities: ${priorities}`);
    lines.push('Could we discuss the options and a quote?');
    output.textContent = lines.join('\n');
    textLink.href = `sms:+15125532552?body=${encodeURIComponent(output.textContent)}`;
    status.textContent = '';
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => { service.value = link.dataset.service; update(); });
  });
  copyButton.addEventListener('click', async () => {
    if (copying) return;
    copying = true;
    const version = revision;
    const message = output.textContent;
    try {
      await navigator.clipboard.writeText(message);
      if (revision === version) status.textContent = 'Message copied. Paste it into your text app when you’re ready.';
    } catch {
      if (revision === version) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(output);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Select and copy the message above, then paste it into your text app.';
      }
    } finally { copying = false; }
  });
  textLink.addEventListener('click', () => {
    status.textContent = 'Review and send in your text app. If it doesn’t open, copy the message or call.';
  });
  document.querySelector('.brief-actions').hidden = false;
  update();
  const dock = document.querySelector('.mobile-contact');
  if (dock && 'IntersectionObserver' in window) {
    const visibility = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
      dock.hidden = [...visibility.values()].some(Boolean);
    }, {threshold: 0});
    [document.querySelector('.hero'), document.querySelector('#contact'), form].filter(Boolean).forEach(element => {visibility.set(element, false); observer.observe(element);});
  }
})();
