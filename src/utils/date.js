export function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function addDays(dateISO, days) {
  const d = new Date(dateISO);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
