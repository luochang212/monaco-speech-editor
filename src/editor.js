import { state } from './state.js';
import * as monaco from 'monaco-editor';
import { easySpeak, charSpeak } from './speech.js';

// ── 语法高亮选择器 ──
var languageSelect = document.querySelector('.language-picker');

// ── Monaco 主题 ──
monaco.editor.defineTheme('myTheme', {
  base: 'vs',
  inherit: true,
  rules: [{ background: 'EDF9FA' }],
  colors: { 'editor.lineHighlightBackground': '#0000FF20' }
});
monaco.editor.setTheme('myTheme');

// ── 默认代码 ──
var htmlCode =
  '<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n<title>What time is it?<' +
  '/title>\n<style type="text/css">\n	body {\n		font-family: "Source Han Sans", "San Francisco", "PingFang SC", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "sans-serif";\n		font-size: 14px;\n		color: #333;\n	}\n	p {\n		margin: 1em 0;\n	}\n	p:empty {\n		height: 1.5em;\n	}\n	main {\n		margin: 0 5em;\n		max-width: 48em;\n	}\n	h1 {\n		margin: 1em 0;\n		font-size: 24px;\n		font-weight: 300;\n	}\n	button {\n		background: #fff;\n		border: 1px solid #ccc;\n		border-radius: 2px;\n		line-height: 1;\n		padding: .5em;\n	}\n<' +
  '/style>\n<' +
  '/head>\n\n<body>\n<main>\n		\n	<h1>What time is it?<' +
  '/h1>\n	<p>© 2019 Chang Luo<' +
  '/p>\n	<hr>\n	\n	<p>Excuse me, what time is it now O_O ???<' +
  '/p>\n	<br>\n	\n	<button type="button" onclick="document.getElementById(\'time\').innerHTML = Date()">\n		Click Me\n	<' +
  '/button>\n\n	<p id="time"><' +
  '/p>\n	\n<' +
  '/main>' +
  '\n<script' +
  ">\n	console.log('Hi there! Welcome to Monaco Speech Editor.');\n	console.log('Monaco Speech Editor is an open source web application.');\n	console.log('The repo address is https://github.com/luochang212/monaco-speech-editor');\n	console.log(\"If you like this web application or think it's useful,\");\n	console.log('could you give me a star on GitHub (●°u°●)​ 」');\n<" +
  '/script>' +
  '\n<' +
  '/body>\n<' +
  '/html>';
var noCode = '';

// ═══════════════════════════════════════════════════════════

function newEditor(container_id, code, language) {
  var model = monaco.editor.createModel(code, language);
  var editor = monaco.editor.create(document.getElementById(container_id), {
    model: model
    // fontSize: editorFontSize
    // theme: "vs-dark"
  });
  state.editorArray.push(editor);
  // console.log(editor.language);
  return editor;
}

// 语法高亮
function syntaxHighlight(langName) {
  var index = findActiveEditor();
  monaco.editor.setModelLanguage(
    monaco.editor.getModels()[index - 1],
    langName
  );
  state.fileArray[index - 1].editorLanguage = langName;
  // console.log(fileArray);
}

languageSelect.onchange = function () {
  syntaxHighlight(languageSelect.value);
  // document.getElementById('test').innerHTML = languageSelect.value;
};

// 光标位置追踪
function updateLineColumnNumber() {
  state.currentLineNumber = state.myEditor.getPosition().lineNumber;
  state.currentColumnNumber = state.myEditor.getPosition().column;
}

function showLineColumn() {
  document.getElementById('show-line-column').innerHTML =
    'Ln ' + state.currentLineNumber + ', Col ' + state.currentColumnNumber;
}

function valueChangeWithCursor() {
  var x = document.getElementById('showLineNumber');
  x.value = state.currentLineNumber;
}

function updateCursorPosition() {
  updateLineColumnNumber();
  showLineColumn();
  valueChangeWithCursor();
}

// 激活编辑器（核心：切换文件标签）
function activeEditor(index) {
  // 文件列表该文件背景高亮
  // 将当前新增文件的文件列表的li的class设为active
  // 用了此方法注意其他地方不宜再用li
  var myList = document.getElementsByTagName('LI');
  for (var i = 0; i < myList.length; i++) {
    myList[i].className = myList[i].className.replace('active', '');
  }
  document
    .getElementById('li-' + index.toString(10))
    .classList.toggle('active');

  // editor跳转
  // 被选中的文件的display设置为block，其他设为none
  var allContainer = document.getElementsByClassName('container');
  for (var i = 0; i < allContainer.length; i++) {
    allContainer[i].style.display = 'none';
  }
  // 获取container序号(int)
  document.getElementById('container-' + index.toString(10)).style.display =
    'block';

  // 将读屏功能相关的函数绑定到该active的editor上
  state.myEditor = state.fileArray[index - 1].editor;

  // 注册光标移动事件，每次移动触发更新
  var char;
  state.myEditor.onDidChangeCursorPosition(e => {
    // console.log(JSON.stringify(e));
    updateCursorPosition();
    // 输入文字时触发语音反馈 voice feedback，会念出刚刚输入的文字
    if (state.voiceFbToggole === true) {
      char = state.myEditor.getModel().getValueInRange({
        startLineNumber: state.currentLineNumber,
        startColumn: state.currentColumnNumber - 1,

        endLineNumber: state.currentLineNumber,
        endColumn: state.currentColumnNumber
      });
      easySpeak(charSpeak(char));
    }
  });

  // 遍历所有文件，isActive设为false，然后把当前激活的editor的isActive设为true
  for (var i = 0; i < state.fileArray.length; i++) {
    state.fileArray[i].isActive = 'false';
  }
  state.fileArray[index - 1].isActive = 'true';

  // 激活时题头要设为当前的文件名
  document.getElementById('editable-textarea').value =
    state.fileArray[index - 1].fileName;

  // 激活时resize窗口大小
  state.myEditor.layout();

  // 激活时语法栏要设为当前model的语言
  // 暂时没找到api
  // languageSelect.value =
  // 用取巧的办法实现
  languageSelect.value = state.fileArray[index - 1].editorLanguage;
}

function findActiveEditor() {
  // 找到当前激活的编辑器序号
  for (var i = 0; i < state.fileArray.length; i++) {
    if (state.fileArray[i].isActive == 'true') {
      var index = i + 1;
      return index;
    }
  }
  return -1;
}

export {
  newEditor,
  syntaxHighlight,
  activeEditor,
  findActiveEditor,
  updateCursorPosition,
  showLineColumn,
  valueChangeWithCursor,
  htmlCode,
  noCode,
  languageSelect
};
