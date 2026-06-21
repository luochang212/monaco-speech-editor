// ── 全局状态 ──
// 所有跨模块共享的变量。变量名保持原样，包括拼写。

export const state = {
  // 编辑器
  myEditor: null,
  editorArray: [],

  // 文件管理
  fileArray: [],
  fileCounter: 1,

  // 语音模式
  modeController: 'easySpeak',

  // Voice Feedback / Voice Cue
  voiceFbToggole: '', // '' = off, true = on（保留原拼写）
  voiceCueToggle: false,
  mute: false,

  // Music Mode
  musicToggle: false,
  musicIndex: 0,

  // Spotlight
  spotLightToggle: false,
  SLArray: null,
  SLNameArray: [
    'voice-cue-input',
    'character-mode-input',
    'code-mode-input',
    'music-mode-input',
    'overview-mode-input',
    'voice-feedback-input',
    'night-mode-input',
    'open-console-input',
    'log-area-input',
    'result-area-input'
  ],

  // Linear Index
  LinearIndexToggle: false,

  // 光标位置（行号列号追踪）
  currentLineNumber: 1,
  currentColumnNumber: 1,
  clickNumber: 0,

  // 全屏
  headerHidden: 'y',

  // 控制台
  consoleToggle: 'h',
  console_border_style: '0px none',
  console_border_color: '#bbbbbb',

  // 侧边栏
  leftSidebarStatus: 'c',
  leftSidebarSelected: '',
  leftSidebarSelect: '',

  // 焦点追踪（用于 Spotlight / Linear Index 关闭后恢复焦点）
  activePosi: null,

  // 文件重命名防冲突
  closeClickSpan: 'n',

  // ── 工具方法 ──
  findActiveEditor() {
    for (var i = 0; i < this.fileArray.length; i++) {
      if (this.fileArray[i].isActive == 'true') return i + 1;
    }
    return -1;
  }
};
