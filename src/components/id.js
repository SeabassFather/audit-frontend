export function newCaseId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return (
    "case_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  );
}
