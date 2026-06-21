import { state } from './state.js';
import { easySpeak } from './speech.js';

// ═══════════════════════════════════════════════════════════
// sidebar
// ═══════════════════════════════════════════════════════════

export function openLeftSideBar() {
  document.getElementById('left-sidebar').style.width = '250px';
  document.getElementById('header').style.marginLeft = '250px';
  document.getElementById('toolbar').style.marginLeft = '250px';
  document.getElementById('console-bar').style.marginLeft = '250px';
  var conta = document.getElementsByClassName('container');
  for (var i = 0; i < conta.length; i++) {
    conta[i].style.left = '300px';
  }
}

export function closeLeftSideBar() {
  document.getElementById('left-sidebar').style.width = '0';
  document.getElementById('header').style.marginLeft = '0';
  document.getElementById('toolbar').style.marginLeft = '0';
  document.getElementById('console-bar').style.marginLeft = '0';
  var conta = document.getElementsByClassName('container');
  for (var i = 0; i < conta.length; i++) {
    conta[i].style.left = '50px';
  }

  var i, tablinks;
  tablinks = document.getElementsByClassName('left-nav-button');
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
}

export function clickLeftNav(evt, sidebarName) {
  // 选择对应tab的内容
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  document.getElementById(sidebarName).style.display = 'block';

  tablinks = document.getElementsByClassName('left-nav-button');
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  evt.currentTarget.className += ' active';

  //控制sidebar的开关，因为closeLeftSideBar()内的语句，本节代码和上一节顺序不可对调
  state.leftSidebarSelected = state.leftSidebarSelect;
  state.leftSidebarSelect = sidebarName;
  if (state.leftSidebarStatus == 'c') {
    openLeftSideBar();
    state.leftSidebarStatus = 'o';
  } else if (state.leftSidebarSelected == state.leftSidebarSelect) {
    closeLeftSideBar();
    state.leftSidebarStatus = 'c';
    state.leftSidebarSelect = '';
  }
}

// collapse/expand section in sidebar
export function hideSection(evt, section_id, icon_id) {
  var selectedElement = document.getElementById(section_id);
  var selectedIcon = document.getElementById(icon_id);
  if (evt.currentTarget.className.toString().split(' ').pop() != 'hidden') {
    selectedElement.style.display = 'none';
    evt.currentTarget.className += ' hidden';
    selectedIcon.style =
      '-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);-o-transform: rotate(-90deg);-ms-transform: rotate(-90deg);transform: rotate(-90deg);';
  } else {
    selectedElement.style.display = 'block';
    evt.currentTarget.className = evt.currentTarget.className.replace(
      ' hidden',
      ''
    );
    selectedIcon.style = '';
  }
}

// full screen
export function hideHeader() {
  if (state.headerHidden == 'n') {
    document.getElementById('header').style.display = 'none';
    document.getElementById('toolbar').style.top = '0px';
    // document.getElementById("container").style.top = "28px";
    var conta = document.getElementsByClassName('container');
    for (var i = 0; i < conta.length; i++) {
      conta[i].style.top = '28px';
    }
    state.headerHidden = 'y';
  } else {
    document.getElementById('header').style.display = 'block';
    document.getElementById('toolbar').style.top = '50px';
    // document.getElementById("container").style.top = "78px";
    var conta = document.getElementsByClassName('container');
    for (var i = 0; i < conta.length; i++) {
      conta[i].style.top = '78px';
    }
    state.headerHidden = 'n';
  }
}

// ═══════════════════════════════════════════════════════════
// voice cue — hover 和 click 语音提示
// ═══════════════════════════════════════════════════════════

