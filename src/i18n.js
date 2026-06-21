// ── 国际化字典 ──
// zh-cn.html 与 index.html 的文本差异

const zh = {
  // 侧边栏顶部标题
  Explorer: '探索',
  Upload: '上传',
  'Feature List': '功能',
  Setting: '设置',

  // 导航按钮
  'File manager': '文件管理',
  Demo: '示例',
  Tutorial: '教程',
  'Speech Synthesis': '语音合成',
  'Cursor Position': '光标位置',
  Trash: '垃圾桶',
  Voice: '声音',
  Mode: '朗读模式',
  Accessibility: '辅助功能',
  Theme: '主题',
  Console: '控制台选项',

  // 朗读按钮
  'Speak Document': '朗读全文',
  'Speak By Line': '朗读段落',
  'Speak Console Result': '朗读网页区内容',
  'Speak Console Log': '朗读log区内容',
  'Stop Speaking': '停止朗读',
  'Search Cursor Position': '汇报光标位置',
  'Cursor Jump To Line': '跳转光标位置',
  'Find Deleted Files': '找回删除的内容',

  // 示例和教程
  'Load Demo': '导入示例',
  'Quick Start': '播放教程',
  'You can load demos from a JSON file.': '你可以从JSON文件里导入示例文件。',
  'Listen to the features of this application.': '点击按钮播放语音教程。',

  // 上传
  'Drop your file here': '把文件拖到这里',

  // 模式
  'Character Mode': '字符模式',
  'Code Mode': '代码模式',
  'Music Mode': '音乐模式',
  'Overview Mode': '概述模式',

  // 辅助功能
  'Voice Feedback': '语音反馈',
  'Voice Cue': '语音提示',
  Spotlight: '辅助切换',
  'Linear Index': '线性索引',
  'Night Mode': '夜间模式',
  Mute: '静音',

  // 控制台
  'Console Bar': '打开控制台',
  'Hide Console Log Area': '隐藏log区',
  'Hide Rendering Result Area': '隐藏网页区',

  // 控制台按钮
  Run: '运行',
  'Open In New Window': '在新窗口中打开',
  'Open In New Tab': '在新标签页中打开',

  // 离开确认
  'Do you sure': '确定要离开吗？'
};

const lang =
  new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';

export function t(text) {
  if (lang === 'zh' && zh[text]) {
    return zh[text];
  }
  return text;
}

export function isZh() {
  return lang === 'zh';
}
