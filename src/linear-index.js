import { state } from './state.js';
import { easySpeak, doStop } from './speech.js';

// ═══════════════════════════════════════════════════════════
// linear index
// 线性索引功能，是功能的索引，是快速查找功能的功能
// ═══════════════════════════════════════════════════════════

// linear index 的全局变量
var topPosLI; // = document.getElementById('spot-light-1').offsetTop;
var innerElementHeightLI;
var innerElementNumberLI; // = SLArray.length;  // 元素总数
var selectElemIndexLI = 1; // 选中元素序号
var scrollDownDistanceLI = 0; // 滑动的距离

// linear index 和 spot light 共用一个监听器

export function LIReact(e) {
  topPosLI = document.getElementById('linear-index-1').offsetTop;
  innerElementHeightLI = document.getElementById('linear-index-1').offsetHeight;
  innerElementNumberLI =
    document.getElementById('linear-index-canvas').children.length - 2;

  if (e.which == 38) {
    // 上键
    // 滑动距离限制
    if (selectElemIndexLI > 1) {
      scrollDownDistanceLI -= innerElementHeightLI;
      selectElemIndexLI -= 1;
    }
    document.getElementById('linear-index-canvas').scrollTop =
      topPosLI + scrollDownDistanceLI;
    // 在上面的if控制语句之后的selectElemIndex是准确的div序号
    // 移动后更新着色
    updateSLColorLI(selectElemIndexLI);
    // 移动后自动自动念出该条目的名字以及快捷方式
    speakLI(selectElemIndexLI);
  } else if (e.which == 40) {
    // 下键
    // 滑动距离限制
    if (selectElemIndexLI <= innerElementNumberLI - 1) {
      scrollDownDistanceLI += innerElementHeightLI;
      selectElemIndexLI += 1;
    }
    document.getElementById('linear-index-canvas').scrollTop =
      topPosLI + scrollDownDistanceLI;
    // 在上面的if控制语句之后的selectElemIndex是准确的div序号
    // 移动后更新着色
    updateSLColorLI(selectElemIndexLI);
    // 移动后自动自动念出该条目的名字以及快捷方式
    speakLI(selectElemIndexLI);
  } else if (e.which == 37) {
    // 左键
    // read again
    speakLI(selectElemIndexLI);
  } else if (e.which == 39) {
    // 右键
    // read again
    speakLI(selectElemIndexLI);
  } else {
    // 按下除方向键之外的所有按键，关闭linear index
    document.getElementById('overlay-2').click();
  }
}

// linear index 更新着色
function updateSLColorLI(index) {
  var allDiv = document.getElementById('linear-index-canvas').children;
  for (var i = 0; i < allDiv.length; i++) {
    allDiv[i].style.backgroundColor = 'transparent';
    allDiv[i].style.fontSize = '25px';
  }
  allDiv[index].style.backgroundColor = '#b1b1b1'; // 被选中的字背景深一点
  allDiv[index].style.fontSize = '28px'; // 被选中的字字体大一点
}

// 移动后自动自动念出该条目的名字以及快捷方式
function speakLI(index) {
  if (!state.mute) {
    var allDiv = document.getElementById('linear-index-canvas').children;
    var fullName = allDiv[index].innerText;
    var realName = fullName.split('(').shift();
    var realhotKey = fullName.split('+').pop().replace(')', '');
    easySpeak(
      realName +
        ', hot key is control, alt and ' +
        realhotKey +
        ', In windows systems. On Mac systems, hot key is control, option and ' +
        realhotKey
    );
  }
}

export function initLinearIndex() {
  // 打开linear index
  document
    .getElementById('linear-index-input')
    .addEventListener('click', function () {
      if (document.getElementById('linear-index-input').checked === true) {
        document.getElementById('overlay-2').style.display = 'block';
        document.getElementById('linear-index-canvas').style.display = 'block';

        // 把鼠标在编辑器中的位置记下
        // 让它失焦
        state.activePosi = document.activeElement;
        state.activePosi.blur();

        // 除了全局init外，本函数内也需要初始化，以在第二，第三，第n次打开时运行正确
        selectElemIndexLI = 1; // 选中元素序号
        scrollDownDistanceLI = 0; // 滑动的距离
        updateSLColorLI(1);
        speakLI(1);
        document.getElementById('linear-index-canvas').scrollTop = 0;

        state.LinearIndexToggle = true;
        // console.log(LinearIndexToggle)
      } else {
        state.LinearIndexToggle = false;
      }
    });

  // 关闭 linear index
  document.getElementById('overlay-2').addEventListener('click', function () {
    document.getElementById('linear-index-canvas').style.display = 'none';
    document.getElementById('overlay-2').style.display = 'none';
    document.getElementById('linear-index-input').checked = false;
    state.LinearIndexToggle = false;
    doStop();
    // 鼠标回到原焦点
    if (state.activePosi != null) {
      state.activePosi.focus();
    }
    state.activePosi = null;
  });
}
