import { state } from './state.js';
import * as monaco from 'monaco-editor';
import {
  play,
  doStop,
  backward,
  forward,
  speakDocument,
  cursorPosition,
  easySpeak
} from './speech.js';

export function initKeyboard() {
  // keyup event
  // 快捷键设置
  document.addEventListener('keyup', e => {
    // e.preventDefault();
    if (e.ctrlKey && e.altKey && (e.which == 80 || e.which == 13)) {
      // 播放
      // enter or p
      play();
    } else if (e.ctrlKey && e.altKey && e.which == 83) {
      // 终止
      // s
      doStop();
      state.musicToggle = false;
    } else if (e.ctrlKey && e.altKey && e.which == 38) {
      // 光标移动到下一行，并自动播放当前行
      // arrow up
      backward();
      play();
    } else if (e.ctrlKey && e.altKey && e.which == 40) {
      // 光标移动到上一行，并自动播放当前行
      // arrow down
      forward();
      play();
    } else if (e.ctrlKey && e.altKey && e.which == 65) {
      // 切换到chracter mode
      // a
      document.getElementById('character-mode-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 79) {
      // 切换到code mode
      // o
      document.getElementById('code-mode-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 77) {
      // 切换到music mode
      // m
      document.getElementById('music-mode-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 86) {
      // 切换到overview mode
      // v
      document.getElementById('overview-mode-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 74) {
      // 光标聚焦到jump to line
      // j
      document.getElementById('showLineNumber').focus();
    } else if (e.ctrlKey && e.altKey && e.which == 73) {
      // 打开linear index
      // i
      // 虽然这个失焦事件可以防止按键时光标到处跑，但当我蒙上眼睛测试以后发现，要回到焦点就真的很难
      // document.activeElement.blur();
      document.getElementById('linear-index-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 70) {
      // 打开voice feedback
      // f
      document.getElementById('voice-feedback-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 85) {
      // 打开voice cue
      // u
      document.getElementById('voice-cue-input').click();
    } else if (e.ctrlKey && e.altKey && e.which == 68) {
      // speak document
      // d
      speakDocument();
    } else if (e.ctrlKey && e.altKey && e.which == 69) {
      // 读console result
      // e
      document.getElementById('speak-console-result').click();
    } else if (e.ctrlKey && e.altKey && e.which == 76) {
      // 读console log
      // l
      document.getElementById('speak-console-log').click();
    } else if (e.ctrlKey && e.altKey && e.which == 67) {
      // 汇报光标位置
      // c
      cursorPosition();
    } else if (e.ctrlKey && e.altKey && e.which == 66) {
      // 打开console bar
      // b
      document.getElementById('console-button').click();
    } else if (e.ctrlKey && e.altKey && e.which == 82) {
      // console bar 的运行按钮
      // r
      document.getElementById('console-button-run').click();
    } else if (e.ctrlKey && e.altKey && e.which == 78) {
      // 打开夜间模式
      // n
      document.getElementById('night-mode-input').click();
    }
  });

  // 为了防止按快捷键时输入空格
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && e.which == 32) {
      // 取消对编辑器的聚焦
      // spot light
      // space
      // 虽然这个失焦事件可以防止按键时光标到处跑，但当我蒙上眼睛测试以后发现，要回到焦点就真的很难
      // document.activeElement.blur();
      document.getElementById('spot-light-input').click();
    }
  });

  // 按下enter时光标移动，从这个函数我知道了keyup和keydown的区别，这里只能用keyup
  document
    .getElementById('showLineNumber')
    .addEventListener('keyup', handleEnter);
  document
    .getElementById('showLineNumber')
    .addEventListener('change', jumpToLine);

  function jumpToLine() {
    var x = document.getElementById('showLineNumber');
    if (x.value >= 1 && x.value <= state.myEditor.getModel().getLineCount()) {
      state.currentLineNumber = x.value;
      // cursorJumpToLine is imported from speech
      state.myEditor.setSelection(
        new monaco.Selection(
          parseInt(state.currentLineNumber, 10),
          1,
          parseInt(state.currentLineNumber, 10),
          1
        )
      );
      state.myEditor.focus();
    } else {
      x.value = state.currentLineNumber;
      easySpeak('Your input is out of range');
      // alert("Input is out of range.");
    }
  }

  function handleEnter(e) {
    if (e.keyCode == 13) {
      document.getElementById('showLineNumber').blur();
    }
  }
}
