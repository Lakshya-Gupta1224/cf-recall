export function saveCalendarDate(date) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ calendarSelectedDate: date }, resolve);
  });
}

export function getCalendarDate() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["calendarSelectedDate"], (res) => {
      resolve(res.calendarSelectedDate || null);
    });
  });
}
