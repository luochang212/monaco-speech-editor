import { state } from './state.js';
import { newEditor, activeEditor, findActiveEditor } from './editor.js';
import * as monaco from 'monaco-editor';

// ── 语言扩展名映射（消除重复） ──
function langFromExt(ext) {
  var map = {
    json: 'json',
    js: 'javascript',
    php: 'php',
    html: 'html',
    java: 'java',
    py: 'python',
    go: 'go',
    css: 'css',
    cpp: 'cpp',
    C: 'css',
    cxx: 'cpp',
    'c++': 'cpp',
    cc: 'cpp',
    c: 'c',
    rb: 'ruby',
    sh: 'shell',
    swift: 'swift',
    ts: 'typescript',
    R: 'r',
    md: 'markdown',
    yml: 'yaml',
    xml: 'xml'
  };
  return map[ext] || null;
}

// ── 文件对象原型 ──
var Files = {
  fileId: '',
  fileName: '',
  isDelete: 'false',
  isActive: '',
  editor: null,
  editorContent: '',
  editorLanguage: ''
};

// ═══════════════════════════════════════════════════════════
//                  ⌒(❀>◞౪◟<❀)⌒
//                   FILE MANAGER!!!
// ═══════════════════════════════════════════════════════════

// editable textarea
function configureEditableTextarea(id, modifyClassName, readOnlyClassName) {
  var textarea = document.getElementById(id);
  textarea.ondblclick = function () {
    this.readOnly = false;
    this.className = modifyClassName;
  };
  textarea.onblur = function () {
    this.readOnly = true;
    this.className = readOnlyClassName;
    // document.getElementById("test").innerHTML = document.getElementById(id).value;
    // 找到当前激活的编辑器序号
    var index = findActiveEditor();
    // console.log(index);

    // 文件名不能为空
    if (document.getElementById(id).value == '') {
      document.getElementById(id).value = state.fileArray[index - 1].fileName;
    } else {
      state.fileArray[index - 1].fileName = document.getElementById(id).value;
      // 更新文件列表里的标题
      document.getElementById('file-list-input-' + index.toString(10)).value =
        state.fileArray[index - 1].fileName;
    }
  };
}

// editable textarea 2
function configureFilenameText(
  id,
  button_id,
  modifyClassName,
  readOnlyClassName
) {
  var textarea = document.getElementById(id);
  var button = document.getElementById(button_id);
  button.onclick = function () {
    textarea.readOnly = false;
    textarea.className = modifyClassName;
    textarea.focus();
    state.closeClickSpan = 'y';
  };

  textarea.onblur = function () {
    this.readOnly = true;
    this.className = readOnlyClassName;

    // textarea.onclick=event.stopPropagation();
    var index = parseInt(id.toString(10).split('-').pop());
    // 文件名不能为空
    if (document.getElementById(id).value == '') {
      document.getElementById(id).value = state.fileArray[index - 1].fileName;
    } else {
      state.fileArray[index - 1].fileName = document.getElementById(id).value;
      // 这里的逻辑和editable textarea 2不完全相同，因为这里是一对多，一个框对多个名称
      // 标题只显示当前编辑器的名称，以下注释部分正是因为没有理解这一点而写错的
      // <del>更新编辑器顶上的那个标题，即id=editable-textarea</del>
      // document.getElementById("editable-textarea").value = fileArray[index-1].fileName;

      // 重写：每次激活编辑器，都要将题头设为fileArray[i].fileName
      // 但是，有一种情况例外，那就是正在修改的时候，没有激活，也需要变化题头
      // 判断当前正在编辑文件名的文件的标题，是不是当下激活的编辑器的标题

      // 找到当前激活的编辑器序号
      var active_index = findActiveEditor();

      if ((state.closeClickSpan == 'y') & (active_index == index)) {
        document.getElementById('editable-textarea').value =
          state.fileArray[index - 1].fileName;
      }
    }
    state.closeClickSpan = 'n';
  };
}

// 每次新增文件时需要运行此函数以配置文件管理器中该文件所属标签的文本框
// configureFilenameText("filename-input-1", "edit-button-1", "filename-modify", "filename-readonly");

// ── File Manager UI ──
// 点击span和点击span上的button事件的分离
// 可以在不跳转编辑器的情况下修改别的编辑器的文件名

