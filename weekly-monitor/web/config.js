// Weekly Report monitor page settings
window.MONITOR_CONFIG = {
  // Firebase Realtime Database URL and data path (must match agent/monitor_agent.py)
  DATABASE_URL: "https://weeklyreportmonday-default-rtdb.asia-southeast1.firebasedatabase.app",
  DATA_PATH: "weeklyMonitor",
  // Auto-check window (display only; the real window is set in agent/report_monitor.py)
  TIMEZONE: "Australia/Sydney",
  WINDOW_DAYS: [1],          // 1 = Monday (JS weekday: 0 Sun … 6 Sat)
  WINDOW: ["09:00", "15:00"],
  MONTH_END_DAYS: true,      // also the last 5 days of a month + the 1st–4th (monthly report)
};
