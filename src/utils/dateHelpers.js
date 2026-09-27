import { CalendarDateTime } from "@internationalized/date";

/**
 * Parses time string (e.g. "09:00 AM - 11:00 AM") into { startTime, endTime }
 */
export const parseTimeRange = (timeStr = "") => {
  if (!timeStr) return { startTime: "", endTime: "" };
  const parts = String(timeStr).split("-").map((s) => s.trim());
  return {
    startTime: parts[0] || "",
    endTime: parts[1] || "",
  };
};

/**
 * Formats HeroUI CalendarDateTime value to `{ date: "YYYY-MM-DD", time: "hh:mm AM" }`
 */
export const formatCalendarDateTime = (val) => {
  if (!val) return { date: "", time: "" };
  const d = new Date(val.year, val.month - 1, val.day, val.hour || 0, val.minute || 0);
  const date = `${val.year}-${String(val.month).padStart(2, "0")}-${String(val.day).padStart(2, "0")}`;
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { date, time };
};

/**
 * Converts date & time strings into a HeroUI CalendarDateTime object
 */
export const getCalendarDateTime = (dateStr, timeStr = "") => {
  if (!dateStr) return null;
  try {
    const d = new Date(`${dateStr} ${timeStr}`.trim());
    if (isNaN(d.getTime())) {
      const [year, month, day] = String(dateStr).split("-").map(Number);
      if (!year || !month || !day) return null;
      return new CalendarDateTime(year, month, day, 0, 0);
    }
    return new CalendarDateTime(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes()
    );
  } catch {
    return null;
  }
};

/**
 * Checks if end date & time is strictly after start date & time
 */
export const isEndAfterStart = (startDate, startTime, endDate, endTime) => {
  if (!startDate || !endDate || !startTime || !endTime) return true;
  const start = new Date(`${startDate} ${startTime}`).getTime();
  const end = new Date(`${endDate} ${endTime}`).getTime();
  return isNaN(start) || isNaN(end) ? true : end > start;
};
