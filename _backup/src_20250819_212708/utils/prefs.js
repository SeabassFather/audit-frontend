const KEY = "soundEnabled";
let cached = null;

export function getSoundEnabled() {
  if (cached === null) {
    const raw = localStorage.getItem(KEY);
    cached = raw === null ? false : raw === "true";
  }
  return cached;
}

export function setSoundEnabled(val) {
  cached = !!val;
  localStorage.setItem(KEY, String(cached));
  window.dispatchEvent(new CustomEvent("prefs:sound", { detail: { enabled: cached }}));
}

export function onSoundChange(fn) {
  const handler = (e) => fn(!!(e.detail?.enabled));
  window.addEventListener("prefs:sound", handler);
  return () => window.removeEventListener("prefs:sound", handler);
}