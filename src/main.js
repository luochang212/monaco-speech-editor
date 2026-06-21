import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import * as monaco from 'monaco-editor';
import 'monaco-editor/min/vs/editor/editor.main.css';

self.MonacoEnvironment = {
  getWorker: function (_workerId, label) {
    switch (label) {
      case 'json':
        return new jsonWorker();
      case 'css':
      case 'scss':
      case 'less':
        return new cssWorker();
      case 'html':
      case 'handlebars':
      case 'razor':
        return new htmlWorker();
      case 'typescript':
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker();
    }
  }
};

import { state } from './state.js';
import { t, isZh } from './i18n.js';
import {
  easySpeak,
  speakDocument,
  speakByLineFunc,
  cursorPosition,
  clickJumpToLine,
  doStop,
  play,
  backward,
  forward
} from './speech.js';
import { htmlCode } from './editor.js';
import {
  configureEditableTextarea,
  addFile,
  loadDemo,
  findDeletedFiles,
  configureDropZone,
  configureFileSelect
} from './file-manager.js';
import {
  run,
  openInNewWindow,
  openInNewTab,
  getIframeDocument,
  hideConsole,
  consoleInit
} from './console.js';
import { SLReact, createSLMember, initSpotlight } from './spotlight.js';
import { LIReact, initLinearIndex } from './linear-index.js';
import { initKeyboard } from './keyboard.js';
import {
  initVoiceCue,
  initSidebarNav,
  hideHeader,
  hideSection,
  clickLeftNav
} from './ui.js';
import { initRouter } from './router.js';

// ── 暴露给 window 的函数（原 HTML onclick 需要的全局函数） ──
window.clickLeftNav = clickLeftNav;
window.hideSection = hideSection;

// ── Check before leave website（原 app.js 第 4-10 行） ──
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = t('Do you sure');
});

// ═══════════════════════════════════════════════════════════
//                (/^▽^)/  EVENT LISTENER!
// ═══════════════════════════════════════════════════════════

document
  .getElementById('speak-document')
  .addEventListener('click', function () {
    speakDocument();
  });
document.getElementById('speak-by-line').addEventListener('click', function () {
  speakByLineFunc();
});
document.getElementById('stop-speaking').addEventListener('click', function () {
  doStop();
  state.musicToggle = false;
});
document
  .getElementById('search-cursor-position')
  .addEventListener('click', function () {
    cursorPosition();
  });
document
  .getElementById('cursor-jump-to-line')
  .addEventListener('click', function () {
    clickJumpToLine();
  });
document.getElementById('backward').addEventListener('click', function () {
  backward();
});
document.getElementById('play').addEventListener('click', function () {
  play();
});
document.getElementById('forward').addEventListener('click', function () {
  forward();
});
document.getElementById('hide-header').addEventListener('click', function () {
  hideHeader();
});
document
  .getElementById('find-deleted-files')
  .addEventListener('click', function () {
    findDeletedFiles();
  });
