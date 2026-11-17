# Weekly Report 监控网页（Render 版）

```
Windows 报告电脑 (agent/)  ──写检查结果、日志、PDF──▶  Firebase  ◀──读── Render 网页 (web/)
                          ◀──读“检查 / 生成”命令──            ──写命令──
```
Render 连不到内网 SAP 和 Outlook，所以检查都在报告电脑上做；网页只负责显示和发命令。
agent 只在每周一 8:55–15:05 运行，其它时间网页显示上一次的结果。

## 1. Firebase（只做一次）
1. 用一个 Firebase 项目的 Realtime Database（新建或用现有的都可以），复制数据库地址。
2. 把 `firebase.rules.json` 里的规则加进 Realtime Database → Rules（已有规则就把 `weeklyMonitor` 那段合并进去）。
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
`https://<你的服务名>.onrender.com/#k=V-qf9JUzg9wjZDB5puKCi_j7`
第一次打开后会记住访问码，以后直接打开 `https://<你的服务名>.onrender.com` 即可。
访问码相当于密码；想换的话，同时改 `monitor_agent.py` 的 `MONITOR_KEY` 和 Firebase 规则。

## 本地版（不用 Render）
`python report_monitor.py` 后打开 `http://<电脑名>:8765`，功能相同。
