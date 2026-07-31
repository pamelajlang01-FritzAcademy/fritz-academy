(() => {
  'use strict';

  const MAX_HISTORY = 12;
  const HISTORY_KEY = 'fritzTranslatorHistoryV1';
  const API_ENDPOINT = 'https://api.mymemory.translated.net/get';

  const languageNames = {
    en: 'English',
    'zh-CN': '简体中文'
  };

  const quickPhrases = [
    'Please read this sentence.',
    'What does this word mean?',
    'Please speak slowly.',
    'Can you say that again?',
    'Do you understand?',
    'Great job!',
    '请慢一点说。',
    '我不明白。',
    '请再说一遍。',
    '这个单词是什么意思？'
  ];

  const elements = {
    sourceLanguage: document.getElementById('sourceLanguage'),
    targetLanguage: document.getElementById('targetLanguage'),
    swapButton: document.getElementById('swapButton'),
    sourceHeading: document.getElementById('sourceHeading'),
    targetHeading: document.getElementById('targetHeading'),
    sourceText: document.getElementById('sourceText'),
    translatedText: document.getElementById('translatedText'),
    characterCount: document.getElementById('characterCount'),
    translateButton: document.getElementById('translateButton'),
    speakSourceButton: document.getElementById('speakSourceButton'),
    speakTargetButton: document.getElementById('speakTargetButton'),
    clearButton: document.getElementById('clearButton'),
    copyButton: document.getElementById('copyButton'),
    quickPhraseButtons: document.getElementById('quickPhraseButtons'),
    historyList: document.getElementById('historyList'),
    clearHistoryButton: document.getElementById('clearHistoryButton'),
    translationStatus: document.getElementById('translationStatus'),
    connectionStatus: document.getElementById('connectionStatus')
  };

  let voices = [];
  let history = loadHistory();

  function loadVoices() {
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  }

  function loadHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : [];
    } catch {
      return [];
    }
  }

  function saveHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  }

  function setStatus(message, type = '') {
    elements.translationStatus.textContent = message;
    elements.translationStatus.classList.remove('error', 'success');
    if (type) elements.translationStatus.classList.add(type);
  }

  function setConnection(message, type = '') {
    elements.connectionStatus.textContent = message;
    elements.connectionStatus.classList.remove('error', 'success');
    if (type) elements.connectionStatus.classList.add(type);
  }

  function updateLanguageLabels() {
    const source = elements.sourceLanguage.value;
    const target = elements.targetLanguage.value;
    elements.sourceHeading.textContent = languageNames[source];
    elements.targetHeading.textContent = languageNames[target];
    elements.sourceText.placeholder = source === 'en' ? 'Type English here…' : '在这里输入中文…';
  }

  function updateCharacterCount() {
    elements.characterCount.textContent = `${elements.sourceText.value.length} / 500`;
  }

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function decodeHtml(value) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
  }

  async function translateText() {
    const sourceText = normalizeText(elements.sourceText.value);
    if (!sourceText) {
      setStatus('Enter text first.', 'error');
      elements.sourceText.focus();
      return;
    }

    const sourceLanguage = elements.sourceLanguage.value;
    const targetLanguage = elements.targetLanguage.value;
    if (sourceLanguage === targetLanguage) {
      setStatus('Choose two different languages.', 'error');
      return;
    }

    elements.translateButton.disabled = true;
    setStatus('Translating…');
    setConnection('Connecting…');

    try {
      const params = new URLSearchParams({
        q: sourceText,
        langpair: `${sourceLanguage}|${targetLanguage}`
      });
      const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Translation service returned ${response.status}.`);
      const data = await response.json();
      const translated = decodeHtml(data?.responseData?.translatedText || '');
      if (!translated || data?.responseStatus >= 400) {
        throw new Error(data?.responseDetails || 'No translation was returned.');
      }

      elements.translatedText.textContent = translated;
      elements.translatedText.classList.remove('placeholder');
      setStatus('Translated', 'success');
      setConnection('Online', 'success');

      history.unshift({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sourceLanguage,
        targetLanguage,
        sourceText,
        translatedText: translated,
        createdAt: new Date().toISOString()
      });
      history = history.slice(0, MAX_HISTORY);
      saveHistory();
      renderHistory();
    } catch (error) {
      console.error('Translation failed:', error);
      setStatus('Translation unavailable. Please try again.', 'error');
      setConnection('Service unavailable', 'error');
    } finally {
      elements.translateButton.disabled = false;
    }
  }

  function chooseVoice(language) {
    const wanted = language === 'zh-CN' ? ['zh-CN', 'zh_CN', 'cmn-CN', 'zh'] : ['en-US', 'en_US', 'en'];
    return voices.find(voice => wanted.some(code => voice.lang?.toLowerCase() === code.toLowerCase())) ||
      voices.find(voice => wanted.some(code => voice.lang?.toLowerCase().startsWith(code.toLowerCase().split('-')[0]))) ||
      null;
  }

  function speak(text, language) {
    const cleanText = normalizeText(text);
    if (!cleanText) {
      setStatus('There is nothing to speak.', 'error');
      return;
    }
    if (!('speechSynthesis' in window)) {
      setStatus('Speech is not supported in this browser.', 'error');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'zh-CN' ? 'zh-CN' : 'en-US';
    utterance.rate = language === 'zh-CN' ? 0.82 : 0.88;
    utterance.pitch = 1;
    const voice = chooseVoice(language);
    if (voice) utterance.voice = voice;
    utterance.onerror = () => setStatus('Speech could not play on this device.', 'error');
    window.speechSynthesis.speak(utterance);
  }

  async function copyTranslation() {
    const text = normalizeText(elements.translatedText.textContent);
    if (!text || text === 'Your translation will appear here.') {
      setStatus('There is no translation to copy.', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setStatus('Copied', 'success');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(elements.translatedText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setStatus('Selected. Use Copy from your device menu.', 'success');
    }
  }

  function clearTranslator() {
    window.speechSynthesis?.cancel();
    elements.sourceText.value = '';
    elements.translatedText.textContent = 'Your translation will appear here.';
    elements.translatedText.classList.add('placeholder');
    setStatus('Waiting');
    updateCharacterCount();
    elements.sourceText.focus();
  }

  function swapLanguages() {
    const oldSource = elements.sourceLanguage.value;
    elements.sourceLanguage.value = elements.targetLanguage.value;
    elements.targetLanguage.value = oldSource;

    const oldTranslation = normalizeText(elements.translatedText.textContent);
    if (oldTranslation && oldTranslation !== 'Your translation will appear here.') {
      const oldSourceText = elements.sourceText.value;
      elements.sourceText.value = oldTranslation;
      elements.translatedText.textContent = oldSourceText || 'Your translation will appear here.';
      elements.translatedText.classList.toggle('placeholder', !oldSourceText);
    }

    updateLanguageLabels();
    updateCharacterCount();
    setStatus('Languages swapped');
  }

  function autoChooseDirection(text) {
    const containsChinese = /[\u3400-\u9fff]/.test(text);
    if (containsChinese) {
      elements.sourceLanguage.value = 'zh-CN';
      elements.targetLanguage.value = 'en';
    } else {
      elements.sourceLanguage.value = 'en';
      elements.targetLanguage.value = 'zh-CN';
    }
    updateLanguageLabels();
  }

  function renderQuickPhrases() {
    elements.quickPhraseButtons.innerHTML = '';
    quickPhrases.forEach(phrase => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = phrase;
      button.addEventListener('click', () => {
        elements.sourceText.value = phrase;
        autoChooseDirection(phrase);
        updateCharacterCount();
        translateText();
      });
      elements.quickPhraseButtons.appendChild(button);
    });
  }

  function renderHistory() {
    elements.historyList.innerHTML = '';
    if (!history.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No translations saved in this browser yet.';
      elements.historyList.appendChild(empty);
      return;
    }

    history.forEach(item => {
      const card = document.createElement('article');
      card.className = 'history-card';
      card.innerHTML = `
        <div class="direction">${languageNames[item.sourceLanguage]} → ${languageNames[item.targetLanguage]}</div>
        <p><strong>${escapeHtml(item.sourceText)}</strong></p>
        <p>${escapeHtml(item.translatedText)}</p>
      `;
      card.addEventListener('click', () => {
        elements.sourceLanguage.value = item.sourceLanguage;
        elements.targetLanguage.value = item.targetLanguage;
        elements.sourceText.value = item.sourceText;
        elements.translatedText.textContent = item.translatedText;
        elements.translatedText.classList.remove('placeholder');
        updateLanguageLabels();
        updateCharacterCount();
        setStatus('Loaded from history', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      elements.historyList.appendChild(card);
    });
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  elements.sourceText.addEventListener('input', () => {
    updateCharacterCount();
    if (elements.sourceText.value.length === 1) autoChooseDirection(elements.sourceText.value);
  });
  elements.sourceText.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') translateText();
  });
  elements.sourceLanguage.addEventListener('change', updateLanguageLabels);
  elements.targetLanguage.addEventListener('change', updateLanguageLabels);
  elements.swapButton.addEventListener('click', swapLanguages);
  elements.translateButton.addEventListener('click', translateText);
  elements.speakSourceButton.addEventListener('click', () => speak(elements.sourceText.value, elements.sourceLanguage.value));
  elements.speakTargetButton.addEventListener('click', () => speak(elements.translatedText.textContent, elements.targetLanguage.value));
  elements.clearButton.addEventListener('click', clearTranslator);
  elements.copyButton.addEventListener('click', copyTranslation);
  elements.clearHistoryButton.addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
    setStatus('History cleared', 'success');
  });

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  elements.translatedText.classList.add('placeholder');
  updateLanguageLabels();
  updateCharacterCount();
  renderQuickPhrases();
  renderHistory();
})();