function addFileView() {
  var li = document.createElement('li');
  li.id = 'li-' + state.fileCounter.toString(10);
  // var file_name = "Untitled-" + fileCounter.toString(10);
  var file_name = state.fileArray[state.fileCounter - 1].fileName;
  var input = document.createElement('input');
  input.readOnly = true;
  input.className = 'filename-readonly';
  input.id = 'file-list-input-' + state.fileCounter.toString(10);
  input.type = 'text';
  input.value = file_name;
  var input_span = document.createElement('SPAN');
  input_span.className = 'input-span';
  li.appendChild(input_span);
  input_span.appendChild(input);
  document.getElementById('my-file-list').appendChild(li);

  var save_span = document.createElement('SPAN');
  save_span.className = 'save';
  var img = document.createElement('IMG');
  img.src = './images/save-solid.svg';
  img.className = 'title-icon';
  save_span.appendChild(img);
  li.appendChild(save_span);

  var trash_span = document.createElement('SPAN');
  trash_span.className = 'trash';
  var img = document.createElement('IMG');
  img.src = './images/trash-alt-solid.svg';
  img.className = 'title-icon';
  trash_span.appendChild(img);
  li.appendChild(trash_span);

  var edit_span = document.createElement('SPAN');
  edit_span.className = 'editable';
  edit_span.id = 'file-list-edit-' + state.fileCounter.toString(10);
  var img = document.createElement('IMG');
  img.src = './images/pen-solid.svg';
  img.className = 'title-icon';
  edit_span.appendChild(img);
  li.appendChild(edit_span);

  // 此处投机取巧，除trash以外，其他原素是借用了trash的length值，因为数值相同
  var trash = document.getElementsByClassName('trash');
  var inputSpan = document.getElementsByClassName('input-span');
  var saveSpan = document.getElementsByClassName('save');
  for (var i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
      // 如果被删除，不再在文件列表中显示该文件
      var ThisLi = this.parentElement;
      ThisLi.style.display = 'none';
      // 如果被删除，将该对象的isDelete属性设置为true
      var index = parseInt(ThisLi.id.toString(10).split('-').pop());
      state.fileArray[index - 1].isDelete = 'true';
      // 如果被删除，更新editorContent
      state.fileArray[index - 1].editorContent =
        state.fileArray[index - 1].editor.getValue();
      // 如果被删除，第一个文件的li的class设为active
      // 先检查是否至少存在一个文件，如果一个文件都没有，那么新建一个
      var fileIndex;
      for (var j = 0; j < state.fileArray.length; j++) {
        var isAllDelete = 'y';
        if (state.fileArray[j].isDelete == 'false') {
          isAllDelete = 'n';
          fileIndex = j + 1;

          break;
        }
      }

      if (isAllDelete == 'y') {
        // 删除时调用addFile函数，addFile函数会调用activeEditor函数，因此此处不用激活
        addFile('', 'html', '');
      } else {
        // 目前文件序列中的第一个文件的li的class设为active
        // console.log(fileIndex);
        activeEditor(fileIndex);
      }
    };

    inputSpan[i].onclick = function () {
      if (state.closeClickSpan == 'n') {
        var ThisLi = this.parentElement;
        var index = parseInt(ThisLi.id.toString(10).split('-').pop());
        activeEditor(index);
      }
    };

    saveSpan[i].onclick = function () {
      var ThisLi = this.parentElement;
      var index = parseInt(ThisLi.id.toString(10).split('-').pop());
      save(index);
    };

    configureFilenameText(
      'file-list-input-' + (i + 1).toString(10),
      'file-list-edit-' + (i + 1).toString(10),
      'filename-modify',
      'filename-readonly'
    );
  }
}

// 在文件列表里新增一个文件，先新增对象，然后刷新视图
function addFile(code, language, fn) {
  // console.log(fileCounter);
  // 新建一个container
  var new_container = document.createElement('DIV');
  new_container.id = 'container-' + state.fileCounter.toString(10);
  // console.log(fileCounter);
  new_container.className = 'container';
  // 判断是否处于full screen
  if (state.headerHidden == 'y') {
    new_container.style.top = '28px';
  } else {
    new_container.style.top = '78px';
  }
  // 判断sidebar是否打开
  if (state.leftSidebarStatus == 'o') {
    new_container.style.left = '300px';
  } else {
    new_container.style.left = '50px';
  }
  document.getElementById('monaco-speech-editor').appendChild(new_container);
  // 新建一个editor
  var editor = newEditor(new_container.id, code, language);

  // 新增编辑器向右移动
  // document.getElementById("container-" + fileCounter.toString(10)).style.marginLeft = "250px";

  // 更新对象的属性
  var file = Object.create(Files);
  file.fileId = state.fileCounter.toString(10);
  if (fn == '') {
    file.fileName = 'Untitled-' + file.fileId;
  } else {
    file.fileName = fn;
  }
  file.editor = editor;
  // editorContent服务于垃圾回收功能，仅在删除前更新
  file.editorContent = editor.getValue();
  file.editorLanguage = language;
  // console.log(file.editor);
  state.fileArray.push(file);

  // 刷新文件列表
  addFileView();

  var index = state.fileCounter;
  activeEditor(index);

  // 文件计数器加一
  state.fileCounter += 1;
}

