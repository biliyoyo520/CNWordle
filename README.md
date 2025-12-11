# CNWordle (汉字 Wordle)

一个基于字形相似度的汉字猜字游戏。

## 简介

CNWordle 是一款受 Wordle 启发的网页游戏，但针对汉字进行了独特的创新。不同于拼音或部首猜测，本游戏基于**字形（SVG 路径）的几何相似度**来提供反馈。玩家需要通过猜测汉字，根据笔画颜色的反馈来逼近目标汉字。

目前'目标汉字'字库为以下经过人工筛选的汉字，后续会扩充。
```
的一了在人他这个们为国地到以时要就会可你对能得着过后作道行然家方多经么去法学如同现没动起分还进好小部些主理心她前但因只从想实日军意力它把机公使情明性全三点外将高间问很最应战向头体相见被利什二等产或新制加斯月话合回特代信给位次度门任常海通教儿提立员解真论义几口认条平气题活尔别打变神总何数安少结受量感务做接场件计管期德资命金指许统区保至队形社便空决治展马科司基眼书非则听却达光放强即权思完设式路记南品住告类据程北边张该交规拉格望觉领共确传师观清今切院让识京口水沝淼㵘火炎焱燚炏
```

## 游戏特色

*   **字形相似度匹配**：核心算法利用 `opentype.js` 提取汉字轮廓，计算猜测字与目标字的笔画路径相似度。
*   **可视化反馈**：
    *   🟩 **绿色**：部件完全匹配 (相似度 ≥ 99%)
    *   🟨 **黄色**：部件部分相似 (66% ≤ 相似度 < 99%)
    *   ⬜ **灰色**：部件不匹配 (相似度 < 66%)
*   **多样的输入方式**：
    *   键盘输入
    *   **手写输入**：集成手写识别面板，支持鼠标和触摸屏。
        *   支持 Google 在线手写识别（高精度）。
        *   支持 HanziLookup 离线识别（无网可用）。
        *   支持代理模式解决跨域或网络问题。
*   **深色模式**：支持跟随系统自动切换，或手动切换深色/浅色主题。
*   **响应式设计**：完美适配桌面和移动端设备，提供舒适的交互体验。

## 技术栈

*   **前端核心**: HTML5, CSS3, Vanilla JavaScript (原生 JS，无大型框架依赖)
*   **字体处理**: [opentype.js](https://opentype.js.org/) - 用于解析字体文件并提取汉字轮廓路径。
*   **手写识别**:
    *   [HanziLookupJS](https://github.com/gugray/HanziLookupJS) - 离线手写识别库。
    *   Google Input Tools API - 在线手写识别服务。

## 安装与运行

本项目为纯静态网页，无需复杂的后端环境。

1.  **克隆项目**
    ```bash
    git clone https://github.com/biliyoyo520/CNWordle.git
    cd CNWordle
    ```

2.  **准备字体文件**
    确保 `fonts/` 目录下包含所需的字体文件。项目默认查找以下字体：
    *   `fonts/NotoSerifCJKsc-ExtraLight.otf`

3.  **启动服务**
    由于浏览器的跨域策略（CORS）限制，直接双击打开 `index.html` 可能无法加载字体文件。请使用任意静态文件服务器运行项目。

    *   **使用 Python**:
        ```bash
        # Python 3
        python -m http.server
        ```
    *   **使用 Node.js**:
        ```bash
        npx http-server
        ```
    *   **VS Code**:
        安装 "Live Server" 插件，右键 `index.html` 选择 "Open with Live Server"。

4.  **开始游戏**
    在浏览器中打开显示的地址（通常是 `http://localhost:8000` 或 `http://127.0.0.1:5500`）。

## 目录结构

```
CNWordle/
├── fonts/              # 字体文件存放目录
├── debug/              # 调试与旧版本备份
├── index.html          # 游戏入口文件
├── index.css           # 样式表
├── index.js            # 游戏核心逻辑
└── README.md           # 项目说明文档
```

## 鸣谢

- **代码**：Claude Opus 4.5、Gemini 3 Pro、GPT 4.1（摸鱼的）
- **构思**：biliyoyo520
- **灵感**：[chunqiuyiyu](https://news.ycombinator.com/item?id=46145168#46145277)
- **技术点**：汉字otf字体转svg拆分、使用Google IME识别手写体、使用HanziLookup实现离线识别
- **UI**：[Wordle](https://powerlanguage-wordle.github.io/)

## 许可证

GPLv2 License
