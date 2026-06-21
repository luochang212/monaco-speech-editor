import { state } from './state.js';
import { easySpeak } from './speech.js';

// ═══════════════════════════════════════════════════════════
//  在这里输入spot light 成员
// ═══════════════════════════════════════════════════════════

var topPos; // = document.getElementById('spot-light-1').offsetTop;
var innerElementHeight;
var innerElementNumber; // = SLArray.length;  // 元素总数
var selectElemIndex = 1; // 选中元素序号
var scrollDownDistance = 0; // 滑动的距离

// 用于动态创建spot-light-div
function createSLMember(SLNameArray) {
  // init
  // spot light 成员
  var SoptLightMember = {
    name: '',
    status: false
  };
  var SLArray = [];

  // SLArray的第一个元素是空元素
  document.createElement('DIV'); // placeholder, unused
  var newMember = Object.create(SoptLightMember);
  newMember.name = '';
  newMember.status = false;
  SLArray.push(newMember);

  for (var i = 0; i < SLNameArray.length; i++) {
    var SLName = document.getElementById(SLNameArray[i]).parentElement
      .parentElement.innerText;
    var SLStatus = document.getElementById(SLNameArray[i]).checked;
    var newMember = Object.create(SoptLightMember);
    newMember.name = SLName;
    newMember.status = SLStatus;
    SLArray.push(newMember);
  }

  // SLArray的最后一个元素是空元素
  document.createElement('DIV'); // placeholder, unused
  var newMember = Object.create(SoptLightMember);
  newMember.name = '';
  newMember.status = false;
  SLArray.push(newMember);

  // console.log(SLArray);

  // 动态创建spot light视图
  for (var i = 0; i < SLArray.length; i++) {
    var div = document.createElement('DIV');
    div.className = 'spot-light-div';
    div.id = 'spot-light-' + (i + 1).toString(10);
    if (i != 0 && i != SLArray.length - 1) {
      div.innerText = SLArray[i].name + (SLArray[i].status ? ':  on' : ': off');
    }
    // 默认中间元素被选中
    if (i == 1) {
      div.style.backgroundColor = '#b1b1b1';
      div.style.fontSize = '28px';
    }
    document.getElementById('spot-light-canvas').appendChild(div);
  }

  return SLArray;
}

// 着深色的方块总在中间
// 着色更新器
function updateSLColor(index) {
  var allDiv = document.getElementById('spot-light-canvas').children;
  // console.log(allDiv.length)
  for (var i = 0; i < allDiv.length; i++) {
    allDiv[i].style.backgroundColor = 'transparent';
    allDiv[i].style.fontSize = '25px';
  }
  allDiv[index].style.backgroundColor = '#b1b1b1'; // 被选中的字背景深一点
  allDiv[index].style.fontSize = '28px'; // 被选中的字字体大一点
}

// 阅读当前div里的文本
function speakSL(index) {
  if (!state.mute) {
    var allDiv = document.getElementById('spot-light-canvas').children;
    easySpeak(allDiv[index].innerText);
  }
}

// 更新 spot light 成员状态
// 更新整张div表
function updateSLStatus() {
  // 更新 spot light 成员状态
  for (var i = 1; i < state.SLArray.length - 1; i++) {
    var SLStatus = document.getElementById(state.SLNameArray[i - 1]).checked;
    state.SLArray[i].status = SLStatus;
  }

  // 更新整张div表
  var allDiv = document.getElementById('spot-light-canvas').children;
  for (var i = 1; i < allDiv.length - 1; i++) {
    allDiv[i].innerText =
      state.SLArray[i].name + (state.SLArray[i].status ? ':  on' : ': off');
  }
}

