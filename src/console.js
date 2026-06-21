import { state } from './state.js';

// ── console ──

export function consoleInit() {
  var console_border_color = state.console_border_color;

  document
    .getElementById('night-mode-input')
    .addEventListener('click', function () {
      // console.log('asdfasdf');
      if (document.getElementById('night-mode-input').checked === true) {
        console_border_color = state.console_border_color = '#000000';
        document.getElementById('console-bar').style.borderTop =
          state.console_border_style + console_border_color;
      } else {
        console_border_color = state.console_border_color = '#bbbbbb';
        document.getElementById('console-bar').style.borderTop =
          state.console_border_style + console_border_color;
      }
      // console.log(document.getElementById("console-bar").style.borderTop)
    });
}

export function run() {
  var text = state.myEditor.getValue();
  // new iframe
  newIframe('result-iframe');
  // refresh iframe
  document.getElementById('result-iframe').contentDocument.write(text);

  // logger
  // 重写console.log
  // implement it by hack way
  var injection =
    '<script' +
    '>(function (logger) {conso' +
    'le.old = console.log;console.log = function () {var output = "", arg, i;for (var i = 0; i < argu' +
    'ments.length; i++) {arg = argume' +
    'nts[i];output += "<span class=\'log-" + (typeof arg) + "\'>";if (ty' +
    'peof arg === "object" \&' +
    '\&typeof JSON === "object" \&' +
    '\&typeof JSON.stringify === "function") {output += JSON.stringify(arg);   } else {output += arg;   }output += \'<' +
    "/span>\&nbsp;';}logger.innerHTML += output + '<br>';console.old.apply(undefined, arguments);};})(document.getElementById('logger'));<" +
    '/script>';
  var hideAllElem =
    '<script' +
    ">var nodes = document.all;for(var i=0;i<nodes.length;i++){var o = nodes[i];o.style.display = 'none';}<" +
    '/script>';
  var showLog =
    '<script' +
    ">document.getElementsByTagName('html')[0].style.display = 'block';document.getElementsByTagName('body')[0].style.display = 'block';document.getElementById('logger').style.display = 'block'; var cn = document.getElementById('logger').childNodes;for (var i = 0; i < cn.length; i++) {cn[i].style = 'display: block;';}<" +
    '/script>';
  var logInput =
    '<link rel="stylesheet" href="./src/style.css">' +
    "<div id='logger'></div>" +
    injection +
    text +
    hideAllElem +
    showLog;
  newIframe('log-iframe');
  document.getElementById('log-iframe').contentDocument.write(logInput);
  // 防止myEditor里的代码注入导致的背景颜色变化
  document.getElementById('log-iframe').contentDocument.body.style.background =
    '#FFFFFF'; // "#202020";
  // document.getElementById("log-iframe").contentDocument.body.style.borderLeft = "1px solid #bbbbbb";
}

function newIframe(id) {
  // remove iframe
  var selectedIframe = document.getElementById(id);
  var parent = selectedIframe.parentNode;
  parent.removeChild(selectedIframe);

  // create a new iframe
  var iframe = document.createElement('iframe');
  iframe.id = id;
  parent.appendChild(iframe);
}

// open iframe in new window
export function openInNewWindow() {
  var win = window.open(
    '',
    'Title',
    'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=' +
      (screen.height - 400) +
      ',left=' +
      (screen.width - 840)
  );
  var text = state.myEditor.getValue();
  win.document.write(text);
  // win.document.body.innerHTML = text;
}

export function openInNewTab() {
  var win = window.open('_blank');
  var text = state.myEditor.getValue();
  win.document.write(text);
  // win.document.body.innerHTML = text;
}

export function getIframeDocument(iframe_id) {
  var iframe = document.getElementById(iframe_id);
  var doc = iframe.contentWindow.document;
  return doc;
}

// console hide and show
export function hideConsole() {
  if (state.consoleToggle == 'h') {
    // 打开状态
    // 显示run button console-button-open-window console-button-open-tab
    document.getElementById('console-button-run').style.display =
      'inline-block';
    document.getElementById('console-button-open-window').style.display =
      'inline-block';
    document.getElementById('console-button-open-tab').style.display =
      'inline-block';
    // 打开状态下，所有console button类的按钮高度调为29px，字体大小调为14px
    var btn_bar = document.getElementById('console-button-bar');
    for (var i = 0; i < btn_bar.children.length; i++) {
      btn_bar.children[i].style.height = '29px';
      btn_bar.children[i].style.fontSize = '14px';
    }
    // 打开状态下，为console bar 加一条上边线
    var console_border_style = '1px solid';
    document.getElementById('console-bar').style.borderTop =
      console_border_style + state.console_border_color;
    // Code for Safari
    document.getElementById('console-bar').style.WebkitTransform =
      'translateY(-310px)';
    // Code for IE9
    document.getElementById('console-bar').style.msTransform =
      'translateY(-310px)';
    // Standard syntax
    document.getElementById('console-bar').style.transform =
      'translateY(-310px)';
    state.consoleToggle = 's';
    // 将设置里的open console bar开关打开
    document.getElementById('open-console-input').checked = true;
  } else {
    // 关闭状态
    // 隐藏run button console-button-open-window console-button-open-tab
    document.getElementById('console-button-run').style.display = 'none';
    document.getElementById('console-button-open-window').style.display =
      'none';
    document.getElementById('console-button-open-tab').style.display = 'none';
    // 关闭状态下，所有console button类的按钮高度调为20px，字体大小调为12px
    var btn_bar = document.getElementById('console-button-bar');
    for (var i = 0; i < btn_bar.children.length; i++) {
      btn_bar.children[i].style.height = '20px';
      btn_bar.children[i].style.fontSize = '12px';
    }
    // 关闭状态下，去掉上边线
    var console_border_style = '0px none';
    document.getElementById('console-bar').style.borderTop =
      console_border_style + state.console_border_color;
    // Code for Safari
    document.getElementById('console-bar').style.WebkitTransform =
      'translateY(0)';
    // Code for IE9
    document.getElementById('console-bar').style.msTransform = 'translateY(0)';
    // Standard syntax
    document.getElementById('console-bar').style.transform = 'translateY(0)';
    state.consoleToggle = 'h';
    // 将设置里的open console bar开关关闭
    document.getElementById('open-console-input').checked = false;
  }
}
