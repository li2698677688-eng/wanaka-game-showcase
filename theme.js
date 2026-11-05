(() => {
  let preference = 'system';
  try { preference = localStorage.getItem('wanaka-theme') || 'system'; } catch {}
  if (!['light', 'dark', 'system'].includes(preference)) preference = 'system';
  const media = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(value) {
    preference = value;
    document.documentElement.dataset.theme = value === 'system' ? (media.matches ? 'dark' : 'light') : value;
    document.documentElement.dataset.themePreference = value;
  }
  applyTheme(preference);
  media.addEventListener('change', () => { if (preference === 'system') applyTheme(preference); });
  document.addEventListener('change', (event) => {
    if (!event.target.matches('input[name="theme"]')) return;
    applyTheme(event.target.value);
    try { localStorage.setItem('wanaka-theme', preference); } catch {}
    document.querySelector('.theme-picker').open = false;
    document.querySelector('.theme-picker summary').focus();
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(`input[name="theme"][value="${preference}"]`).checked = true;
    const picker = document.querySelector('.theme-picker');
    document.addEventListener('click', (event) => { if (!picker.contains(event.target)) picker.open = false; });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && picker.open) {
        picker.open = false;
        picker.querySelector('summary').focus();
      }
    });
  });
})();
