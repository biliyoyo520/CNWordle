const embeddedTranslations = {
    "zh_cn": {
        "title": "汉字 Wordle",
        "loading_font": "正在加载字体...",
        "loading_complete": "加载完成!",
        "loading_error": "字体加载失败，请刷新页面",
        "loading_timeout_warning": "加载时间较长？尝试<a href='javascript:location.reload()'>刷新页面</a>或<a href='https://github.com/biliyoyo520/CNWordle/issues' target='_blank' rel='noopener'>反馈问题</a>",
        "checking_cache": "正在检查缓存...",
        "loading_cached_font": "正在加载缓存字体...",
        "downloading_font": "正在下载字体...",
        "parsing_font": "正在解析字体...",
        "header_title": "汉字 Wordle",
        "guess_count_prefix": "第",
        "guess_count_suffix": "次",
        "btn_guess": "猜",
        "btn_hint": "提示",
        "btn_give_up": "认输",
        "btn_handwrite": "✏️ 手写",
        "legend_exact": "完全匹配",
        "legend_partial": "部分相似",
        "legend_none": "不匹配",
        "detail_title": "详情",
        "detail_warning": "⚠️ 该字不在答案列表中",
        "charlist_title": "📋 答案列表",
        "help_title": "🎯 如何游戏",
        "help_intro": "猜出隐藏的汉字！每次猜测后，系统会把你的字拆成字体里的封闭图形，再和答案逐块比较。它不是传统偏旁部首游戏，更像把汉字拆成一盒彩色拼图。",
        "help_colorblind_default": "👁️ 我猜你看不清楚颜色，已经帮你默认打开色盲模式。如果你觉得你可以，点击左上角「眼睛」图标即可关闭。",
        "help_goal_title": "你要做什么",
        "help_goal_1": "⌨️ 输入或手写一个汉字。",
        "help_goal_2": "🧩 看它拆出来的每个字形分块。",
        "help_goal_3": "🌈 根据渐变颜色判断哪些分块接近答案。",
        "help_goal_4": "💡 卡住了就点「提示」，可以一直点，别有心理负担。",
        "help_color_title": "颜色渐变",
        "help_color_exact": "越接近这个颜色：越像答案的某个分块（≥99% 几乎就是它）",
        "help_color_partial": "中间色：有点像，但还没贴上答案的脸（66%-99%）",
        "help_color_none": "越接近这个颜色：基本不像，建议换个方向（<66%）",
        "help_border_title": "边框含义",
        "help_border_green": "• <strong style=\"color: var(--color-correct)\">绿色边框</strong>：恭喜！你猜对了！",
        "help_border_yellow": "• <strong style=\"color: var(--color-present)\">黄色边框</strong>：这个字不在目标词库中",
        "help_action_title": "操作方式",
        "help_action_1": "⌨️ 输入汉字后，按 Enter 或点击「猜」提交；懒得按也行，3 秒后会自动猜。",
        "help_action_2": "✏️ 不会打字？点「手写」，写完后点候选字填入输入框。",
        "help_action_3": "🕵️ 点击下方历史格子，可以放大查看每一块到底像不像。",
        "help_action_4": "📖 左上角书本是答案字典；真的卡死了可以偷看，但我会假装没看见。",
        "btn_got_it": "我知道了",
        "btn_confused": "我看不懂",
        "win_title": "🎉 你赢了！",
        "win_message": "你用了 <strong id=\"modalGuessCount\">{0}</strong> 次猜测找到了答案！<br>提示了 <strong id=\"modalHintCount\">{1}</strong> 次",
        "btn_play_again": "再来一局",
        "btn_restart_win": "再来",
        "btn_restart_lose": "不服",
        "lose_title": "😔 认输了",
        "lose_message": "答案是上面这个字，你猜了 <strong id=\"loseModalGuessCount\">{0}</strong> 次<br>提示了 <strong id=\"loseModalHintCount\">{1}</strong> 次",
        "handwrite_title": "✏️ 手写输入",
        "engine_label": "识别引擎:",
        "engine_basic": "基础 (离线)",
        "engine_proxy": "代理 (在线)",
        "engine_google": "Google (直连)",
        "engine_status_ready": "就绪",
        "btn_undo": "撤销",
        "btn_clear": "清空",
        "handwrite_placeholder": "在上方书写汉字",
        "handwrite_loading_data": "正在加载手写识别数据...",
        "handwrite_error_basic": "基础引擎加载失败",
        "handwrite_recognizing": "识别中...",
        "handwrite_no_result": "未识别到汉字",
        "status_testing": "测试中...",
        "status_unavailable": "不可用",
        "status_online": "在线",
        "status_offline": "离线",
        "btn_continue": "继续",
        "give_up_answer": "答案是「<span class=\"answer-char\">{0}</span>」<br>你猜了{1}次"
    },
    "en_us": {
        "title": "Hanzi Wordle",
        "loading_font": "Loading fonts...",
        "loading_complete": "Loaded!",
        "loading_error": "Font loading failed, please refresh.",
        "loading_timeout_warning": "Taking too long? Try <a href='javascript:location.reload()'>refreshing</a> or <a href='https://github.com/biliyoyo520/CNWordle/issues' target='_blank' rel='noopener'>report an issue</a>",
        "checking_cache": "Checking cache...",
        "loading_cached_font": "Loading cached font...",
        "downloading_font": "Downloading fonts...",
        "parsing_font": "Parsing fonts...",
        "header_title": "Hanzi Wordle",
        "guess_count_prefix": "Guess",
        "guess_count_suffix": "",
        "btn_guess": "Guess",
        "btn_hint": "Hint",
        "btn_give_up": "Give Up",
        "btn_handwrite": "✏️ Draw",
        "legend_exact": "Exact Match",
        "legend_partial": "Partial Match",
        "legend_none": "No Match",
        "detail_title": "Details",
        "detail_warning": "⚠️ Character not in result list",
        "charlist_title": "📋 Answer List",
        "help_title": "🎯 How to Play",
        "help_intro": "Guess the hidden Hanzi. After each guess, the game breaks your character into closed font shapes and compares them with the answer piece by piece. It is not a traditional radical quiz; it is more like a tiny box of colorful Hanzi puzzle pieces.",
        "help_colorblind_default": "👁️ I guessed you might not love these colors, so color-blind mode is on by default. If you are built different, click the eye icon in the top-left to turn it off.",
        "help_goal_title": "What to do",
        "help_goal_1": "⌨️ Type or handwrite one Hanzi.",
        "help_goal_2": "🧩 Look at the font-decomposed pieces.",
        "help_goal_3": "🌈 Use the gradient colors to see which pieces are close.",
        "help_goal_4": "💡 Stuck? Press Hint as much as you want. No moral judgment from the button.",
        "help_color_title": "Color Gradients",
        "help_color_exact": "Closer to this color: more like an answer piece (≥99% is basically it)",
        "help_color_partial": "Middle color: similar, but not quite wearing the answer's face yet (66%-99%)",
        "help_color_none": "Closer to this color: probably unrelated; try another direction (<66%)",
        "help_border_title": "Borders",
        "help_border_green": "• <strong style=\"color: var(--color-correct)\">Green Border</strong>: Correct!",
        "help_border_yellow": "• <strong style=\"color: var(--color-present)\">Yellow Border</strong>: Not in target list",
        "help_action_title": "Controls",
        "help_action_1": "⌨️ Type a Hanzi, then press Enter or Guess. If you are lazy, it auto-guesses after 3 seconds.",
        "help_action_2": "✏️ Cannot type it? Press Draw, write it, then tap a candidate.",
        "help_action_3": "🕵️ Click history tiles to inspect every piece in detail.",
        "help_action_4": "📖 The book icon opens the answer dictionary. If you peek, I will pretend not to notice.",
        "btn_got_it": "Got it",
        "btn_confused": "I don't get it",
        "win_title": "🎉 You Won!",
        "win_message": "You found the answer in <strong id=\"modalGuessCount\">{0}</strong> guesses!<br>Hints used: <strong id=\"modalHintCount\">{1}</strong>",
        "btn_play_again": "Play Again",
        "btn_restart_win": "Again",
        "btn_restart_lose": "Rematch",
        "lose_title": "😔 Game Over",
        "lose_message": "The answer was the character above. You guessed <strong id=\"loseModalGuessCount\">{0}</strong> times.<br>Hints used: <strong id=\"loseModalHintCount\">{1}</strong>",
        "handwrite_title": "✏️ Handwriting",
        "engine_label": "Engine:",
        "engine_basic": "Basic (Offline)",
        "engine_proxy": "Proxy (Online)",
        "engine_google": "Google (Direct)",
        "engine_status_ready": "Ready",
        "btn_undo": "Undo",
        "btn_clear": "Clear",
        "handwrite_placeholder": "Write here",
        "handwrite_loading_data": "Loading handwriting data...",
        "handwrite_error_basic": "Basic engine failed",
        "handwrite_recognizing": "Recognizing...",
        "handwrite_no_result": "No result",
        "status_testing": "Testing...",
        "status_unavailable": "Unavailable",
        "status_online": "Online",
        "status_offline": "Offline",
        "btn_continue": "Continue",
        "give_up_answer": "Answer: \"<span class=\"answer-char\">{0}</span>\"<br>Guesses: {1}"
    }
};
let currentLang = localStorage.getItem('language') || (navigator.language.startsWith('zh') ? 'zh_cn' : 'en_us');
let translations = {};

