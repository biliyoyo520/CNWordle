// ==================== 游戏状态 ====================
        let targetChar = '';
        let guessCount = 0;
        let gameWon = false;
        let targetPaths = [];
        let targetNestingLevels = [];
        let currentFont = null;
        let guessHistory = []; // 存储最近15次猜测
        let autoGuessTimer = null;
        let isShowingResult = false; // 是否在显示结果（继续状态）
        let countdownTimer = null; // 倒计时计时器
        let countdownValue = 3; // 倒计时值

        // 常用汉字列表
        const commonChars = '的一了在人他这个们为国地到以时要就会可你对能得着过后作道行然家方多经么去法学如同现没动起分还进好小部些主理心她前但因只从想实日军意力它把机公使情明性全三点外将高间问很最应战向头体相见被利什二等产或新制加斯月话合回特代信给位次度门任常海通教儿提立员解真论义几口认条平气题活尔别打变神总何数安少结受量感务做接场件计管期德资命金指许统区保至队形社便空决治展马科司基眼书非则听却达光放强即权思完设式路记南品住告类据程北边张该交规拉格望觉领共确传师观清今切院让识京口水沝淼㵘火炎焱燚炏';

        // ==================== DOM 元素 ====================
        const guessInput = document.getElementById('guessInput');
        const guessBtn = document.getElementById('guessBtn');
        const guessCountDisplay = document.getElementById('guessCount');
        const guessCountContainer = document.getElementById('guessCountContainer');
        const inputSvgOverlay = document.getElementById('inputSvgOverlay');
        const historyGrid = document.getElementById('historyGrid');
        const detailPanel = document.getElementById('detailPanel');
        const detailCloseBtn = document.getElementById('detailCloseBtn');
        const detailGlyph = document.getElementById('detailGlyph');
        const detailSimilarity = document.getElementById('detailSimilarity');
        const overlay = document.getElementById('overlay');
        const appContainer = document.getElementById('appContainer');
        const winModal = document.getElementById('winModal');
        const modalTarget = document.getElementById('modalTarget');
        const modalGuessCount = document.getElementById('modalGuessCount');
        const playAgainBtn = document.getElementById('playAgainBtn');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const themeBtn = document.getElementById('themeBtn');
        const helpBtn = document.getElementById('helpBtn');
        const helpModal = document.getElementById('helpModal');
        const helpCloseBtn = document.getElementById('helpCloseBtn');
        const giveUpBtn = document.getElementById('giveUpBtn');
        const loseModal = document.getElementById('loseModal');
        const loseModalTarget = document.getElementById('loseModalTarget');
        const loseModalGuessCount = document.getElementById('loseModalGuessCount');
        const losePlayAgainBtn = document.getElementById('losePlayAgainBtn');
        const loseModalCloseBtn = document.getElementById('loseModalCloseBtn');
        const iconAuto = document.getElementById('iconAuto');
        const iconLight = document.getElementById('iconLight');
        const iconDark = document.getElementById('iconDark');
        const detailWarning = document.getElementById('detailWarning');
        const helpGotItBtn = document.getElementById('helpGotItBtn');
        const handwriteBtn = document.getElementById('handwriteBtn');
        const handwriteModal = document.getElementById('handwriteModal');
        const handwriteCloseBtn = document.getElementById('handwriteCloseBtn');
        const handwriteCanvas = document.getElementById('handwriteCanvas');
        const handwriteUndoBtn = document.getElementById('handwriteUndoBtn');
        const handwriteClearBtn = document.getElementById('handwriteClearBtn');
        const handwriteCandidates = document.getElementById('handwriteCandidates');

        // 手写识别状态
        let handwriteStrokes = [];
        let currentStroke = [];
        let isDrawing = false;
        let handwriteCtx = null;
        let hanziLookupLoaded = false;
        let hanziLookupLoading = false;
        
        // 手写识别引擎
        let currentEngine = 'google'; // 'hanzilookup' | 'proxy' | 'google'
        let proxyIMEAvailable = null; // null=未测试, true=可用, false=不可用
        let googleIMEAvailable = null; // null=未测试, true=可用, false=不可用
        const PROXY_IME_URL = 'https://gle-ime.yoyo250.fun/';
        const GOOGLE_IME_URL = 'https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8';
        const handwriteEngineSelect = document.getElementById('handwriteEngineSelect');
        const handwriteEngineStatus = document.getElementById('handwriteEngineStatus');

        // 主题状态：0=跟随系统, 1=第一次点击, 2=第二次点击
        let themeState = 0;
        let systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let helpCountdownTimer = null;
        let helpCountdownValue = 10;

        // ==================== 初始化 ====================
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingMessage = document.getElementById('loadingMessage');
        const loadingProgressBar = document.getElementById('loadingProgressBar');

        function updateGuessCountDisplay(count) {
            const prefix = window.t ? window.t('guess_count_prefix') : null;
            const suffix = window.t ? window.t('guess_count_suffix') : null;
            
            const p = prefix !== null ? prefix : '第';
            const s = suffix !== null ? suffix : '次';
            
            guessCountContainer.innerHTML = `${p} <span id="guessCount">${count}</span> ${s}`;
        }

        window.addEventListener('languageChanged', (e) => {
            updateGuessCountDisplay(guessCount);
            if (helpCountdownTimer) {
                updateHelpCountdown();
            }
            // Update handwrite candidates placeholder if empty
            const placeholder = handwriteCandidates.querySelector('.handwrite-placeholder');
            if (placeholder) {
                 const msg = (window.t && window.t('handwrite_placeholder')) || '在上方书写汉字';
                 // Check if it's the "no result" message or the default placeholder
                 if (placeholder.textContent.includes('未识别') || (window.t && placeholder.textContent === window.t('handwrite_no_result'))) {
                     placeholder.textContent = (window.t && window.t('handwrite_no_result')) || '未识别到汉字';
                 } else {
                     placeholder.textContent = msg;
                 }
            }
        });

        async function init() {
            applyTheme(); // 初始化时应用主题
            initHistoryGrid();
            
            // 显示加载浮窗
            showLoading('正在加载字体...');
            
            const loaded = await loadFont();
            if (loaded) {
                guessBtn.disabled = false;
                hideLoading();
                
                // 检查是否首次访问
                if (!localStorage.getItem('hasVisited')) {
                    showFirstTimeHelp();
                } else {
                    startNewGame();
                }
            } else {
                showLoadingError((window.t && window.t('loading_error')) || '字体加载失败，请刷新页面');
            }
            setupEventListeners();
        }

        function showFirstTimeHelp() {
            helpModal.classList.add('show');
            helpCountdownValue = 10;
            updateHelpCountdown();
            helpCountdownTimer = setInterval(() => {
                helpCountdownValue--;
                if (helpCountdownValue <= 0) {
                    closeFirstTimeHelp();
                } else {
                    updateHelpCountdown();
                }
            }, 1000);
        }

        function updateHelpCountdown() {
            const gotIt = (window.t && window.t('btn_got_it')) || '我知道了';
            helpGotItBtn.textContent = `${gotIt}(${helpCountdownValue})`;
        }

        function closeFirstTimeHelp() {
            if (helpCountdownTimer) {
                clearInterval(helpCountdownTimer);
                helpCountdownTimer = null;
            }
            helpModal.classList.remove('show');
            
            // 首次访问时才标记并开始游戏
            if (!localStorage.getItem('hasVisited')) {
                localStorage.setItem('hasVisited', 'true');
                startNewGame();
            }
        }

        let loadingTimeoutTimer = null;
        const loadingTimeoutWarning = document.getElementById('loadingTimeoutWarning');
        const FONT_DEFAULT_SIZE_KB = 20905; // 默认字体大小（KB），用于无法获取content-length时估算进度

        function showLoading(message) {
            loadingMessage.textContent = message;
            loadingProgressBar.classList.add('indeterminate');
            loadingOverlay.classList.remove('hidden');
            
            // 60秒后显示超时提示
            clearTimeout(loadingTimeoutTimer);
            loadingTimeoutTimer = setTimeout(() => {
                if (loadingTimeoutWarning) {
                    loadingTimeoutWarning.innerHTML = (window.t && window.t('loading_timeout_warning')) || 
                        "加载时间较长？尝试<a href='javascript:location.reload()'>刷新页面</a>或<a href='https://github.com/biliyoyo520/CNWordle/issues' target='_blank' rel='noopener'>反馈问题</a>";
                    loadingTimeoutWarning.style.display = 'block';
                }
            }, 60000);
        }

        function updateLoadingProgress(percent, message) {
            loadingMessage.textContent = message || loadingMessage.textContent;
            loadingProgressBar.classList.remove('indeterminate');
            loadingProgressBar.style.width = `${percent}%`;
        }

        function hideLoading() {
            clearTimeout(loadingTimeoutTimer);
            if (loadingTimeoutWarning) loadingTimeoutWarning.style.display = 'none';
            updateLoadingProgress(100, (window.t && window.t('loading_complete')) || '加载完成!');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 300);
        }

        function showLoadingError(message) {
            loadingMessage.textContent = message;
            loadingProgressBar.style.backgroundColor = 'var(--color-present)';
            loadingProgressBar.classList.remove('indeterminate');
            loadingProgressBar.style.width = '100%';
        }

        function initHistoryGrid() {
            historyGrid.innerHTML = '';
            for (let i = 0; i < 15; i++) {
                const tile = document.createElement('div');
                tile.className = 'history-tile empty';
                tile.dataset.index = i;
                historyGrid.appendChild(tile);
            }
        }

        // ==================== 字体加载 ====================
        async function loadFont() {
            const presetFonts = [
                'https://magenta-accessible-gibbon-63.mypinata.cloud/ipfs/bafybeignufq4erz4kdagtwi3vxu2k47fjhnfv6c6cyfhxugii72ikbzcua',
                'fonts/NotoSerifCJKsc-ExtraLight.otf',
            ];

            for (let i = 0; i < presetFonts.length; i++) {
                const fontPath = presetFonts[i];
                try {
                    updateLoadingProgress(10 + i * 20, `${(window.t && window.t('loading_font')) || '正在加载字体'} (${i + 1}/${presetFonts.length})...`);
                    
                    const response = await fetch(fontPath);
                    if (!response.ok) continue;

                    // 如果支持进度，显示下载进度
                    const contentLength = response.headers.get('content-length');
                    if (contentLength) {
                        const total = parseInt(contentLength, 10);
                        const reader = response.body.getReader();
                        let received = 0;
                        const chunks = [];
                        
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            received += value.length;
                            const percent = Math.round((received / total) * 70) + 20;
                            updateLoadingProgress(percent, `${(window.t && window.t('downloading_font')) || '正在下载字体...'} ${Math.round(received / 1024)}KB / ${Math.round(total / 1024)}KB`);
                        }
                        
                        const arrayBuffer = new Uint8Array(received);
                        let position = 0;
                        for (const chunk of chunks) {
                            arrayBuffer.set(chunk, position);
                            position += chunk.length;
                        }
                        
                        updateLoadingProgress(90, (window.t && window.t('parsing_font')) || '正在解析字体...');
                        
                        try {
                            const fonts = opentype.parseCollection(arrayBuffer.buffer);
                            currentFont = fonts[0];
                        } catch (e) {
                            currentFont = opentype.parse(arrayBuffer.buffer);
                        }
                    } else {
                        // 不支持进度（流传输），使用默认字体大小估算
                        const total = FONT_DEFAULT_SIZE_KB * 1024; // 转换为字节
                        const reader = response.body.getReader();
                        let received = 0;
                        const chunks = [];
                        
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            received += value.length;
                            const percent = Math.min(Math.round((received / total) * 70) + 20, 89);
                            updateLoadingProgress(percent, `${(window.t && window.t('downloading_font')) || '正在下载字体...'} ${Math.round(received / 1024)}KB / ~${FONT_DEFAULT_SIZE_KB}KB`);
                        }
                        
                        const arrayBuffer = new Uint8Array(received);
                        let position = 0;
                        for (const chunk of chunks) {
                            arrayBuffer.set(chunk, position);
                            position += chunk.length;
                        }
                        
                        updateLoadingProgress(90, (window.t && window.t('parsing_font')) || '正在解析字体...');

                        try {
                            const fonts = opentype.parseCollection(arrayBuffer.buffer);
                            currentFont = fonts[0];
                        } catch (e) {
                            currentFont = opentype.parse(arrayBuffer.buffer);
                        }
                    }

                    console.log('字体加载成功:', fontPath);
                    return true;
                } catch (e) {
                    console.log('尝试加载字体失败:', fontPath);
                }
            }
            return false;
        }

        // ==================== 游戏逻辑 ====================
        function startNewGame() {
            targetChar = commonChars[Math.floor(Math.random() * commonChars.length)];
            guessCount = 0;
            gameWon = false;
            guessHistory = [];
            updateGuessCountDisplay(0);
            guessInput.value = '';
            guessInput.classList.remove('has-svg');
            inputSvgOverlay.classList.remove('show');
            inputSvgOverlay.innerHTML = '';
            guessBtn.textContent = (window.t && window.t('btn_guess')) || '猜';
            guessBtn.onclick = null; // 重置按钮点击事件
            guessInput.disabled = false;
            winModal.classList.remove('show');
            loseModal.classList.remove('show');
            closeDetailPanel();

            // 预计算目标字路径
            targetPaths = extractClosedPaths(currentFont, targetChar, 200, 8);
            targetNestingLevels = determineNestingLevelsLocal(targetPaths);

            // 重置历史格子
            initHistoryGrid();

            guessInput.focus();
            console.log('新游戏开始，目标字:', targetChar);
        }

        function handleGuess() {
            if (gameWon) return;
            
            clearAutoGuessTimer();

            const guess = guessInput.value.trim();
            if (!guess || guess.length !== 1) return;

            guessCount++;
            updateGuessCountDisplay(guessCount);

            // 提取猜测字的路径并计算相似度
            const guessPaths = extractClosedPaths(currentFont, guess, 200, 8);
            const guessNestingLevels = determineNestingLevelsLocal(guessPaths);

            const { matchScores } = compareGlyphPaths(
                targetPaths.filter((_, i) => targetNestingLevels[i] % 2 === 0),
                guessPaths.filter((_, i) => guessNestingLevels[i] % 2 === 0)
            );

            // 构建猜测数据
            const guessData = {
                char: guess,
                paths: guessPaths,
                nestingLevels: guessNestingLevels,
                matchScores: matchScores,
                isCorrect: guess === targetChar
            };

            // 添加到历史
            guessHistory.unshift(guessData);
            if (guessHistory.length > 15) {
                guessHistory.pop();
            }

            // 更新历史格子
            updateHistoryGrid();

            // 显示SVG覆盖（包含倒计时）
            const isCorrectGuess = guess === targetChar;
            showInputSvgOverlay(guessPaths, guessNestingLevels, matchScores, isCorrectGuess);

            if (isCorrectGuess) {
                gameWon = true;
                clearCountdown(); // 猜对了不需要倒计时
                // 更新按钮文本为"重来"
                guessBtn.textContent = (window.t && window.t('btn_restart_win')) || '重来';
                guessBtn.onclick = startNewGame;
                setTimeout(showWinModal, 1500);
            }
        }

        function showInputSvgOverlay(paths, nestingLevels, matchScores, isCorrect = false) {
            const pathColors = buildPathColors(paths, nestingLevels, matchScores);
            const svg = createFullGlyphSvg(paths, nestingLevels, pathColors, 70);
            
            inputSvgOverlay.innerHTML = '';
            inputSvgOverlay.appendChild(svg);
            inputSvgOverlay.classList.add('show');
            guessInput.classList.add('has-svg');
            isShowingResult = true;
            
            // 猜对时只变边框为绿色，背景保持黑/白
            if (isCorrect) {
                inputSvgOverlay.classList.add('correct');
            } else {
                inputSvgOverlay.classList.remove('correct');
            }
            
            // 开始倒计时
            startCountdown();
            
            // 保持输入框焦点，不禁用它（但仅当手写板未打开时）
            if (!handwriteModal.classList.contains('show')) {
                guessInput.focus();
            }
        }

        function hideInputSvgOverlay() {
            inputSvgOverlay.classList.remove('show');
            inputSvgOverlay.classList.remove('correct');
            guessInput.classList.remove('has-svg');
            guessInput.value = '';
            isShowingResult = false;
            clearCountdown();
            guessBtn.textContent = (window.t && window.t('btn_guess')) || '猜';
            // 仅当手写板未打开时才聚焦输入框，避免移动端弹出软键盘
            if (!handwriteModal.classList.contains('show')) {
                guessInput.focus();
            }
        }

        function startCountdown() {
            countdownValue = 3;
            updateCountdownDisplay();
            clearCountdown();
            countdownTimer = setInterval(() => {
                countdownValue--;
                if (countdownValue <= 0) {
                    clearCountdown();
                    hideInputSvgOverlay();
                } else {
                    updateCountdownDisplay();
                }
            }, 1000);
        }

        function clearCountdown() {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        }

        function updateCountdownDisplay() {
            const continueText = (window.t && window.t('btn_continue')) || '继续';
            guessBtn.textContent = `${continueText}(${countdownValue})`;
        }

        function buildPathColors(paths, nestingLevels, matchScores) {
            const pathColors = [];
            let visibleIndex = 0;
            paths.forEach((_, index) => {
                if (nestingLevels[index] % 2 === 0) {
                    const score = matchScores[visibleIndex] || 0;
                    const level = getMatchLevel(score);
                    pathColors[index] = {
                        color: getMatchColor(level),
                        score: score,
                        level: level
                    };
                    visibleIndex++;
                } else {
                    pathColors[index] = { color: 'var(--color-bg)', score: null, level: null };
                }
            });
            return pathColors;
        }

        function updateHistoryGrid() {
            const tiles = historyGrid.querySelectorAll('.history-tile');
            tiles.forEach((tile, i) => {
                tile.innerHTML = '';
                tile.className = 'history-tile';
                
                if (i < guessHistory.length) {
                    const data = guessHistory[i];
                    const pathColors = buildPathColors(data.paths, data.nestingLevels, data.matchScores);
                    const svg = createFullGlyphSvg(data.paths, data.nestingLevels, pathColors, 50);
                    tile.appendChild(svg);
                    
                    if (data.isCorrect) {
                        tile.classList.add('correct');
                    } else if (!commonChars.includes(data.char)) {
                        tile.classList.add('not-in-list');
                    }

                    tile.onclick = () => openDetailPanel(data);
                } else {
                    tile.classList.add('empty');
                    tile.onclick = null;
                }
            });
        }

        // ==================== 详情面板 ====================
        function openDetailPanel(data) {
            // 构建SVG，给每个路径添加ID
            const pathColors = buildPathColors(data.paths, data.nestingLevels, data.matchScores);
            const svg = createFullGlyphSvgWithIds(data.paths, data.nestingLevels, pathColors, 120);
            detailGlyph.innerHTML = '';
            detailGlyph.appendChild(svg);

            // 构建相似度列表
            detailSimilarity.innerHTML = '';
            let visibleIndex = 0;
            data.paths.forEach((_, index) => {
                if (data.nestingLevels[index] % 2 !== 0) return;

                const { color, score, level } = pathColors[index];
                const item = document.createElement('div');
                item.className = 'similarity-item';
                item.dataset.pathIndex = index;
                item.innerHTML = `
                    <div class="similarity-color ${level}" style="background-color: ${color}"></div>
                    <span class="similarity-value ${level}">${Math.round(score)}%</span>
                `;
                
                // 点击高亮对应路径
                item.addEventListener('click', () => {
                    highlightPath(svg, index);
                });
                
                detailSimilarity.appendChild(item);
                visibleIndex++;
            });

            // 显示面板
            detailPanel.classList.add('open');
            overlay.classList.add('show');
            if (window.innerWidth >= 769) {
                appContainer.classList.add('sidebar-open');
            }
            
            // 显示/隐藏不在列表警告
            if (!commonChars.includes(data.char)) {
                detailWarning.classList.add('show');
            } else {
                detailWarning.classList.remove('show');
            }
        }

        function highlightPath(svg, pathIndex) {
            // 移除所有高亮
            svg.querySelectorAll('path').forEach(p => {
                p.classList.remove('highlighted');
                p.style.strokeWidth = '0.5';
                p.style.stroke = 'var(--color-border-dark)';
            });
            
            // 高亮选中的路径
            const targetPath = svg.querySelector(`path[data-index="${pathIndex}"]`);
            if (targetPath) {
                targetPath.classList.add('highlighted');
                targetPath.style.strokeWidth = '3';
                targetPath.style.stroke = '#ff0000';
            }
        }

        function closeDetailPanel() {
            detailPanel.classList.remove('open');
            overlay.classList.remove('show');
            appContainer.classList.remove('sidebar-open');
        }

        // ==================== 弹窗 ====================
        function showWinModal() {
            modalTarget.textContent = targetChar;
            modalGuessCount.textContent = guessCount;
            winModal.classList.add('show');
        }

        function showLoseModal() {
            loseModalTarget.textContent = targetChar;
            loseModalGuessCount.textContent = guessCount;
            loseModal.classList.add('show');
        }

        function handleGiveUp() {
            if (gameWon) return;
            clearAutoGuessTimer();
            clearCountdown();
            
            // 更新显示为答案
            guessCountContainer.innerHTML = `答案是「<span class="answer-char">${targetChar}</span>」<br>你猜了${guessCount}次`;
            
            // 更新按钮文本为"不服"
            guessBtn.textContent = (window.t && window.t('btn_restart_lose')) || '不服';
            guessBtn.onclick = startNewGame;
            
            showLoseModal();
        }

        // ==================== 事件监听 ====================
        function setupEventListeners() {
            guessBtn.addEventListener('click', () => {
                if (isShowingResult) {
                    hideInputSvgOverlay();
                } else {
                    handleGuess();
                }
                guessInput.focus();
            });

            // 回车键全局监听，无论输入框是否禁用都响应
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    // 忽略弹窗打开时的回车
                    if (helpModal.classList.contains('show') || 
                        winModal.classList.contains('show') ||
                        loseModal.classList.contains('show')) {
                        return;
                    }
                    e.preventDefault();
                    if (isShowingResult) {
                        // 继续状态：跳过3秒等待，直接开始下一次
                        hideInputSvgOverlay();
                    } else {
                        handleGuess();
                    }
                }
            });

            guessInput.addEventListener('input', () => {
                // 如果在显示结果状态，任何输入都触发「继续」
                if (isShowingResult) {
                    const newChar = guessInput.value.slice(-1); // 取最后一个字符
                    hideInputSvgOverlay();
                    guessInput.value = newChar; // 保留新输入的字符
                    // 重新开始3秒计时器
                    resetAutoGuessTimer();
                    return;
                }
                if (guessInput.value.length > 1) {
                    guessInput.value = guessInput.value[guessInput.value.length - 1];
                }
                resetAutoGuessTimer();
            });

            detailCloseBtn.addEventListener('click', closeDetailPanel);
            overlay.addEventListener('click', closeDetailPanel);

            playAgainBtn.addEventListener('click', startNewGame);
            modalCloseBtn.addEventListener('click', () => winModal.classList.remove('show'));

            // 认输按钮
            giveUpBtn.addEventListener('click', handleGiveUp);
            losePlayAgainBtn.addEventListener('click', startNewGame);
            loseModalCloseBtn.addEventListener('click', () => loseModal.classList.remove('show'));

            // 帮助按钮
            helpBtn.addEventListener('click', () => {
                helpGotItBtn.textContent = '我知道了';
                helpModal.classList.add('show');
            });
            helpCloseBtn.addEventListener('click', () => {
                closeFirstTimeHelp();
            });
            helpGotItBtn.addEventListener('click', () => {
                closeFirstTimeHelp();
            });
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    closeFirstTimeHelp();
                }
            });

            // 主题切换：跟随系统 -> 反向 -> 跟随系统
            themeBtn.addEventListener('click', () => {
                themeState = (themeState + 1) % 3;
                applyTheme();
            });

            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                systemPrefersDark = e.matches;
                if (themeState === 0) {
                    applyTheme();
                }
            });
        }

        function applyTheme() {
            document.body.classList.remove('dark-mode', 'light-mode');
            
            // 更新图标显示
            iconAuto.classList.remove('active');
            iconLight.classList.remove('active');
            iconDark.classList.remove('active');
            
            if (themeState === 0) {
                // 跟随系统
                iconAuto.classList.add('active');
                if (systemPrefersDark) {
                    document.body.classList.add('dark-mode');
                }
            } else if (themeState === 1) {
                // 第一次点击：切换到与系统相反的主题
                if (systemPrefersDark) {
                    document.body.classList.add('light-mode');
                    iconLight.classList.add('active');
                } else {
                    document.body.classList.add('dark-mode');
                    iconDark.classList.add('active');
                }
            } else if (themeState === 2) {
                // 第二次点击：切换到与系统相同的主题（手动设置）
                if (systemPrefersDark) {
                    document.body.classList.add('dark-mode');
                    iconDark.classList.add('active');
                } else {
                    document.body.classList.add('light-mode');
                    iconLight.classList.add('active');
                }
            }
        }

        // ==================== 自动猜测计时器 ====================
        function resetAutoGuessTimer() {
            clearAutoGuessTimer();
            if (guessInput.value.trim().length === 1) {
                autoGuessTimer = setTimeout(() => {
                    if (!gameWon && guessInput.value.trim().length === 1) {
                        handleGuess();
                    }
                }, 3000);
            }
        }

        function clearAutoGuessTimer() {
            if (autoGuessTimer) {
                clearTimeout(autoGuessTimer);
                autoGuessTimer = null;
            }
        }

        // ==================== 路径处理函数 ====================
        function parseSubPathCommands(commands) {
            const subPaths = [];
            let currentCommands = [];
            let startPoint = null;
            let currentPoint = null;

            for (const cmd of commands) {
                switch (cmd.type) {
                    case 'M':
                        if (currentCommands.length > 0) {
                            subPaths.push({ commands: currentCommands, startPoint, endPoint: currentPoint });
                        }
                        currentCommands = [cmd];
                        startPoint = { x: cmd.x, y: cmd.y };
                        currentPoint = { x: cmd.x, y: cmd.y };
                        break;
                    case 'L':
                    case 'C':
                    case 'Q':
                        currentCommands.push(cmd);
                        currentPoint = { x: cmd.x, y: cmd.y };
                        break;
                    case 'Z':
                        currentCommands.push(cmd);
                        subPaths.push({ commands: currentCommands, startPoint, endPoint: startPoint, closed: true });
                        currentCommands = [];
                        currentPoint = startPoint;
                        break;
                }
            }
            if (currentCommands.length > 0) {
                subPaths.push({ commands: currentCommands, startPoint, endPoint: currentPoint });
            }
            return subPaths;
        }

        function commandsToPathString(commands) {
            let d = '';
            for (const cmd of commands) {
                switch (cmd.type) {
                    case 'M': d += `M${cmd.x} ${cmd.y}`; break;
                    case 'L': d += `L${cmd.x} ${cmd.y}`; break;
                    case 'C': d += `C${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`; break;
                    case 'Q': d += `Q${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`; break;
                    case 'Z': d += 'Z'; break;
                }
            }
            return d;
        }

        function getPointsFromCommands(commands) {
            const points = [];
            for (const cmd of commands) {
                if (cmd.x !== undefined && cmd.y !== undefined) {
                    points.push({ x: cmd.x, y: cmd.y });
                }
            }
            return points;
        }

        function distance(p1, p2) {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        }

        function connectAndSplitPaths(subPaths, gapThreshold) {
            if (gapThreshold <= 0) return subPaths;

            const result = [];
            const used = new Set();

            for (let i = 0; i < subPaths.length; i++) {
                if (subPaths[i].closed) continue;
                const pathA = subPaths[i];
                const selfDist = distance(pathA.startPoint, pathA.endPoint);
                if (selfDist < gapThreshold && selfDist > 0.1) {
                    result.push({
                        commands: [...pathA.commands, { type: 'Z' }],
                        startPoint: pathA.startPoint,
                        endPoint: pathA.startPoint,
                        closed: true
                    });
                    used.add(i);
                }
            }

            for (let i = 0; i < subPaths.length; i++) {
                if (!used.has(i)) result.push(subPaths[i]);
            }
            return result;
        }

        function extractClosedPaths(font, char, fontSize, gapThreshold) {
            const glyph = font.charToGlyph(char);
            const path = glyph.getPath(0, 0, fontSize);

            let subPaths = parseSubPathCommands(path.commands);
            subPaths = connectAndSplitPaths(subPaths, gapThreshold);

            const closedPaths = subPaths.filter(sp => sp.closed);

            return closedPaths.map(sp => {
                const points = getPointsFromCommands(sp.commands);
                const bounds = getPathBoundsLocal(points);
                return {
                    pathString: commandsToPathString(sp.commands),
                    points,
                    commands: sp.commands,
                    bounds,
                    normalizedPoints: normalizePoints(points, bounds)
                };
            });
        }

        function normalizePoints(points, bounds) {
            if (!bounds || points.length === 0) return [];
            const width = bounds.maxX - bounds.minX;
            const height = bounds.maxY - bounds.minY;
            const scale = Math.max(width, height) || 1;
            return points.map(p => ({
                x: (p.x - bounds.minX) / scale,
                y: (p.y - bounds.minY) / scale
            }));
        }

        function samplePoints(points, count) {
            if (points.length <= count) return points;
            const result = [];
            const step = points.length / count;
            for (let i = 0; i < count; i++) {
                result.push(points[Math.floor(i * step)]);
            }
            return result;
        }

        function calculatePathSimilarity(path1Points, path2Points) {
            if (path1Points.length === 0 || path2Points.length === 0) return 0;

            const sampleCount = 20;
            const sample1 = samplePoints(path1Points, sampleCount);
            const sample2 = samplePoints(path2Points, sampleCount);

            let totalDist1to2 = 0;
            for (const p1 of sample1) {
                let minDist = Infinity;
                for (const p2 of sample2) {
                    minDist = Math.min(minDist, Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2));
                }
                totalDist1to2 += minDist;
            }

            let totalDist2to1 = 0;
            for (const p2 of sample2) {
                let minDist = Infinity;
                for (const p1 of sample1) {
                    minDist = Math.min(minDist, Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2));
                }
                totalDist2to1 += minDist;
            }

            const avgDist = (totalDist1to2 + totalDist2to1) / (2 * sampleCount);
            return Math.exp(-avgDist * 5) * 100;
        }

        function compareGlyphPaths(targetPathsFiltered, sourcePathsFiltered) {
            const matchScores = new Array(sourcePathsFiltered.length).fill(0);

            for (let si = 0; si < sourcePathsFiltered.length; si++) {
                let bestScore = 0;
                for (let ti = 0; ti < targetPathsFiltered.length; ti++) {
                    const similarity = calculatePathSimilarity(
                        targetPathsFiltered[ti].normalizedPoints,
                        sourcePathsFiltered[si].normalizedPoints
                    );
                    bestScore = Math.max(bestScore, similarity);
                }
                matchScores[si] = bestScore;
            }
            return { matchScores };
        }

        function getMatchLevel(score) {
            if (score >= 99) return 'high';
            if (score >= 66) return 'medium';
            return 'low';
        }

        function getMatchColor(level) {
            switch (level) {
                case 'high': return 'var(--color-correct)';
                case 'medium': return 'var(--color-present)';
                case 'low': return 'var(--color-absent)';
                default: return 'var(--color-absent)';
            }
        }

        // ==================== 嵌套检测函数 ====================
        function determineNestingLevelsLocal(pathsData) {
            const n = pathsData.length;
            const levels = new Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i !== j && isPathContainedByLocal(pathsData[i].points, pathsData[j].points)) {
                        levels[i]++;
                    }
                }
            }
            return levels;
        }

        function isPathContainedByLocal(pathAPoints, pathBPoints) {
            const boundsA = getPathBoundsLocal(pathAPoints);
            const boundsB = getPathBoundsLocal(pathBPoints);

            if (!boundsA || !boundsB) return false;
            if (boundsA.minX < boundsB.minX || boundsA.maxX > boundsB.maxX ||
                boundsA.minY < boundsB.minY || boundsA.maxY > boundsB.maxY) {
                return false;
            }

            let insideCount = 0;
            const sampleSize = Math.min(pathAPoints.length, 10);
            const step = Math.max(1, Math.floor(pathAPoints.length / sampleSize));

            for (let i = 0; i < pathAPoints.length; i += step) {
                if (pointInPolygonLocal(pathAPoints[i], pathBPoints)) {
                    insideCount++;
                }
            }
            return insideCount > sampleSize * 0.8;
        }

        function getPathBoundsLocal(points) {
            if (!points || points.length === 0) return null;
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (const p of points) {
                minX = Math.min(minX, p.x);
                minY = Math.min(minY, p.y);
                maxX = Math.max(maxX, p.x);
                maxY = Math.max(maxY, p.y);
            }
            return { minX, minY, maxX, maxY };
        }

        function pointInPolygonLocal(point, polygon) {
            let inside = false;
            const n = polygon.length;
            for (let i = 0, j = n - 1; i < n; j = i++) {
                const xi = polygon[i].x, yi = polygon[i].y;
                const xj = polygon[j].x, yj = polygon[j].y;
                if (((yi > point.y) !== (yj > point.y)) &&
                    (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)) {
                    inside = !inside;
                }
            }
            return inside;
        }

        // ==================== SVG 创建 ====================
        function createFullGlyphSvg(paths, nestingLevels, pathColors, displaySize = 80) {
            return createFullGlyphSvgWithIds(paths, nestingLevels, pathColors, displaySize);
        }

        function createFullGlyphSvgWithIds(paths, nestingLevels, pathColors, displaySize = 80) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            paths.forEach(p => {
                minX = Math.min(minX, p.bounds.minX);
                minY = Math.min(minY, p.bounds.minY);
                maxX = Math.max(maxX, p.bounds.maxX);
                maxY = Math.max(maxY, p.bounds.maxY);
            });

            const padding = 10;
            const width = (maxX - minX) + padding * 2;
            const height = (maxY - minY) + padding * 2;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', displaySize);
            svg.setAttribute('height', displaySize);
            svg.setAttribute('viewBox', `${minX - padding} ${minY - padding} ${width} ${height}`);

            const sortedIndices = paths.map((_, i) => i).sort((a, b) => nestingLevels[a] - nestingLevels[b]);

            sortedIndices.forEach(index => {
                const pathData = paths[index];
                const { color } = pathColors[index];

                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('d', pathData.pathString);
                pathElement.setAttribute('fill', color);
                pathElement.setAttribute('stroke', 'var(--color-border-dark)');
                pathElement.setAttribute('stroke-width', '0.5');
                pathElement.setAttribute('data-index', index);
                pathElement.style.transition = 'stroke-width 0.2s, stroke 0.2s';
                svg.appendChild(pathElement);
            });

            return svg;
        }

        // ==================== 手写输入法 ====================
        // HanziLookup 原版库已通过 script 标签加载
        // Google IME 作为备选在线方案
        
        // Google IME 识别函数
        function recognizeWithOnlineIME(strokes, url, callback) {
            // 转换笔画格式: [[x1,x2,...], [y1,y2,...]] for each stroke
            const trace = strokes.map(stroke => {
                const xs = stroke.map(p => p[0]);
                const ys = stroke.map(p => p[1]);
                return [xs, ys];
            });
            
            const data = JSON.stringify({
                "options": "enable_pre_space",
                "requests": [{
                    "writing_guide": {
                        "writing_area_width": 256,
                        "writing_area_height": 256
                    },
                    "ink": trace,
                    "language": "zh_CN"
                }]
            });
            
            const xhr = new XMLHttpRequest();
            xhr.timeout = 5000; // 5秒超时
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            const response = JSON.parse(this.responseText);
                            if (response.length > 1 && response[1] && response[1][0]) {
                                const results = response[1][0][1] || [];
                                // 只保留单字结果
                                const singleChars = results.filter(r => r.length === 1).slice(0, 10);
                                callback(singleChars.map(char => ({ character: char, score: 1 })));
                            } else {
                                callback([]);
                            }
                        } catch (e) {
                            callback(null, e);
                        }
                    } else {
                        callback(null, new Error('IME 请求失败: ' + this.status));
                    }
                }
            });
            xhr.addEventListener("timeout", function() {
                callback(null, new Error('IME 请求超时'));
            });
            xhr.addEventListener("error", function() {
                callback(null, new Error('IME 网络错误'));
            });
            
            xhr.open("POST", url);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(data);
        }
        
        // 测试在线 IME 可用性
        function testOnlineIME(type) {
            const url = type === 'proxy' ? PROXY_IME_URL : GOOGLE_IME_URL;
            updateEngineStatus('testing', '测试中...');
            recognizeWithOnlineIME([[[128, 128], [128, 200]]], url, (results, error) => {
                if (error) {
                    if (type === 'proxy') {
                        proxyIMEAvailable = false;
                    } else {
                        googleIMEAvailable = false;
                    }
                    updateEngineStatus('error', '不可用');
                    // 自动回退
                    if (currentEngine === type) {
                        if (type === 'google') {
                            // Google 不可用，尝试代理
                            currentEngine = 'proxy';
                            handwriteEngineSelect.value = 'proxy';
                            if (proxyIMEAvailable === null) {
                                testOnlineIME('proxy');
                            } else if (proxyIMEAvailable) {
                                updateEngineStatus('online', '在线');
                            } else {
                                // 代理也不可用，回退到离线
                                currentEngine = 'hanzilookup';
                                handwriteEngineSelect.value = 'hanzilookup';
                                updateEngineStatus('offline', '离线');
                            }
                        } else {
                            // 代理不可用，回退到离线
                            currentEngine = 'hanzilookup';
                            handwriteEngineSelect.value = 'hanzilookup';
                            updateEngineStatus('offline', '离线');
                        }
                    }
                } else {
                    if (type === 'proxy') {
                        proxyIMEAvailable = true;
                    } else {
                        googleIMEAvailable = true;
                    }
                    updateEngineStatus('online', '在线');
                }
            });
        }
        
        // 更新引擎状态显示
        function updateEngineStatus(type, text) {
            handwriteEngineStatus.textContent = text;
            handwriteEngineStatus.className = 'handwrite-engine-status ' + type;
        }

        // 初始化手写板
        function initHandwriting() {
            handwriteCtx = handwriteCanvas.getContext('2d');
            drawCanvasGuides();
            
            // 鼠标事件
            handwriteCanvas.addEventListener('mousedown', onDrawStart);
            handwriteCanvas.addEventListener('mousemove', onDrawMove);
            handwriteCanvas.addEventListener('mouseup', onDrawEnd);
            handwriteCanvas.addEventListener('mouseleave', onDrawEnd);
            
            // 触摸事件
            handwriteCanvas.addEventListener('touchstart', onTouchStart);
            handwriteCanvas.addEventListener('touchmove', onTouchMove);
            handwriteCanvas.addEventListener('touchend', onTouchEnd);
            
            // 按钮事件
            handwriteBtn.addEventListener('click', openHandwriteModal);
            handwriteCloseBtn.addEventListener('click', closeHandwriteModal);
            handwriteUndoBtn.addEventListener('click', undoStroke);
            handwriteClearBtn.addEventListener('click', clearCanvas);
            
            // 引擎选择事件
            handwriteEngineSelect.addEventListener('change', (e) => {
                currentEngine = e.target.value;
                if (currentEngine === 'google') {
                    if (googleIMEAvailable === null) {
                        testOnlineIME('google');
                    } else if (googleIMEAvailable === false) {
                        updateEngineStatus('error', '不可用');
                    } else {
                        updateEngineStatus('online', '在线');
                    }
                } else if (currentEngine === 'proxy') {
                    if (proxyIMEAvailable === null) {
                        testOnlineIME('proxy');
                    } else if (proxyIMEAvailable === false) {
                        updateEngineStatus('error', '不可用');
                    } else {
                        updateEngineStatus('online', '在线');
                    }
                } else {
                    updateEngineStatus('offline', '离线');
                }
                // 如果有笔画，重新识别
                if (handwriteStrokes.length > 0) {
                    recognizeCharacter();
                }
            });
            
            // 点击弹窗外部关闭
            handwriteModal.addEventListener('click', (e) => {
                if (e.target === handwriteModal) {
                    closeHandwriteModal();
                }
            });
        }

        function drawCanvasGuides() {
            const ctx = handwriteCtx;
            const w = handwriteCanvas.width;
            const h = handwriteCanvas.height;
            
            ctx.clearRect(0, 0, w, h);
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-border') || '#d3d6da';
            
            // 边框
            ctx.beginPath();
            ctx.rect(0, 0, w, h);
            ctx.stroke();
            
            // 十字辅助线
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();
            
            // 对角线
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(w, h);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w, 0);
            ctx.lineTo(0, h);
            ctx.stroke();
            
            ctx.setLineDash([]);
            
            // 重绘已有笔画
            redrawStrokes();
        }

        function redrawStrokes() {
            const ctx = handwriteCtx;
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-text') || '#1a1a1b';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            for (const stroke of handwriteStrokes) {
                if (stroke.length < 2) continue;
                ctx.beginPath();
                ctx.moveTo(stroke[0][0], stroke[0][1]);
                for (let i = 1; i < stroke.length; i++) {
                    ctx.lineTo(stroke[i][0], stroke[i][1]);
                }
                ctx.stroke();
            }
        }

        function getCanvasPos(e) {
            const rect = handwriteCanvas.getBoundingClientRect();
            return [
                (e.clientX - rect.left) * (handwriteCanvas.width / rect.width),
                (e.clientY - rect.top) * (handwriteCanvas.height / rect.height)
            ];
        }

        function onDrawStart(e) {
            e.preventDefault();
            isDrawing = true;
            currentStroke = [getCanvasPos(e)];
            
            handwriteCtx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-text') || '#1a1a1b';
            handwriteCtx.lineWidth = 5;
            handwriteCtx.lineCap = 'round';
            handwriteCtx.lineJoin = 'round';
            handwriteCtx.beginPath();
            handwriteCtx.moveTo(currentStroke[0][0], currentStroke[0][1]);
        }

        function onDrawMove(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getCanvasPos(e);
            currentStroke.push(pos);
            handwriteCtx.lineTo(pos[0], pos[1]);
            handwriteCtx.stroke();
            handwriteCtx.beginPath();
            handwriteCtx.moveTo(pos[0], pos[1]);
        }

        function onDrawEnd(e) {
            if (!isDrawing) return;
            isDrawing = false;
            if (currentStroke.length > 1) {
                handwriteStrokes.push(currentStroke);
                recognizeCharacter();
            }
            currentStroke = [];
        }

        function onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            // 确保输入框不会获取焦点
            document.activeElement?.blur();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            onDrawStart(mouseEvent);
        }

        function onTouchMove(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            onDrawMove(mouseEvent);
        }

        function onTouchEnd(e) {
            e.preventDefault();
            onDrawEnd(e);
        }

        function undoStroke() {
            if (handwriteStrokes.length > 0) {
                handwriteStrokes.pop();
                drawCanvasGuides();
                if (handwriteStrokes.length > 0) {
                    recognizeCharacter();
                } else {
                    handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                }
            }
        }

        function clearCanvas() {
            handwriteStrokes = [];
            drawCanvasGuides();
            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
        }

        function openHandwriteModal() {
            handwriteModal.classList.add('show');
            
            // 让输入框失去焦点，防止在移动端弹出软键盘
            guessInput.blur();
            document.activeElement?.blur();
            
            // 更新引擎状态显示
            if (currentEngine === 'google') {
                if (googleIMEAvailable === null) {
                    testOnlineIME('google');
                } else if (googleIMEAvailable) {
                    updateEngineStatus('online', '在线');
                } else {
                    updateEngineStatus('error', '不可用');
                }
            } else if (currentEngine === 'proxy') {
                if (proxyIMEAvailable === null) {
                    testOnlineIME('proxy');
                } else if (proxyIMEAvailable) {
                    updateEngineStatus('online', '在线');
                } else {
                    updateEngineStatus('error', '不可用');
                }
            } else {
                updateEngineStatus('offline', '离线');
            }
            
            // 加载 HanziLookup 数据（如果尚未加载）
            if (!hanziLookupLoaded && !hanziLookupLoading) {
                hanziLookupLoading = true;
                if (currentEngine === 'hanzilookup') {
                    handwriteCandidates.innerHTML = '<span class="handwrite-loading">正在加载手写识别数据...</span>';
                }
                
                HanziLookup.init('mmah', 'https://cdn.jsdelivr.net/gh/gugray/HanziLookupJS@master/dist/mmah.json', function(success) {
                    hanziLookupLoading = false;
                    if (success) {
                        hanziLookupLoaded = true;
                        if (handwriteStrokes.length === 0) {
                            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                        }
                    } else {
                        if (currentEngine === 'hanzilookup') {
                            handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">基础引擎加载失败</span>';
                        }
                    }
                });
            }
            
            // 重绘画布（应用当前主题颜色）
            setTimeout(() => {
                drawCanvasGuides();
            }, 50);
        }

        function closeHandwriteModal() {
            handwriteModal.classList.remove('show');
        }

        function recognizeCharacter() {
            if (handwriteStrokes.length === 0) {
                handwriteCandidates.innerHTML = '<span class="handwrite-placeholder">在上方书写汉字</span>';
                return;
            }
            
            handwriteCandidates.innerHTML = '<span class="handwrite-loading">识别中...</span>';
            
            if (currentEngine === 'google' && googleIMEAvailable) {
                // 使用 Google 直连
                recognizeWithOnlineIME(handwriteStrokes, GOOGLE_IME_URL, (results, error) => {
                    if (error) {
                        // Google 失败，尝试代理
                        console.warn('Google 直连失败，尝试代理:', error);
                        tryProxyIME();
                    } else {
                        displayCandidates(results);
                    }
                });
            } else if (currentEngine === 'proxy' && proxyIMEAvailable) {
                // 使用代理
                tryProxyIME();
            } else {
                // 使用离线 HanziLookup
                recognizeWithHanziLookup();
            }
        }
        
        function tryProxyIME() {
            if (proxyIMEAvailable === false) {
                // 代理不可用，回退到离线
                recognizeWithHanziLookup();
                return;
            }
            recognizeWithOnlineIME(handwriteStrokes, PROXY_IME_URL, (results, error) => {
                if (error) {
                    // 代理也失败，回退到离线
                    console.warn('代理失败，回退到离线引擎:', error);
                    proxyIMEAvailable = false;
                    recognizeWithHanziLookup();
                } else {
                    displayCandidates(results);
                }
            });
        }
        
        function recognizeWithHanziLookup() {
            if (!hanziLookupLoaded) {
                handwriteCandidates.innerHTML = '<span class="handwrite-loading">正在加载基础引擎...</span>';
                return;
            }
            
            // 分析字符
            const analyzedChar = new HanziLookup.AnalyzedCharacter(handwriteStrokes);
            
            // 匹配
            const matcher = new HanziLookup.Matcher('mmah');
            matcher.match(analyzedChar, 10, function(matches) {
                displayCandidates(matches);
            });
        }

        function displayCandidates(matches) {
            if (matches.length === 0) {
                const msg = (window.t && window.t('handwrite_no_result')) || '未识别到汉字';
                handwriteCandidates.innerHTML = `<span class="handwrite-placeholder">${msg}</span>`;
                return;
            }
            
            handwriteCandidates.innerHTML = '';
            for (const match of matches) {
                const btn = document.createElement('button');
                btn.className = 'handwrite-candidate';
                btn.textContent = match.character;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectCandidate(match.character);
                });
                // 防止触摸时触发焦点变化
                btn.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                });
                handwriteCandidates.appendChild(btn);
            }
        }

        function selectCandidate(char) {
            // 填入输入框
            guessInput.value = char;
            
            // 关闭手写板
            closeHandwriteModal();
            
            // 清空手写板
            clearCanvas();
            
            // 触发输入事件，启动3秒计时器
            guessInput.dispatchEvent(new Event('input'));
            
            // 聚焦输入框
            guessInput.focus();
        }

        // ==================== 启动 ====================
        init();
        initHandwriting();
        
        // 页面加载时预先测试在线IME可用性（Google → Proxy 回退）
        testOnlineIME('google');