export function initVoiceCue() {
  // voice cue toggle
  document
    .getElementById('voice-cue-input')
    .addEventListener('click', function () {
      if (document.getElementById('voice-cue-input').checked === true) {
        state.voiceCueToggle = true;
      } else {
        state.voiceCueToggle = false;
        easySpeak('close voice cue');
      }
    });

  // click switch
  document
    .getElementById('sidebar-4')
    .addEventListener('click', function (evt) {
      if (state.voiceCueToggle == true) {
        if (
          evt.target.tagName == 'INPUT' &&
          evt.target.id != 'rate' &&
          evt.target.id != 'pitch'
        ) {
          if (evt.target.checked == true) {
            // console.log(evt.target.parentElement.parentElement.innerText)
            easySpeak(
              'open' + evt.target.parentElement.parentElement.innerText
            );
          } else if (evt.target.checked == false) {
            easySpeak(
              'close' + evt.target.parentElement.parentElement.innerText
            );
          }
        }
      }
    });

  var allElem = document.all;
  var allBtns = [];
  var allSpans = [];
  var allLeftNavBtms = [];
  for (var i = 0; i < allElem.length; i++) {
    if (allElem[i].tagName == 'BUTTON') {
      // console.log(allElem[i].tagName);
      allBtns.push(allElem[i]);
    } else if (allElem[i].tagName == 'SPAN') {
      allSpans.push(allElem[i]);
    } else if (allElem[i].className == 'left-nav-button') {
      allLeftNavBtms.push(allElem[i]);
    }
  }
  // hover button
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak(this.innerText + 'button');
      }
    });
  }
  // hover span
  for (var i = 0; i < allSpans.length; i++) {
    allSpans[i].addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak(this.innerText);
      }
    });
  }

  // 手动加的提示音
  // click
  document
    .getElementById('left-nav-button-1')
    .addEventListener('click', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('you click explorer navigation button');
      }
    });
  document
    .getElementById('left-nav-button-2')
    .addEventListener('click', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('you click upload navigation button');
      }
    });
  document
    .getElementById('left-nav-button-3')
    .addEventListener('click', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('you click feature list navigation button');
      }
    });
  document
    .getElementById('left-nav-button-4')
    .addEventListener('click', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('you click setting navigation button');
      }
    });
  document
    .getElementById('editable-textarea')
    .addEventListener('dblclick', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak(
          'you can modify the file name now, click outside of the text box to submit your input.'
        );
      }
    });

  // mouseover
  document
    .getElementById('left-nav-button-1')
    .addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('explorer navigation button');
      }
    });
  document
    .getElementById('left-nav-button-2')
    .addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('upload navigation button');
      }
    });
  document
    .getElementById('left-nav-button-3')
    .addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('feature list navigation button');
      }
    });
  document
    .getElementById('left-nav-button-4')
    .addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('setting navigation button');
      }
    });
  document
    .getElementById('editable-textarea')
    .addEventListener('mouseover', function (evt) {
      if (state.voiceCueToggle == true) {
        easySpeak('file name text area, double click to modify the file name');
      }
    });
}

// ═══════════════════════════════════════════════════════════
// 事件监听器初始化（sidebar nav buttons, resize, etc.）
// ═══════════════════════════════════════════════════════════

export function initSidebarNav() {
  // 自动resize monaco editor组件大小
  // setTimeout的时间和动画时间有关，动画时间是.2s, 所以setTimeout时间必须大于200
  window.addEventListener('resize', () => {
    state.myEditor.layout();
    setTimeout(() => {
      state.myEditor.layout();
    }, 300);
  });
  document.getElementById('left-nav-button-1').addEventListener('click', e => {
    clickLeftNav(e, 'sidebar-1');
    for (var i = 0; i < 250; i = i + 1) {
      setTimeout(() => {
        state.myEditor.layout();
      }, i);
    }
  });
  document.getElementById('left-nav-button-2').addEventListener('click', e => {
    clickLeftNav(e, 'sidebar-2');
    for (var i = 0; i < 250; i = i + 1) {
      setTimeout(() => {
        state.myEditor.layout();
      }, i);
    }
  });
  document.getElementById('left-nav-button-3').addEventListener('click', e => {
    clickLeftNav(e, 'sidebar-3');
    for (var i = 0; i < 250; i = i + 1) {
      setTimeout(() => {
        state.myEditor.layout();
      }, i);
    }
  });
  document.getElementById('left-nav-button-4').addEventListener('click', e => {
    clickLeftNav(e, 'sidebar-4');
    for (var i = 0; i < 250; i = i + 1) {
      setTimeout(() => {
        state.myEditor.layout();
      }, i);
    }
  });
}