async function loadTranslations(lang) {
    try {
        if (location.protocol === 'file:') {
            applyTranslations(lang, embeddedTranslations[lang]);
            return;
        }

        const response = await fetch(`./i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang}`);
        applyTranslations(lang, await response.json());
    } catch (e) {
        console.error('Error loading translations:', e);
        if (embeddedTranslations[lang]) {
            applyTranslations(lang, embeddedTranslations[lang]);
            return;
        }
        if (lang !== 'zh_cn') {
            loadTranslations('zh_cn');
        }
    }
}

function applyTranslations(lang, loadedTranslations) {
    translations = loadedTranslations || embeddedTranslations.zh_cn;
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageText();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

function t(key, ...args) {
    let text = translations[key];
    if (text === undefined) return null;
    args.forEach((arg, i) => {
        text = text.replace(`{${i}}`, arg);
    });
    return text;
}

// Expose t to window
window.t = t;
window.getCurrentLanguage = () => currentLang;

function updatePageText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.placeholder = translations[key];
            } else {
                el.innerHTML = translations[key];
            }
        }
    });
    
    // Update title
    if (translations['title']) {
        document.title = translations['title'];
    }
    
    // Update html lang attribute
    document.documentElement.lang = currentLang === 'zh_cn' ? 'zh-CN' : 'en-US';
    
    // Update language button icon
    const langIcon = document.getElementById('langIcon');
    if (langIcon) {
        langIcon.textContent = currentLang === 'zh_cn' ? 'En' : '中';
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'zh_cn' ? 'en_us' : 'zh_cn';
    loadTranslations(newLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});
