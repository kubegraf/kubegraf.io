// Theme Switcher for KubeGraf Documentation
// Define setTheme on window immediately so onclick handlers can use it
(function() {
  // Inline, theme-adaptive logo mark (replaces old PNG icons).
  // Keeping this here means every docs page gets the same switchable logo
  // without maintaining separate dark/light image assets.
  const createInlineLogoSvg = (label, existingClassName) => {
    const uid = `kg-${Math.random().toString(36).slice(2, 10)}`;
    const titleId = `${uid}-title`;
    const gradId = `${uid}-grad`;
    const glowId = `${uid}-glow`;
    const cls = `${existingClassName || ""} kg-logo-mark`.trim();

    return `
<svg role="img" aria-labelledby="${titleId}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="${cls}">
  <title id="${titleId}">${label || "KubeGraf"}</title>
  <defs>
    <linearGradient id="${gradId}" x1="14" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="var(--kg-logo-accent-1)" />
      <stop offset="1" stop-color="var(--kg-logo-accent-2)" />
    </linearGradient>
    <radialGradient id="${glowId}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(28)">
      <stop offset="0" stop-color="var(--kg-logo-accent-2)" stop-opacity="0.22" />
      <stop offset="0.55" stop-color="var(--kg-logo-accent-1)" stop-opacity="0.10" />
      <stop offset="1" stop-color="var(--kg-logo-accent-1)" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" fill="url(#${glowId})" />
  <path d="M32 7.5L52.5 19.5V44.5L32 56.5L11.5 44.5V19.5L32 7.5Z" stroke="var(--kg-logo-muted)" stroke-width="2.5" stroke-linejoin="round" />
  <path d="M22 27.5L32 22L42 27.5L40.5 39.5L32 44.5L23.5 39.5L22 27.5Z" stroke="url(#${gradId})" stroke-width="2.5" stroke-linejoin="round" />
  <path d="M32 22V44.5" stroke="var(--kg-logo-stroke)" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round" />
  <circle cx="32" cy="22" r="3.2" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="22" cy="27.5" r="3.0" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="42" cy="27.5" r="3.0" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="23.5" cy="39.5" r="3.0" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="40.5" cy="39.5" r="3.0" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="32" cy="44.5" r="3.2" fill="var(--kg-logo-surface)" stroke="url(#${gradId})" stroke-width="2" />
  <circle cx="48.5" cy="18.5" r="1.8" fill="var(--kg-logo-accent-1)" />
</svg>
    `.trim();
  };

  const replaceLogoImagesWithInlineSvg = () => {
    const images = document.querySelectorAll(
      'img.sidebar-logo-icon, img[src*="/assets/logo/kubegraf_color_icon.png"], img[src*="kubegraf_color_icon.png"]'
    );

    images.forEach((img) => {
      if (img.getAttribute("data-kg-inline-logo") === "1") return;

      const wrapper = document.createElement("span");
      wrapper.innerHTML = createInlineLogoSvg(img.getAttribute("alt") || "KubeGraf", img.getAttribute("class"));
      const svg = wrapper.firstElementChild;
      if (!svg) return;

      svg.setAttribute("data-kg-inline-logo", "1");
      img.replaceWith(svg);
    });
  };

  // Check for saved theme preference or default to dark
  const getTheme = () => {
    const saved = localStorage.getItem('kubegraf-theme');
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  };

  // Update footer theme buttons
  const updateFooterThemeButtons = (theme) => {
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');
    
    if (lightBtn && darkBtn) {
      if (theme === 'light') {
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      } else {
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
      }
    }
  };

  // Apply theme
  const applyTheme = (theme) => {
    if (!document.documentElement) return; // Safety check
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kubegraf-theme', theme);

    // Update toggle button icon if it exists
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }

    // Update footer theme buttons
    updateFooterThemeButtons(theme);
  };

  // Set theme (for footer buttons) - must be on window for onclick handlers
  // Define this immediately so it's available when buttons are clicked
  window.setTheme = function(theme) {
    applyTheme(theme);
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);
    replaceLogoImagesWithInlineSvg();
    
    // Also attach event listeners to buttons as fallback (in addition to onclick)
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');
    
    if (lightBtn) {
      // Remove existing listeners to avoid duplicates
      const newLightBtn = lightBtn.cloneNode(true);
      lightBtn.parentNode.replaceChild(newLightBtn, lightBtn);
      newLightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.setTheme('light');
      });
    }
    
    if (darkBtn) {
      // Remove existing listeners to avoid duplicates
      const newDarkBtn = darkBtn.cloneNode(true);
      darkBtn.parentNode.replaceChild(newDarkBtn, darkBtn);
      newDarkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.setTheme('dark');
      });
    }
  };

  // Toggle theme
  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    // DOM already loaded, run immediately
    initTheme();
  }
})();
