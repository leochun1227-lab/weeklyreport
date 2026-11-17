// Weekly Report 监控网页配置 —— 和 agent/monitor_agent.py 保持一致
window.MONITOR_CONFIG = {
  // Firebase Realtime Database 地址
  DATABASE_URL: "https://weeklyreportmonday-default-rtdb.asia-southeast1.firebasedatabase.app",
  // 自动检查时间（只用于显示；真正的时间段在 agent 的 report_monitor.py 里）
  TIMEZONE: "Australia/Sydney",
  WINDOW_DAYS: [1],          // 1 = 周一（JS 星期：0 周日 … 6 周六）
  WINDOW: ["09:00", "15:00"],
};