document.getElementById('load-demo').addEventListener('click', function () {
  loadDemo();
});
document
  .getElementById('night-mode-input')
  .addEventListener('click', function () {
    if (document.getElementById('night-mode-input').checked == true) {
      monaco.editor.setTheme('vs-dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      monaco.editor.setTheme('myTheme');
      document.documentElement.removeAttribute('data-theme');
    }
  });
document
  .getElementById('console-button')
  .addEventListener('click', function () {
    hideConsole();
    if (state.consoleToggle == 's') {
      run();
    }
  });
document
  .getElementById('console-button-run')
  .addEventListener('click', function () {
    run();
  });
document
  .getElementById('console-button-open-tab')
  .addEventListener('click', function () {
    openInNewTab();
  });
document
  .getElementById('console-button-open-window')
  .addEventListener('click', function () {
    openInNewWindow();
  });
document
  .getElementById('character-mode-input')
  .addEventListener('click', function () {
    document.getElementById('code-mode-input').checked = false;
    document.getElementById('overview-mode-input').checked = false;
    document.getElementById('music-mode-input').checked = false;
    if (document.getElementById('character-mode-input').checked === true) {
      state.modeController = 'charSpeak';
    } else {
      state.modeController = 'easySpeak';
    }
  });
document
  .getElementById('code-mode-input')
  .addEventListener('click', function () {
    document.getElementById('character-mode-input').checked = false;
    document.getElementById('overview-mode-input').checked = false;
    document.getElementById('music-mode-input').checked = false;
    if (document.getElementById('code-mode-input').checked === true) {
      state.modeController = 'codeSpeak';
    } else {
      state.modeController = 'easySpeak';
    }
  });
document
  .getElementById('music-mode-input')
  .addEventListener('click', function () {
    document.getElementById('code-mode-input').checked = false;
    document.getElementById('character-mode-input').checked = false;
    document.getElementById('overview-mode-input').checked = false;
    if (document.getElementById('music-mode-input').checked === true) {
      state.modeController = 'musicSpeak';
    } else {
      state.modeController = 'easySpeak';
    }
  });
document
  .getElementById('overview-mode-input')
  .addEventListener('click', function () {
    document.getElementById('code-mode-input').checked = false;
    document.getElementById('character-mode-input').checked = false;
    document.getElementById('music-mode-input').checked = false;
    if (document.getElementById('overview-mode-input').checked === true) {
      state.modeController = 'overSpeak';
    } else {
      state.modeController = 'easySpeak';
      state.musicToggle = false;
    }
  });
document
  .getElementById('result-area-input')
  .addEventListener('click', function () {
    document.getElementById('log-area-input').checked = false;
    if (document.getElementById('result-area-input').checked === true) {
      document.getElementById('console-result').style.width = '0';
      document.getElementById('console-log').style.left = '0';
    } else {
      document.getElementById('console-result').style.width =
        'calc((100vw - 50px)*0.6)';
      document.getElementById('console-log').style.left =
        'calc((100vw - 50px)*0.6)';
    }
  });
document
  .getElementById('log-area-input')
  .addEventListener('click', function () {
    document.getElementById('result-area-input').checked = false;
    if (document.getElementById('log-area-input').checked === true) {
      document.getElementById('console-log').style.left = '100vw';
      document.getElementById('console-result').style.width = '100%';
    } else {
      document.getElementById('console-result').style.width =
        'calc((100vw - 50px)*0.6)';
      document.getElementById('console-log').style.left =
        'calc((100vw - 50px)*0.6)';
    }
  });
document
  .getElementById('voice-feedback-input')
  .addEventListener('click', function () {
    if (document.getElementById('voice-feedback-input').checked === true) {
      state.voiceFbToggole = true;
    } else {
      state.voiceFbToggole = false;
    }
  });
document
  .getElementById('audio-tutorial')
  .addEventListener('click', function () {
    var val =
      "Welcome to Monaco Speech Editor! If you want to stop this audio, please press control, alt, and S, in windows system, or press control, option and S, on mac system. Monaco Speech Editor is an online code editor for visually impaired people. It provides several built-in functions to make it easy to read, edit and compile code. If you want to explore these features, please press control, option, and I, to open linear index.  Linear index is a feature list. When you open linear index,  please press arrow, up, or arrow down key to select the feature. Once a feature is selected, It will tell you the feature name and hotkey automatically. If you want to explore the setting of Monaco speech editor, please press control, option, and space to open spotlight. Spotlight is a list of setting. When you open spotlight, you can press arrow, up, or arrow down key to select different setting, press arrow left or arrow right key to toggle the switch. Considering that the spotlight won't tell you the status of a setting automatically when you toggle the switch. My advice is to open the voice cue. If you want to open voice cue, please open spotlight first, then press arrow left or arrow right key. If you want to quit spotlight or linear index, please press any key except direction keys. This is the end of the quick start, please enjoy yourself!";
    easySpeak(val);
  });
document
  .getElementById('open-console-input')
  .addEventListener('click', function () {
    document.getElementById('console-button').click();
  });
document
  .getElementById('speak-console-result')
  .addEventListener('click', function () {
    var doc = getIframeDocument('result-iframe');
    var content = doc.body.innerText;
    if (content == '') {
      easySpeak('console result is empty');
    } else {
      easySpeak(content);
    }
  });
document
  .getElementById('speak-console-log')
  .addEventListener('click', function () {
    var doc = getIframeDocument('log-iframe');
    var logger = doc.getElementById('logger');
    if (logger == null) {
      easySpeak('console log is empty');
    } else {
      easySpeak(logger.innerText);
    }
  });
document.getElementById('mute-input').addEventListener('click', function () {
  if (document.getElementById('mute-input').checked === true) {
    state.mute = true;
  } else {
    state.mute = false;
  }
});

// ── spotlight / linear index 方向键监听器 ──
document.addEventListener('keydown', e => {
  if (state.spotLightToggle === true) {
    SLReact(e);
  } else if (state.LinearIndexToggle === true) {
    LIReact(e);
  }
});

// ── 初始化子模块（事件监听器） ──
initSpotlight();
initLinearIndex();
initKeyboard();
initVoiceCue();
initSidebarNav();
initRouter();
consoleInit();

// ── 配置 ──
configureEditableTextarea(
  'editable-textarea',
  'textarea-modify',
  'textarea-readonly'
);
configureDropZone('myDropZone');
configureFileSelect('upload');

// ═══════════════════════════════════════════════════════════
//                    init() — 全局初始化
// ═══════════════════════════════════════════════════════════

function init() {
  state.SLArray = createSLMember(state.SLNameArray);
  addFile(htmlCode, 'html', '');
  document.getElementById('code-mode-input').click();
}

// ── i18n：如果是中文，替换 UI 文本 ──
if (isZh()) {
  document.querySelectorAll('*').forEach(function (el) {
    // 只处理叶子节点（无子元素的文本节点包装在 span/button/p/label 中）
    if (el.children.length === 0 && el.textContent && el.textContent.trim()) {
      var txt = el.textContent.trim();
      var translated = t(txt);
      if (
        translated !== txt &&
        el.tagName !== 'OPTION' &&
        el.tagName !== 'SCRIPT'
      ) {
        el.textContent = translated;
      }
    }
  });
}

init();

// document.getElementById("left-nav-button-4").click();
// document.getElementById("night-mode-input").click();
// document.getElementById("speak-document").click();
// document.getElementById("console-button").click();
// document.getElementById("code-mode-input").click();
// document.getElementById("left-nav-button-4").click();
// document.getElementById("voice-cue-input").click();
// document.getElementById("spot-light-input").click();
// document.getElementById("linear-index-input").click();
// document.getElementById("music-mode-input").click();
