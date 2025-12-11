let currentLang = localStorage.getItem('language') || (navigator.language.startsWith('zh') ? 'zh_cn' : 'en_us');
let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`./i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang}`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem('language', lang);
        updatePageText();
        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    } catch (e) {
        console.error('Error loading translations:', e);
        // Fallback to zh_cn if failed and not already zh_cn
        if (lang !== 'zh_cn') {
            loadTranslations('zh_cn');
        }
    }
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
