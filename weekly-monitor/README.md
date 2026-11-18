# Weekly Report 监控网页（Render 版）

```
Windows 报告电脑 (agent/)  ──写检查结果、日志、PDF──▶  Firebase  ◀──读── Render 网页 (web/)
                          ◀──读“检查 / 生成”命令──            ──写命令──
```
Render 连不到内网 SAP 和 Outlook，所以检查都在报告电脑上做；网页只负责显示和发命令。
agent 只在每周一 8:55–15:05 运行，其它时间网页显示上一次的结果。

## 1. Firebase（只做一次）
1. 用一个 Firebase 项目的 Realtime Database（新建或用现有的都可以），复制数据库地址。
2. 把 `firebase.rules.json` 里的规则贴进 Realtime Database → Rules → Publish（`weeklyMonitor` 路径公开读写，不需要访问码）。
3. 把数据库地址填到两个地方：
   - `web/config.js` → `DATABASE_URL`
   - `agent/monitor_agent.py` → `FIREBASE_URL`

## 2. Render（只做一次）
1. 把这个文件夹推到 GitHub（`.gitignore` 已经排除 `agent/`：里面的周报脚本有 SAP 密码和 OpenAI Key，不要上传）。
2. Render → New → Blueprint → 选这个仓库（会读 `render.yaml`，建一个免费静态网站）。
   也可以 New → Static Site，Publish directory 填 `web`，Build command 留空。

## 3. 报告电脑（只做一次）
1. 把 `agent/` 里的文件放进周报脚本所在的文件夹。
2. 右键 `install_agent_task.ps1` → 使用 PowerShell 运行：每周一 8:55 启动 agent，15:05 自动退出。
   临时手动启动：双击 `start_agent.bat`。
3. 电脑需要开着、已登录，Outlook 打开。

## 4. 给助理的链接
直接发 `https://<你的服务名>.onrender.com`，不需要访问码。网页是英文的。

## 不会自动发任何邮件
- 网页上“Generate PDF”只生成 PDF（agent 永远带 `--no-email`），助理点 Download PDF 下载后自己发。
- `Weekly_Report_Preview_3.py` 默认也不再发 EmailJS 邮件（包括 Task Scheduler 周一的自动运行）；需要时手动加 `--send-email`。
- 提醒 Jake / 高志芳 / Mark 的按钮只是在助理自己的邮箱里打开一封草稿，由她自己点发送。

## 本地版（不用 Render）
`python report_monitor.py` 后打开 `http://<电脑名>:8765`，功能相同。

## 周报 / 月报切换
- 网页顶部 **Weekly | Monthly** 切换；Monthly 旁边选月份（默认：每月 1–4 号选上个月，其它日子选当月）。
- **周报**和原来完全一样（周一，原来的页面和数据）。
- **月报**（`--report monthly --month YYYY-MM`）：
  - 财务、生产（Snowy App 自动切到所选月份；不含在途/红车等瞬时值）、展会、Orders Received、
    月底 Final 销售邮件、售后两页（HR Firebase：审批/配件完成、Approved repair costs）。
  - 月底邮件：Sales Data 文件夹里、当月最后 5 天到下月 4 号收到的邮件；
    Final / Monthly / Month End / EOM 优先，其次主题里只有月份名的，最后才用窗口里最新的一封（网页标黄）。
  - 文件名 `Regent_RV_Monthly_Report_YYYY-MM.pdf`，资源放在 `monthly_report_assets/`，不影响周报。
- 找不到邮件或格式不对时，网页卡片上可以：
  - **Use a specific email**：从下拉列表里选 Sales Data 里的任意一封；
  - **Upload**：上传截图、Excel 或 PDF（Excel / 文字版 PDF 直接解析，截图和扫描 PDF 用 OpenAI 识别）。
  选择只对当周 / 当月有效，保存在 `manual_inputs.json`，可以点 “Stop using the manual input” 取消。
- Leisure Lion 表格支持 Gympie 等新门店（空白或 “—” 显示为 —）。

## 监控时间
agent 每天 8:55 由计划任务启动：周一和月底那几天（最后 5 天 + 下月 1–4 号）运行到 15:05，
其它日子立即退出。手动运行 `start_agent.bat` 任何一天都可以。
（`install_agent_task.ps1` 改成了每天触发，请重新运行一次。）
