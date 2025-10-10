export const THEME_PRESETS = {
  fire: {
    bg: "#0a0a0c",
    panel: "#131317",
    border: "#26262f",
    accent: "#ff365d",
    accent2: "#ffb3c1",
    text: "#f4f6ff",
    muted: "#a9adbd",
  },
  ocean: {
    bg: "#0b1020",
    panel: "#121933",
    border: "#233055",
    accent: "#4da3ff",
    accent2: "#9fd0ff",
    text: "#e9eeff",
    muted: "#96a0c0",
  },
  forest: {
    bg: "#08110c",
    panel: "#0f1c16",
    border: "#1b2b23",
    accent: "#27d07d",
    accent2: "#9df2c8",
    text: "#eafff4",
    muted: "#9db5a8",
  },
  royal: {
    bg: "#0d0a15",
    panel: "#161128",
    border: "#2a2249",
    accent: "#8b5cf6",
    accent2: "#c4b5fd",
    text: "#f4f1ff",
    muted: "#b3a9cf",
  },
};

export function applyTheme(name) {
  const theme = THEME_PRESETS[name] || THEME_PRESETS.fire;
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) =>
    root.style.setProperty(`--${k}`, v),
  );
  localStorage.setItem("auditdna_theme", name);
}

export function initTheme() {
  const saved = localStorage.getItem("auditdna_theme") || "fire";
  applyTheme(saved);
}
