export function todayISO() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
  // return new Date().toISOString().split("T")[0];
}

export function addDays(dateISO, days) {
  const [y, m, d] = dateISO.split("-").map(Number);

  const date = new Date(y, m - 1, d); // local date
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
  // return d.toISOString().split("T")[0];
}