// 监听方向键的函数
export function SLReact(e) {
  // e.preventDefault();
  // console.log()
  topPos = document.getElementById('spot-light-1').offsetTop;
  innerElementHeight = document.getElementById('spot-light-1').offsetHeight;
  innerElementNumber = state.SLNameArray.length;
  // console.log(innerElementHeight);
  // e.preventDefault();

  if (e.which == 37) {
    // 左键
    // 左右键改变状态
    // 因为只有开和关两种状态，所以左右键是等价的，功能都一样
    // 处理按下左键触发的事件
    // 模拟点击该选项
    document.getElementById(state.SLNameArray[selectElemIndex - 1]).click();
    updateSLStatus();
  } else if (e.which == 38) {
    // 上键
    // 滑动距离限制
    // if ((scrollDownDistance - innerElementHeight) > -0.01) { // 减了以后，依旧是个非负数才让减
    if (selectElemIndex > 1) {
      scrollDownDistance -= innerElementHeight;
      // console.log(selectElemIndex)
      selectElemIndex -= 1;
    }
    // 在上面的if控制语句之后的selectElemIndex是准确的div序号
    // 移动后更新着色
    updateSLColor(selectElemIndex);
    speakSL(selectElemIndex);

    // console.log(scrollDownDistance);
    document.getElementById('spot-light-canvas').scrollTop =
      topPos + scrollDownDistance;
  } else if (e.which == 39) {
    // 右键
    // 处理按下右键触发的事件
    // 模拟点击该选项
    // console.log('1', selectElemIndex);
    document.getElementById(state.SLNameArray[selectElemIndex - 1]).click();
    updateSLStatus();
  } else if (e.which == 40) {
    // 下键

    // console.log("hi")
    // document.getElementById("spot-light-top-elem").style.top = "50px;"
    // document.getElementById("spot-light-top-elem").scrollTop = "15";
    // console.log(document.getElementById("spot-light-2").scrollTop);

    // 滑动距离限制
    // if ((scrollDownDistance + innerElementHeight) < (innerElementNumber - elementVisibleNumber) * innerElementHeight + 0.01) {  // 加了以后不能超过可以滑动的最大距离

    if (selectElemIndex <= innerElementNumber - 1) {
      scrollDownDistance += innerElementHeight;
      // console.log(selectElemIndex)
      selectElemIndex += 1;
    }

    // 在上面的if控制语句之后的selectElemIndex是准确的div序号
    // 移动后更新着色
    updateSLColor(selectElemIndex);
    speakSL(selectElemIndex);
    // console.log(scrollDownDistance);
    document.getElementById('spot-light-canvas').scrollTop =
      topPos + scrollDownDistance;
    // var width = document.getElementById('spot-light-1').offsetWidth;
    // console.log(width);
  } else {
    // 按下除方向键之外的所有按键，关闭spot light
    document.getElementById('overlay').click();
  }
}

export function initSpotlight() {
  // spot light 开关
  document
    .getElementById('spot-light-input')
    .addEventListener('click', function () {
      if (document.getElementById('spot-light-input').checked === true) {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('spot-light-canvas').style.display = 'block';

        // 最顶和最底为空元素，滑动时不可选中
        // 滑动前把选项的选中状态，选用颜色表示，深色的表示选中，浅色表示没有选中
        // 此功能不直接调用函数，用模拟点击事件控制可能更好一点？
        // 每次操作结束后，更新一遍状态，因为有的设置之间是相互关联的，改了一个，其他的也会跟着变
        // 1. init 获取更新
        // -----------
        // 2. 选中事件
        // 3. 模拟点击
        // 4. 点击后获取更新
        // -----------
        // spot light 成员
        // 用作初始化的createSLMember 函数在全局的init函数里调用
        // createSLMember(SLNameArray);

        // 把鼠标在编辑器中的位置记下
        // 让它失焦
        state.activePosi = document.activeElement;
        state.activePosi.blur();

        // 除了全局init外，本函数内也需要初始化，以在第二，第三，第n次打开时运行正确
        selectElemIndex = 1; // 选中元素序号
        scrollDownDistance = 0; // 滑动的距离
        updateSLColor(1);
        speakSL(1);
        updateSLStatus();
        document.getElementById('spot-light-canvas').scrollTop = 0;

        state.spotLightToggle = true;
      } else {
        // 关闭的时候取消对方向键的监听
        // document.removeEventListener("keyup",
        //     SLReact(e)
        // );
        state.spotLightToggle = false;
      }
    });

  // 点击overlay关闭spot light
  document.getElementById('overlay').addEventListener('click', function () {
    document.getElementById('spot-light-canvas').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('spot-light-input').checked = false;
    state.spotLightToggle = false;
    // 鼠标回到原焦点
    if (state.activePosi != null) {
      state.activePosi.focus();
    }
    state.activePosi = null;
  });
}

export { createSLMember, updateSLColor, speakSL, updateSLStatus };