// ═══════════════════════════════════════════════════════════
//              ﾂ（〃＾∇＾）ﾉﾂ
//           UPLOAD AND DOWNLOAD!!!!
// ═══════════════════════════════════════════════════════════

// 上传
// dropzone
var drop_code = '';

function uploadOn(e, callback) {
  drop_code = e.dataTransfer.getData('text');

  if (drop_code) {
    // console.log("CASE 1");
    callback();
  } else {
    getUploadText(e, callback);
  }
}

function getUploadText(e, callback) {
  var files = e.target.files || e.dataTransfer.files;
  var file = files[0];

  if (location.host.indexOf('sitepointstatic') >= 0) return;

  var request = new XMLHttpRequest();
  if (request.upload) {
    // console.log("CASE 2");
    var reader = new FileReader();

    // 下面这段代码有复用，考虑写成函数
    var ext = file.name.toString().split('.').pop();
    var filename = file.name.toString().split('.').shift();
    var type;

    // 用于自动跳转语法高亮
    type = langFromExt(ext);

    reader.readAsText(file);

    reader.onloadend = function (e) {
      drop_code = reader.result;
      if (type != null) {
        addFile(drop_code, type, file.name.toString());
        // languageSelect.value = type;
      } else {
        addFile(drop_code, 'html', file.name.toString());
        // callback();
      }
      // callback();
      // document.getElementById("showtext").innerHTML = filename;
    };
  }
}

function uploadFile(e) {
  fileDragHover(e);
  uploadOn(e, updateDropCode);
}

function fileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function updateDropCode() {
  addFile(drop_code, 'html', '');
  // fileArray[findActiveEditor()]
  // document.getElementById("test").innerHTML = drop_code;
}

function configureDropZone(zone_id) {
  var filedrag = document.getElementById(zone_id);
  filedrag.addEventListener('dragover', fileDragHover, false);
  filedrag.addEventListener('dragleave', fileDragHover, false);
  filedrag.addEventListener('drop', uploadFile, false);
}

// upload by button
function handleFileSelect(e) {
  getUploadText(e, updateDropCode);
}

function configureFileSelect(id) {
  document
    .getElementById(id)
    .addEventListener('change', handleFileSelect, false);
}

// download
// 下载功能
function save(index) {
  download(
    state.fileArray[index - 1].fileName,
    state.fileArray[index - 1].editor.getValue()
  );

  // var filename = prompt("Please input filename:", "");
  // if (filename == null || filename == "") {
  //     // alert("Please input something!");
  // } else {
  //     var text = myEditor.getValue();
  //     download(filename, text);
  // }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// trash
// 垃圾桶功能
function findDeletedFiles() {
  alert('Please open the console in your browser.');
  console.log(state.fileArray);
}

// load demo
// 从json加载示例代码
function loadDemo() {
  fetch('./data/code.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      Object.keys(data).forEach(function (key) {
        var val = data[key];
        var ext = key.toString().split('.').pop();
        var type;

        // 用于自动跳转语法高亮
        type = langFromExt(ext);

        if (type != null) {
          addFile(val, type, key);
        } else {
          addFile(val, 'html', key);
        }
      });
    });
}

// ── 事件监听器注册 ──

var list = document.querySelector('.file-list');
list.addEventListener(
  'click',
  function (ev) {
    if (ev.target.tagName === 'LI' && state.closeClickSpan == 'n') {
      var index = parseInt(ev.target.id.toString(10).split('-').pop());
      activeEditor(index);
    }
  },
  false
);

document
  .getElementById('title-button-add')
  .addEventListener('click', function () {
    addFile('', 'html', '');
    // console.log("hi");
  });

export {
  configureEditableTextarea,
  configureFilenameText,
  addFileView,
  addFile,
  save,
  download,
  findDeletedFiles,
  loadDemo,
  configureDropZone,
  configureFileSelect,
  findActiveEditor
};
