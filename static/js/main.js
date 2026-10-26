/*
Bible Plus (Bible+) by JovoL Studio. Copyright (c) 2026 JovoL Studio (its contributions).
AGPL-3.0-only with Section 7(b) attribution term; see NOTICE.md and LICENSE.
Original source: https://github.com/jovol-studio/bible-plus
*/
'use strict';
const $ = id => document.getElementById(id);
const cache = new Map();
const bibleVersions = [['cuv', '和合本'], ['rcuv', '和修本'], ['cnv', '新譯本']];
let preferredBibleVersion = 'cuv';
function syncVersionOptions(book) {
  if (bibleVersions.some(([id]) => id === $('version').value)) preferredBibleVersion = $('version').value;
  const isBible = book.index !== undefined;
  const englishOnly = isBible && $('language').value === 'en';
  $('version').replaceChildren(...(englishOnly ? [['web', 'WEB']] : isBible ? bibleVersions : [['web', book.available === false ? '尚未備妥' : '網路本']]).map(([id, label]) => option(id, label)));
  $('version').value = isBible && !englishOnly ? preferredBibleVersion : 'web';
  $('version').disabled = !isBible || englishOnly;
}
window.bible = {};
let chapters = [], english = null, chinese = null, current = 0, selected = 0, request = 0, ready = false;
const activeBook = () => books.find(book => book.id === $('book').value);
const option = (value, text) => { const el = document.createElement('option'); el.value = value; el.textContent = text; return el; };
const categoryEnglish = {
  '摩西五經': 'Pentateuch',
  '歷史書': 'Historical Books',
  '詩歌智慧書': 'Poetry and Wisdom',
  '大先知書': 'Major Prophets',
  '小先知書': 'Minor Prophets',
  '福音書': 'Gospels',
  '新約歷史書': 'New Testament History',
  '保羅書信': 'Pauline Epistles',
  '普通書信': 'General Epistles',
  '天主教及東正教增收書卷': 'Catholic and Orthodox Additional Books',
  '東正教增收書卷': 'Additional Orthodox Books',
  '舊約次經': 'Old Testament Apocrypha',
  '新約次經': 'New Testament Apocrypha',
  '典外書卷 / 偽經': 'Extra-canonical Books / Pseudepigrapha'
};
let group;
for (const book of books) {
  const groupLabel = `${book.category} · ${categoryEnglish[book.category]}`;
  if (group?.label !== groupLabel) { group = document.createElement('optgroup'); group.label = groupLabel; $('book').append(group); }
  group.append(option(book.id, `${book.name} · ${book.english}${book.available === false ? '（尚未備妥）' : ''}`));
}
async function fetchData(key, optional = false) {
  if (!cache.has(key)) {
    const response = await fetch(`static/data/${key}.json`);
    if (response.status === 404 && optional) return null;
    if (!response.ok) throw new Error(`${key}: HTTP ${response.status}`);
    cache.set(key, await response.json());
  }
  return cache.get(key);
}
function fetchBible(version) {
  const key = `bible-${version}`;
  if (!cache.has(key)) cache.set(key, new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `static/data/${version}.json`;
    script.onload = () => { script.remove(); resolve(window.bible[version]); };
    script.onerror = () => { script.remove(); cache.delete(key); reject(new Error(`無法載入 ${version}`)); };
    document.head.append(script);
  }));
  return cache.get(key);
}
function setBusy(busy) {
  ready = !busy;
  for (const id of ['chapter', 'verse', 'go', 'previous', 'next']) $(id).disabled = busy;
}
function mergeBibleChapters(zh, en) {
  const ids = [...new Set([...zh.chapters, ...(en?.chapters || [])].map(c => c.id))].sort((a, b) => Number(a) - Number(b));
  return ids.map(id => {
    const z = zh.chapters.find(c => c.id === id), e = en?.chapters.find(c => c.id === id);
    const numbers = [...new Set([...(z?.verses || []), ...(e?.verses || [])].map(v => v.number))].sort((a, b) => Number(a) - Number(b));
    return {id, label: z?.label || e.label, section: '', verses: numbers.map(number => ({number}))};
  });
}
async function loadBook(chapterId, verseNumber) {
  const ticket = ++request, book = activeBook();
  syncVersionOptions(book);
  const version = preferredBibleVersion;
  setBusy(true); chapters = []; english = chinese = null;
  $('passages').replaceChildren(); $('heading').textContent = book.name;
  $('section').textContent = ''; $('position').textContent = '';
  $('status').textContent = '載入中…'; $('source-details').replaceChildren();
  if (book.available === false) {
    current = selected = 0;
    for (const id of ['chapter', 'verse']) {
      $(id).value = '';
      $(id).setCustomValidity('');
      $(`${id}-options`).replaceChildren();
    }
    $('section').textContent = book.english;
    $('status').textContent = '內容尚未備妥。 Content not ready yet.';
    document.title = `${book.name} · Bible+`;
    renderSources(); persist();
    window.scrollTo({top: 0, behavior: 'instant'});
    return;
  }
  for (const id of ['chapter', 'verse']) {
    $(id).type = id === 'chapter' || book.index !== undefined ? 'number' : 'text';
    $(id).min = '1'; $(id).step = '1';
  }
  try {
    if (book.index !== undefined) {
      const results = await Promise.allSettled([fetchBible(version), fetchData(`web/${book.id}.en`), fetchData('chapter-labels.zh-Hant', true)]);
      if (ticket !== request) return;
      if (results[0].status === 'rejected') throw results[0].reason;
      const data = results[0].value;
      english = results[1].status === 'fulfilled' ? results[1].value : null;
      const labels = results[2].status === 'fulfilled' ? results[2].value?.books?.[book.id] : null;
      chinese = { chapters: data[book.index].map((verses, i) => ({id: String(i + 1), label: `第${i + 1}章`, section: '', shortSection: labels?.[String(i + 1)] || '', verses: verses.map((text, j) => ({number: String(j + 1), text}))})) };
      chapters = mergeBibleChapters(chinese, english);
    } else {
      const results = await Promise.allSettled([fetchData(`${book.id}.en`), fetchData(`${book.id}.zh-Hant`, true)]);
      if (ticket !== request) return;
      if (results[0].status === 'rejected') throw results[0].reason;
      english = results[0].value;
      // A missing optional translation must not block the available source text.
      // Hosts may return HTML or network errors instead of a plain 404.
      chinese = results[1].status === 'fulfilled' ? results[1].value : null;
      chapters = english.chapters;
    }
    current = Math.max(0, chapters.findIndex(c => c.id === chapterId));
    selected = Math.max(0, chapters[current].verses.findIndex(v => v.number === verseNumber));
    const usesReaderPositions = book.index === undefined && chapters.some(c => chapterValue(c) !== chapterLabel(c));
    $('chapter-options').replaceChildren(...chapters.map(c => {
      const translated = chinese?.chapters.find(z => z.id === c.id);
      const section = (translated?.shortSection || translated?.section || c.shortSection || c.section || '').trim().replace(/。+$/, '');
      const label = `第 ${chapterValue(c)} 章`;
      const sourceLabel = (translated?.label || c.label.replace(/^Chapter\s+(.+)$/i, '第$1章')).replace(/^第\s*(.*?)\s*章$/, '第$1章');
      const description = usesReaderPositions ? `${section}${sourceLabel}` : section;
      const choice = option(chapterValue(c), [label, description].filter(Boolean).join(' '));
      choice.dataset.chapterLabel = label;
      choice.dataset.section = description;
      return choice;
    }));
    setBusy(false); render();
    window.scrollTo({top: 0, behavior: 'instant'});
  } catch (error) {
    if (ticket !== request) return;
    setBusy(true);
    $('status').textContent = '無法載入書卷。請重新整理或重新選取書卷後再試，並透過本機伺服器或網站開啟此頁。';
    console.error(error);
  }
}
function persist() {
  if (activeBook().available === false) {
    history.replaceState(null, '', '#' + new URLSearchParams({book: $('book').value, language: $('language').value, size: $('size').value}));
    return;
  }
  if (!ready) return;
  history.replaceState(null, '', '#' + new URLSearchParams({book: $('book').value, chapter: chapters[current].id, verse: chapters[current].verses[selected].number, version: activeBook().index !== undefined ? preferredBibleVersion : 'web', language: $('language').value, size: $('size').value}));
}
function chapterLabel(chapter) {
  return chapter.label.replace(/^Chapter\s+/i, '');
}
function chapterValue(chapter) {
  if (activeBook().index !== undefined) return chapter.id;
  const labels = chapters.map(chapterLabel);
  const numbered = labels.every(label => /^[1-9]\d*$/.test(label)) && new Set(labels).size === labels.length;
  // Collections with repeated/lettered chapters use numeric reader positions.
  // Source labels and stable URL IDs remain unchanged.
  return numbered ? chapterLabel(chapter) : String(chapters.indexOf(chapter) + 1);
}
function inputChapter() {
  return chapters.find(c => chapterValue(c) === $('chapter').value.trim());
}
function verseValue(verse) {
  return ['preface', 'paragraph'].includes(verse.number) ? '1' : verse.number;
}
function updateVerseOptions() {
  $('chapter').setCustomValidity(''); $('verse').setCustomValidity('');
  const chapter = inputChapter();
  const chapterNumbers = chapters.map(c => Number(chapterValue(c)));
  $('chapter').min = String(Math.min(...chapterNumbers));
  $('chapter').max = String(Math.max(...chapterNumbers));
  $('verse').max = String(Math.max(1, ...(chapter?.verses || []).map(v => Number(v.number)).filter(Number.isFinite)));
  $('verse-options').replaceChildren(...(chapter?.verses || []).filter(v => v.number !== 'preface').map(v => option(verseValue(v), v.number === 'paragraph' ? '正文' : v.number)));
}
function render() {
  if (activeBook().available === false) { persist(); return; }
  if (!ready) return;
  syncVersionOptions(activeBook());
  const book = activeBook(), base = chapters[current], en = english?.chapters.find(c => c.id === base.id), zh = chinese?.chapters.find(c => c.id === base.id), mode = $('language').value;
  $('status').textContent = !en && mode !== 'zh-Hant' ? '英文尚未備妥；目前顯示中文。 English is unavailable; showing Chinese.' : !zh && mode !== 'en' ? '此章中文尚未備妥；目前顯示英文。 Chinese is unavailable for this chapter; showing English.' : '';
  $('heading').textContent = `${book.name} · ${zh?.label || base.label}`;
  $('section').textContent = book.index !== undefined
    ? mode === 'both' && en ? `${$('version').selectedOptions[0].textContent} · WEB（英式英文）`
      : mode === 'en' && en ? 'WEB · World English Bible British Edition' : $('version').selectedOptions[0].textContent
    : '網路本';
  $('chapter').value = chapterValue(base);
  $('previous').disabled = current === 0; $('next').disabled = current === chapters.length - 1;
  $('position').textContent = `${current + 1} / ${chapters.length}`;
  updateVerseOptions();
  const fragment = document.createDocumentFragment();
  base.verses.forEach((verse, i) => {
    const row = document.createElement('article'); row.className = 'passage'; row.id = `passage-${i}`;
    const ref = document.createElement('span'); ref.className = 'ref';
    ref.textContent = verse.number === 'preface' ? '序' : verse.number === 'paragraph' ? '文' : `${activeBook().index !== undefined ? base.id : chapterLabel(base)}:${verse.number}`;
    row.append(ref);
    const add = (v, lang) => {
      const p = document.createElement('p'); p.className = 'text'; p.lang = lang;
      if (v?.text?.trim()) p.textContent = v.text;
      else {
        p.classList.add('missing-text');
        p.textContent = lang === 'en' ? 'No text at this reference in the supplied English edition.' : '所選中文版本未提供此節經文。';
      }
      row.append(p);
    };
    if (mode !== 'en' || !en) add(zh?.verses.find(v => v.number === verse.number), 'zh-Hant');
    if (mode !== 'zh-Hant' || !zh) add(en?.verses.find(v => v.number === verse.number), 'en');
    if (row.children.length === 2) row.classList.add('single');
    row.addEventListener('click', () => selectPassage(i, $('size').value === 'presentation'));
    fragment.append(row);
  });
  $('passages').replaceChildren(fragment);
  selectPassage(Math.min(selected, base.verses.length - 1), false);
  renderSources();
}
function selectPassage(index, scroll = true) {
  if (!ready) return;
  selected = index;
  document.querySelector('.passage.selected')?.classList.remove('selected');
  const row = $(`passage-${index}`); row?.classList.add('selected');
  $('verse').value = verseValue(chapters[current].verses[index]);
  document.title = `${activeBook().name} ${activeBook().index !== undefined ? chapters[current].id : chapterLabel(chapters[current])}:${$('verse').value} · Bible+`;
  if (scroll) row?.scrollIntoView({block: $('size').value === 'presentation' ? 'start' : 'center', behavior: 'instant'});
  persist();
}
function renderSources() {
  const container = $('source-details'); container.replaceChildren();
  const paragraph = text => { const p = document.createElement('p'); p.textContent = text; container.append(p); };
  if (activeBook().available === false) {
    paragraph('此書目前僅列入書目，內容尚未備妥。');
    if (activeBook().catalogNote) paragraph(activeBook().catalogNote);
    return;
  }
  if (activeBook().index !== undefined) {
    paragraph(`中文版本：${bibleVersions.find(([id]) => id === preferredBibleVersion)[1]}`);
    paragraph('三個版本均從原應用程式的資料檔原樣複製。原檔未記錄來源網頁網址。');
    paragraph('英文：World English Bible British Edition（WEBPB），66 卷英式英文版，來源為 eBible.org；經文屬公版。WEB 是獨立英譯本，並非所選中文版本的英文翻譯。');
    if (english) paragraph(english.source.editionNote);
    const link = document.createElement('a');
    link.href = 'https://ebible.org/find/show.php?id=engwebpb'; link.textContent = 'WEB 原始來源與公版說明'; link.target = '_blank'; link.rel = 'noopener noreferrer';
    container.append(link);
    return;
  }
  paragraph('網路本：典外書卷的閱讀分類名稱，包含不同歷史英譯版本及 AI 中文翻譯初稿，並非單一出版譯本。');
  for (const [data, label] of [[english, '英文'], [chinese, '中文']]) {
    if (!data) continue;
    paragraph(`${label}：${data.source.credit}`);
    for (const field of ['translationNote', 'editionNote']) if (data.source[field]) paragraph(data.source[field]);
    for (const field of ['url', 'editionCheckUrl']) {
      const url = data.source[field];
      if (!url || !/^https?:\/\//.test(url)) continue;
      const p = document.createElement('p'), a = document.createElement('a'); a.href = url; a.textContent = field === 'url' ? `${label}原始來源` : '版本核對來源'; a.target = '_blank'; a.rel = 'noopener noreferrer'; p.append(a); container.append(p);
    }
  }
}
function move(delta) {
  if (!ready || current + delta < 0 || current + delta >= chapters.length) return;
  current += delta; selected = 0; render();
  if ($('size').value === 'presentation') selectPassage(0); else window.scrollTo({top:0, behavior:'instant'});
}
$('navigation').addEventListener('submit', event => {
  event.preventDefault(); if (!ready) return;
  const next = chapters.indexOf(inputChapter());
  if (next < 0) { $('chapter').setCustomValidity('請選取有效章號。'); $('chapter').reportValidity(); return; }
  const verse = chapters[next].verses.findIndex(v => v.number !== 'preface' && verseValue(v) === $('verse').value.trim());
  if (verse < 0) { $('verse').setCustomValidity('請輸入此章的原有節號，或從選項選取。'); $('verse').reportValidity(); return; }
  current = next; selected = verse; render(); selectPassage(verse); $('go').blur();
});
$('chapter').addEventListener('input', updateVerseOptions);
$('chapter').addEventListener('change', () => {
  updateVerseOptions();
  const c = inputChapter();
  if (c && !c.verses.some(v => v.number !== 'preface' && verseValue(v) === $('verse').value)) $('verse').value = verseValue(c.verses[0]);
});
$('verse').addEventListener('input', () => $('verse').setCustomValidity(''));
let pickerInput = null;
function openReferencePicker(id) {
  if (!ready || $('reference-picker').open) return;
  pickerInput = $(id);
  updateVerseOptions();
  $('picker-title').textContent = id === 'chapter' ? '選取章' : '選取節';
  const choices = [...$(`${id}-options`).options];
  const buttons = choices.map(choice => {
    const button = document.createElement('button');
    button.type = 'button';
    if (id === 'chapter') {
      button.classList.add('chapter-choice');
      const label = document.createElement('span');
      label.className = 'chapter-choice-label';
      label.textContent = choice.dataset.chapterLabel;
      button.append(label);
      if (choice.dataset.section) {
        const section = document.createElement('span');
        section.textContent = choice.dataset.section;
        button.append(section);
      }
    } else {
      button.textContent = choice.textContent === choice.value ? choice.value : `${choice.value} · ${choice.textContent}`;
    }
    if (choice.value === pickerInput.value) button.setAttribute('aria-current', 'true');
    button.addEventListener('click', () => {
      pickerInput.value = choice.value;
      pickerInput.dispatchEvent(new Event('input', {bubbles: true}));
      pickerInput.dispatchEvent(new Event('change', {bubbles: true}));
      $('reference-picker').close();
      $('navigation').requestSubmit();
    });
    return button;
  });
  $('picker-options').replaceChildren(...buttons);
  if (!buttons.length) $('picker-options').textContent = '請先輸入有效章號。';
  $('reference-picker').showModal();
  const chosen = buttons.find(button => button.hasAttribute('aria-current')) || buttons[0];
  chosen?.focus();
  chosen?.scrollIntoView({block: 'nearest'});
}
for (const id of ['chapter', 'verse']) {
  $(id).addEventListener('dblclick', () => openReferencePicker(id));
  $(id).addEventListener('keydown', event => {
    if (event.key === 'F4' || (event.altKey && event.key === 'ArrowDown')) {
      event.preventDefault(); openReferencePicker(id);
    }
  });
}
$('close-picker').addEventListener('click', () => $('reference-picker').close());
$('reference-picker').addEventListener('close', () => pickerInput?.focus());
$('reference-picker').addEventListener('click', event => {
  if (event.target !== $('reference-picker')) return;
  const rect = event.target.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
});
$('picker-options').addEventListener('keydown', event => {
  const buttons = [...$('picker-options').querySelectorAll('button')];
  const index = buttons.indexOf(document.activeElement);
  if (index < 0 || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : Math.max(0, Math.min(buttons.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)));
  buttons[next].focus();
});

$('book').addEventListener('change', () => loadBook());
$('version').addEventListener('change', () => loadBook(chapters[current]?.id, chapters[current]?.verses[selected]?.number));
$('language').addEventListener('change', render);
$('size').addEventListener('change', () => { document.body.dataset.size = $('size').value; persist(); if (ready) selectPassage(selected); });
$('previous').addEventListener('click', () => move(-1)); $('next').addEventListener('click', () => move(1));
$('info').addEventListener('click', () => $('about').showModal());
$('close-info').addEventListener('click', () => $('about').close());
$('about').addEventListener('click', event => {
  if (event.target !== $('about')) return;
  const rect = event.target.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
});
document.addEventListener('keydown', event => {
  if ($('about').open || $('reference-picker').open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'Escape' && $('size').value === 'presentation') { $('size').value = 'normal'; $('size').dispatchEvent(new Event('change')); return; }
  if (!ready || /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(event.target.tagName)) return;
  if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'ArrowLeft') move(-1);
  if (event.key === 'ArrowRight') move(1);
  if (event.key === 'ArrowUp') selectPassage(Math.max(0, selected - 1));
  if (event.key === 'ArrowDown') selectPassage(Math.min(chapters[current].verses.length - 1, selected + 1));
});
async function restore() {
  const params = new URLSearchParams(location.hash.slice(1));
  const legacyEzraStart = {'4-ezra': '3', '5-ezra': '1', '6-ezra': '15'}[params.get('book')];
  if (legacyEzraStart) {
    params.set('book', '2-esdras');
    if (!params.has('chapter')) params.set('chapter', legacyEzraStart);
  }
  $('book').value = books.some(b => b.id === params.get('book')) ? params.get('book') : books[0].id;
  preferredBibleVersion = bibleVersions.some(([id]) => id === params.get('version')) ? params.get('version') : preferredBibleVersion;
  $('version').value = '';
  syncVersionOptions(activeBook());
  for (const [id, fallback] of [['language','zh-Hant'], ['size','normal']]) $(id).value = [...$(id).options].some(o => o.value === params.get(id)) ? params.get(id) : fallback;
  document.body.dataset.size = $('size').value;
  await loadBook(params.get('chapter'), params.get('verse'));
  if (ready && (params.has('verse') || $('size').value === 'presentation')) selectPassage(selected);
}
new ResizeObserver(() => document.documentElement.style.setProperty('--controls-height', `${$('controls').offsetHeight}px`)).observe($('controls'));
new ResizeObserver(() => document.documentElement.style.setProperty('--reading-header-height', `${$('reading-header').offsetHeight}px`)).observe($('reading-header'));
window.addEventListener('hashchange', restore);
restore();
