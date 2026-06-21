import { state } from './state.js';
import * as monaco from 'monaco-editor';

// ── 语音合成全局（模块内） ──

var synth = window.speechSynthesis;
var inputTxt = '';
var pauseResume = 'R';
var speechId = 0;
var voiceSelect = document.querySelector('.voice-select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};

// ═══════════════════════════════════════════════════════════
//                         (/^▽^)/
//                      SPEECH SYNTHESIS!
// ═══════════════════════════════════════════════════════════

function easySpeak(val) {
  doStop();
  inputTxt = val;
  speak();
}

// character mode
function charSpeak(val) {
  var res = '';
  for (var i = 0; i < val.length; i++) {
    var temp = val[i];
    switch (temp) {
      case ' ':
        temp = 'space';
        break;
      case '!':
        temp = 'exclamation mark';
        break;
      case '\"':
        temp = 'quotation mark';
        break;
      case '#':
        temp = 'number sign';
        break;
      case '$':
        temp = 'dollar sign';
        break;
      case '%':
        temp = 'percent sign';
        break;
      case '&':
        temp = 'ampersand';
        break;
      case "'":
        temp = 'apostrophe';
        break;
      case '(':
        temp = 'left parenthesis';
        break;
      case ')':
        temp = 'right parenthesis';
        break;
      case '*':
        temp = 'asterisk';
        break;
      case '+':
        temp = 'plus sign';
        break;
      case ',':
        temp = 'comma';
        break;
      case '-':
        temp = 'hyphen';
        break;
      case '.':
        temp = 'full stop';
        break;
      case '/':
        temp = 'solidus';
        break;
      case ':':
        temp = 'colon';
        break;
      case ';':
        temp = 'semicolon';
        break;
      case '<':
        temp = 'less than sign';
        break;
      case '=':
        temp = 'equals sign';
        break;
      case '>':
        temp = 'greater than sign';
        break;
      case '?':
        temp = 'question mark';
        break;
      case '@':
        temp = 'at sign';
        break;
      case 'A':
        temp = 'capital a';
        break;
      case 'B':
        temp = 'capital b';
        break;
      case 'C':
        temp = 'capital c';
        break;
      case 'D':
        temp = 'capital d';
        break;
      case 'E':
        temp = 'capital e';
        break;
      case 'F':
        temp = 'capital f';
        break;
      case 'G':
        temp = 'capital g';
        break;
      case 'H':
        temp = 'capital h';
        break;
      case 'I':
        temp = 'capital i';
        break;
      case 'J':
        temp = 'capital j';
        break;
      case 'K':
        temp = 'capital k';
        break;
      case 'L':
        temp = 'capital l';
        break;
      case 'M':
        temp = 'capital m';
        break;
      case 'N':
        temp = 'capital n';
        break;
      case 'O':
        temp = 'capital o';
        break;
      case 'P':
        temp = 'capital p';
        break;
      case 'Q':
        temp = 'capital q';
        break;
      case 'R':
        temp = 'capital r';
        break;
      case 'S':
        temp = 'capital s';
        break;
      case 'T':
        temp = 'capital t';
        break;
      case 'U':
        temp = 'capital u';
        break;
      case 'V':
        temp = 'capital v';
        break;
      case 'W':
        temp = 'capital w';
        break;
      case 'X':
        temp = 'capital x';
        break;
      case 'Y':
        temp = 'capital y';
        break;
      case 'Z':
        temp = 'capital z';
        break;
      case '[':
        temp = 'left square bracket';
        break;
      case '\\':
        temp = 'reverse solidus';
        break;
      case ']':
        temp = 'right square bracket';
        break;
      case '^':
        temp = 'circumflex accent';
        break;
      case '_':
        temp = 'low line';
        break;
      case '`':
        temp = 'grave accent';
        break;
      case '{':
        temp = 'left curly bracket';
        break;
      case '|':
        temp = 'vertical line';
        break;
      case '}':
        temp = 'right curly bracket';
        break;
      case '~':
        temp = 'tilde';
        break;
      default:
        temp = val[i];
    }
    res += temp + ' ';
  }
  return res;
}

// code mode
function codeSpeak(val) {
  // important symbols won't be ignored
  // 重要的符号不省略
  // 部分采取charSpeak的策略，但是没有在每个字符之间都加空格，只在转成文字的符号前后加了空格
  var res = '';
  for (var i = 0; i < val.length; i++) {
    var temp = val[i];
    switch (temp) {
      case '!':
        temp = ' exclamation ';
        break;
      case '\"':
        temp = ' quotation ';
        break;
      case '#':
        temp = ' number sign ';
        break;
      case '$':
        temp = ' dollar sign ';
        break;
      case '%':
        temp = ' percent ';
        break;
      case '&':
        temp = ' ampersand ';
        break;
      case "'":
        temp = ' apostrophe ';
        break;
      case '(':
        temp = ' left parenthesis ';
        break;
      case ')':
        temp = ' right parenthesis ';
        break;
      case '*':
        temp = ' asterisk ';
        break;
      case '+':
        temp = ' plus ';
        break;
      case ',':
        temp = ' comma ';
        break;
      case '-':
        temp = ' hyphen ';
        break;
      case '.':
        temp = ' full stop ';
        break;
      case '/':
        temp = ' solidus ';
        break;
      case ':':
        temp = ' colon ';
        break;
      case ';':
        temp = ' semicolon ';
        break;
      case '<':
        temp = ' less than ';
        break;
      case '=':
        temp = ' equals ';
        break;
      case '>':
        temp = ' greater than ';
        break;
      case '?':
        temp = ' question mark ';
        break;
      case '@':
        temp = ' at ';
        break;
      case '[':
        temp = ' left square bracket ';
        break;
      case '\\':
        temp = ' reverse solidus ';
        break;
      case ']':
        temp = ' right square bracket ';
        break;
      case '^':
        temp = ' circumflex accent ';
        break;
      case '_':
        temp = ' low line ';
        break;
      case '`':
        temp = ' grave accent ';
        break;
      case '{':
        temp = ' left curly bracket ';
        break;
      case '|':
        temp = ' vertical line ';
        break;
      case '}':
        temp = ' right curly bracket ';
        break;
      case '~':
        temp = ' tilde ';
        break;
      default:
        temp = val[i];
    }
    res += temp;
  }
  return res;
}

// code music mode
// 构造一种数据类型
// false: 不是符号
// true: 是符号
var Word = {
  value: '',
  isSymbol: false
};

function findSymbolIndex(val) {
  // 文本预处理
  // 当遇到一个符号时，返回符号在val中的index，然后再在符号的前后进行切割，再把切割后的代码段存放进数组里
  var symbolIndex;
  var symbolIndexArr = [];
  var temp;
  for (var i = 0; i < val.length; i++) {
    temp = val[i];
    switch (temp) {
      case '(':
        symbolIndex = i;
        break;
      case ')':
        symbolIndex = i;
        break;
      case ';':
        symbolIndex = i;
        break;
      case '\"':
        symbolIndex = i;
        break;
      case '<':
        symbolIndex = i;
        break;
      case '>':
        symbolIndex = i;
        break;
      case '[':
        symbolIndex = i;
        break;
      case ']':
        symbolIndex = i;
        break;
      case '{':
        symbolIndex = i;
        break;
      case '}':
        symbolIndex = i;
        break;
      default:
        symbolIndex = -1;
    }
    if (symbolIndex != -1) {
      symbolIndexArr.push(symbolIndex);
    }
  }
  return symbolIndexArr;
}

function createWordArray(val) {
  var symbolIndexArray = findSymbolIndex(val); // 所有特殊符号在val里的index序号的集合
  // 下面的循环对symbolIndexArray里的序号进行遍历
  // 下面这个变量是用来记录我们循环中遍历到的序号的前一个序号在数值上加一的数
  var previousIndex = 0;
  var tempStr;
  var wordArray = [];
  for (var i = 0; i < symbolIndexArray.length; i++) {
    // 该val[symbolIndexArray[i]]之前，val[symbolIndexArray[i]-1]之后的字符串
    tempStr = val.slice(previousIndex, symbolIndexArray[i]);
    if (tempStr != '') {
      var newWord = Object.create(Word);
      newWord.value = tempStr;
      newWord.isSymbol = false;
      wordArray.push(newWord);
    }

    // 该val[symbolIndexArray[i]]进入数值
    var newWord = Object.create(Word);
    newWord.value = val[symbolIndexArray[i]];
    newWord.isSymbol = true;
    wordArray.push(newWord);

    // 更新previousIndex
    previousIndex = symbolIndexArray[i] + 1;
  }
  return wordArray;
}

// 创建音乐
var audio_1, audio_2;
var audio_id_1, audio_id_2;
function CreateMusic(char) {
  audio_id_1 = '';
  audio_id_2 = '';
  // 先播audio_id_2，再播audio_id_1
  switch (char) {
    case '(':
      audio_id_1 = 'piano-ff-1';
      audio_id_2 = 'piano-e-1';
      break;
    case ')':
      audio_id_1 = 'piano-e-1';
      audio_id_2 = 'piano-gg-1';
      break;
    case ';':
      audio_id_2 = 'Big-Rack-Tom';
      break;
    case '\"':
      audio_id_1 = 'Hi-Hat-Closed';
      audio_id_2 = 'Hi-Hat-Closed-1';
      break;
    case '<':
      audio_id_1 = 'piano-aa-1';
      audio_id_2 = 'piano-f-1';
      break;
    case '>':
      audio_id_1 = 'piano-g-1';
      audio_id_2 = 'piano-a-1';
      break;
    case '[':
      audio_id_1 = 'Snare';
      audio_id_2 = 'Hi-Hat-Closed';
      break;
    case ']':
      audio_id_1 = 'Hi-Hat-Closed';
      audio_id_2 = 'Snare';
      break;
    case '{':
      audio_id_1 = 'Snare';
      audio_id_2 = 'Kick';
      break;
    case '}':
      audio_id_1 = 'Kick';
      audio_id_2 = 'Snare';
      break;
  }
  if (audio_id_1 != '') {
    audio_1 = document.getElementById(audio_id_1);
    setTimeout(() => {
      audio_1.play();
    }, 250); // 125 250
    audio_2 = document.getElementById(audio_id_2);
    audio_2.play();
    audio_2.onended = function () {
      // 这里的audio_2 换成audio_1会念乱码
      playNext();
    };
  } else {
    audio_2 = document.getElementById(audio_id_2);
    audio_2.play();
    audio_2.onended = function () {
      playNext();
    };
  }
}

var wordArray;
function musicSpeak(val) {
  // 把回车去掉
  val = val.replace(/(\r\n|\n|\r)/gm, '');

  wordArray = createWordArray(val); // 带判断是否是特殊符号的字符串集合

  // 除非上一段语音结束，否则不能播放下一段
  state.musicIndex = 0;
  state.musicToggle = true;
  easySpeak(' ');
  // console.log(musicToggle)
}

// code music 功能在一次播放中要调用好多次easySpeak
// 而且是在一次播放完毕以后，自动播放下一段
// 因此，我们需要加一个变量监听器，来监听上一段语音是否已经播放完毕了
function playNext() {
  // console.log('hiii');
  if (state.musicIndex < wordArray.length && state.musicToggle == true) {
    if (wordArray[state.musicIndex].isSymbol == false) {
      // code spaek
      // console.log(wordArray[musicIndex].value);
      easySpeak(codeSpeak(wordArray[state.musicIndex].value));
    } else {
      CreateMusic(wordArray[state.musicIndex].value);
    }
    state.musicIndex++;
    if (state.musicIndex == wordArray.length) {
      state.musicToggle = false;
      // console.log(musicToggle);
    }
  }
}

// overview mode
function overDocSpeak() {
  var index = state.findActiveEditor();
  var file_name = state.fileArray[index - 1].fileName;
  var max_line = state.myEditor.getModel().getLineCount();
  var char_count = state.myEditor.getValue().length;
  // + how many functions, how many variables
  var res =
    'the filename is ' +
    file_name +
    ' the row count is ' +
    max_line +
    '  and there are ' +
    char_count +
    'characters in this file ';
  return res;
}

function overLineSpeak(line_number) {
  var char_count = state.myEditor.getModel().getLineContent(line_number).length;
  // + 变量的数量，是否在函数里，是否在控制结构里 this line belong to function blablabla
  var res =
    'This is line ' +
    line_number +
    ' This line have ' +
    char_count +
    ' characters ';
  return res;
}

function speakDocument() {
  // console.log(myEditor);
  if (state.modeController == 'easySpeak') {
    easySpeak(state.myEditor.getValue());
  } else if (state.modeController == 'charSpeak') {
    easySpeak(charSpeak(state.myEditor.getValue()));
  } else if (state.modeController == 'codeSpeak') {
    easySpeak(codeSpeak(state.myEditor.getValue()));
  } else if (state.modeController == 'overSpeak') {
    easySpeak(overDocSpeak());
  } else if (state.modeController == 'musicSpeak') {
    musicSpeak(state.myEditor.getValue());
  } else {
    console.log('Something wrong in speakDocument()');
  }
}

function speakByLine(line_number) {
  if (state.modeController == 'easySpeak') {
    easySpeak(state.myEditor.getModel().getLineContent(line_number));
  } else if (state.modeController == 'charSpeak') {
    easySpeak(charSpeak(state.myEditor.getModel().getLineContent(line_number)));
  } else if (state.modeController == 'codeSpeak') {
    easySpeak(codeSpeak(state.myEditor.getModel().getLineContent(line_number)));
  } else if (state.modeController == 'overSpeak') {
    easySpeak(overLineSpeak(line_number));
  } else if (state.modeController == 'musicSpeak') {
    musicSpeak(state.myEditor.getModel().getLineContent(line_number));
  } else {
    console.log('Something wrong in speakByLine()');
  }
}

function speakByLineFunc() {
  var lineNumber = prompt('Please input the line number:', '');
  if (lineNumber == null || lineNumber == '') {
    easySpeak("You didn't input anything");
    // alert("Please input something!");
  } else {
    speakByLine(lineNumber);
  }
}

function cursorPosition() {
  easySpeak(
    'Line number is ' +
      state.myEditor.getPosition().lineNumber +
      'and column number is ' +
      state.myEditor.getPosition().column
  );
  // alert('Line number: ' + editor.getPosition().lineNumber);
}

// cursor focus
function cursorJumpToLine(line_number) {
  state.myEditor.setSelection(
    new monaco.Selection(line_number, 1, line_number, 1)
  );
  state.myEditor.focus();
}

function clickJumpToLine() {
  var lineNumber = prompt('Please input the line number:', '');
  var lineNumber_int = parseInt(lineNumber, 10); // parseInt: string to int
  if (lineNumber == null || lineNumber == '') {
    easySpeak("You didn't input anything");
  } else if (
    lineNumber_int < 1 ||
    lineNumber_int > state.myEditor.getModel().getLineCount()
  ) {
    easySpeak('Your input is out of range');
  } else {
    cursorJumpToLine(lineNumber_int);
  }
}

// 因为变量pauseResume无法传出，故把doPauseResume函数从script.js迁来这儿
function doPauseResume() {
  if (pauseResume == 'R') {
    window.speechSynthesis.pause();
    document.getElementById('play-pause').src = './images/play-solid.svg';
    // document.getElementById('control-button').setAttribute("class", "play");
    pauseResume = 'P';
  } else if (pauseResume == 'P') {
    window.speechSynthesis.resume();
    document.getElementById('play-pause').src = './images/pause-solid.svg';
    // document.getElementById('control-button').setAttribute("class", "pause");
    pauseResume = 'R';
  } else {
    console.log('Unknown state...');
  }
  return false;
}

// 因为变量clickNumber无法传出，故把speak函数从script.js迁来这儿
function speak() {
  pauseResume = 'R';
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }

  if (inputTxt !== '') {
    var id = ++speechId;
    var utterThis = new SpeechSynthesisUtterance(inputTxt);
    utterThis.onend = function (event) {
      if (speechId !== id) return;  // 过期事件（被 cancel 打断），忽略
      document.getElementById('play-pause').src = './images/play-solid.svg';
      state.clickNumber = 0;
      pauseResume = 'R';
      if (state.musicToggle == true) {
        playNext();
      }
      // console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    };
    var selectedOption =
      voiceSelect.selectedOptions[0].getAttribute('data-name'); // "Google UK English Female";
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

function doStop() {
  pauseResume = 'R';
  speechId++;  // 使当前 utterance 的 onend 失效，防止竞态
  window.speechSynthesis.cancel();
  state.clickNumber = 0;
  document.getElementById('play-pause').src = './images/play-solid.svg';
  return false;
}

function play() {
  state.musicToggle = false;
  var testTxt = state.myEditor
    .getModel()
    .getLineContent(state.currentLineNumber);
  if (testTxt == '') {
    easySpeak('Information from monaco speech editor: ' + 'This line is empty');
    // alert("This line is empty.");
    return -1;
  }

  state.clickNumber++;
  if (state.clickNumber == 1) {
    // doStop();  // 没有必要，inputTxt只有一个，占用不会发生
    // 第一次点击是播放，第二第三第n次该键的功能变成播放和暂停，一行播放结束以后clickNumber归零
    pauseResume = 'R';
    speakByLine(state.currentLineNumber);
    document.getElementById('play-pause').src = './images/pause-solid.svg';
  } else {
    doPauseResume();
    // console.log(clickNumber);
  }
}

function backward() {
  doStop();
  if (state.currentLineNumber <= 1) {
    easySpeak('This is the first line');
    // alert("This is the first line.");
    return -1;
  } else {
    state.currentLineNumber--;
    cursorJumpToLine(state.currentLineNumber);
  }
  document.getElementById('showLineNumber').value = state.currentLineNumber;
}

function forward() {
  doStop();
  // 可恶，摩纳哥里的变量只能进不能出，我都忘了
  // 摩纳哥的这个限制让这里出了奇怪的bug
  // 啥bug呢？就是用快捷键换行的时候会迷之把play()当暂停使用，这是因为一个语音进程没有自然结束，clickNumber没有归零
  // 在doStop里手动置零就可以了
  // 整了半天才想起来这个设定
  // 我还呆呆地去script.js里加了一句clickNumber = 0;
  var maxLine = state.myEditor.getModel().getLineCount();
  if (state.currentLineNumber >= maxLine) {
    easySpeak('This is the last line');
    // alert("This is the last line.");
    return -1;
  } else {
    state.currentLineNumber++;
    cursorJumpToLine(state.currentLineNumber);
  }
  document.getElementById('showLineNumber').value = state.currentLineNumber;
}

// ═══════════════════════════════════════════════════════════
//  集中导出所有被外部模块调用的函数
// ═══════════════════════════════════════════════════════════

export {
  easySpeak,
  charSpeak,
  codeSpeak,
  findSymbolIndex,
  createWordArray,
  CreateMusic,
  musicSpeak,
  playNext,
  overDocSpeak,
  overLineSpeak,
  speakDocument,
  speakByLine,
  speakByLineFunc,
  cursorPosition,
  cursorJumpToLine,
  clickJumpToLine,
  doPauseResume,
  speak,
  doStop,
  play,
  backward,
  forward,
  // 纯函数也被 spotlight / linear-index 用
  populateVoiceList
};
