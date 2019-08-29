'use strict'


// Check before leave website
window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = 'Do you sure';
});


// var editor;
// var editorFontSize = 35;
// var defaultValue = "/* Write your code here. */\n\nfunction isDeleted(element) { \n    var id_str = element.id;\n    id_str = id_str.replace(\"btn\",\"\"); \n    var id_num = parseInt(id_str);\n\n    if (delete_flag == true) {\n        delete_flag = false;\n        subArray[id_num].isDelete = \"true\";\n        element.value=\"×\";\n    } else {\n        delete_flag = true;\n        subArray[id_num].isDelete = \"false\";\n        element.value=\"\";\n    }\n}";


require.config({ paths: { 'vs': './node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {

    var myEditor;
    var editorArray = [];

    var defaultCode = [
        'function helloWorld() {',
        '   console.log("Hello world!");',
        '}'
    ].join('\n');

    // var goCode = "package main\n\nimport (\n    \"html/template\"\n    \"log\"\n    \"net/http\"\n    \"os\"\n    \"path/filepath\"\n)\n\nfunc main() {\n    fs := http.FileServer(http.Dir(\"static\"))\n    http.Handle(\"/static/\", http.StripPrefix(\"/static/\", fs))\n    http.HandleFunc(\"/\", serveTemplate)\n\nlog.Println(\"\\nWeb Server is available at http://localhost:3000/example.html\")\n    http.ListenAndServe(\":3000\", nil)\n}\n\nfunc serveTemplate(w http.ResponseWriter, r *http.Request) {\n    lp := filepath.Join(\"templates\", \"layout.html\")\n    fp := filepath.Join(\"templates\", filepath.Clean(r.URL.Path))\n\n    // Return a 404 if the template doesn't exist\n    info, err := os.Stat(fp)\n    if err != nil {\n        if os.IsNotExist(err) {\n            http.NotFound(w, r)\n            return\n        }\n    }\n\n    // Return a 404 if the request is for a directory\n    \n    if info.IsDir() {\n        http.NotFound(w, r)\n        return\n    }\n\n    tmpl, err := template.ParseFiles(lp, fp)\n    if err != nil {\n        // Log the detailed error log.Println(err.Error())\n        // Return a generic \"Internal Server Error\" message\n        http.Error(w, http.StatusText(500), 500)\n        return\n    }\n\n    if err := tmpl.ExecuteTemplate(w, \"layout\", nil); err != nil {\n        log.Println(err.Error())\n        http.Error(w, http.StatusText(500), 500)\n    }\n}";
    // var pythonCode = "from PyQt5.QtWidgets import *\nimport sys\n\n\nclass Window(QMainWindow):\n    def __init__(self):\n        super().__init__()\n\n        # set the title of main window\n        self.setWindowTitle('My first window - www.luochang.ink')\n\n        # set the size of window\n        self.Width = 500\n        self.height = int(0.618 * self.Width)\n        self.resize(self.Width, self.height)\n\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    ex = Window()\n    ex.show()\n    sys.exit(app.exec_())";
    // var jsCode = "// Open or close the navbar\n\nfunction openNav() {\n  on();\n  document.getElementById(\"mySidenav\").style.width = \"40%\";\n  document.body.style.backgroundColor = \"rgba(0,0,0,0.5)\";\n}\nfunction closeNav() {\n  document.getElementById(\"mySidenav\").style.width = \"0\";\n  document.body.style.backgroundColor = \"white\";\n}\nfunction on() {\n  document.getElementById(\"overlay\").style.display = \"block\";\n}\nfunction off() {\n  closeNav();\n  document.getElementById(\"overlay\").style.display = \"none\";\n}";
    // var javaCode = "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        ListNode p, q, pre;\n        ListNode headNode = new ListNode(0);\n        headNode.next = head; \n        p = head;\n        if ( p == null || p.next == null ) return headNode.next;\n        q = head.next;\n        pre = headNode;\n        while (p != null & p.next != null) {\n            p.next = q.next;\n            q.next = p;\n            pre.next = q;\n            p = p.next;\n            if (p == null) break;\n            q = p.next;\n            pre = pre.next.next;\n        }\n        return headNode.next;\n    }\n}";
    var htmlCode = "<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<title>What time is it?<" + "/title>\n<style type=\"text/css\">\n	body {\n		font-family: \"Source Han Sans\", \"San Francisco\", \"PingFang SC\", \"Hiragino Sans GB\", \"Droid Sans Fallback\", \"Microsoft YaHei\", \"sans-serif\";\n		font-size: 14px;\n		color: #333;\n	}\n	p {\n		margin: 1em 0;\n	}\n	p:empty {\n		height: 1.5em;\n	}\n	main {\n		margin: 0 5em;\n		max-width: 48em;\n	}\n	h1 {\n		margin: 1em 0;\n		font-size: 24px;\n		font-weight: 300;\n	}\n	button {\n		background: #fff;\n		border: 1px solid #ccc;\n		border-radius: 2px;\n		line-height: 1;\n		padding: .5em;\n	}\n<" + "/style>\n<" + "/head>\n\n<body>\n<main>\n		\n	<h1>What time is it?<" + "/h1>\n	<p>© 2019 Chang Luo<" + "/p>\n	<hr>\n	\n	<p>Excuse me, what time is it now O_O ???<" + "/p>\n	<br>\n	\n	<button type=\"button\" onclick=\"document.getElementById('time').innerHTML = Date()\">\n		Click Me\n	<" + "/button>\n\n	<p id=\"time\"><" + "/p>\n	\n<" + "/main>" + "\n<script" + ">\n	console.log('Hi there! Welcome to Monaco Speech Editor.');\n	console.log('Monaco Speech Editor is an open source web application.');\n	console.log('The repo address is https://github.com/luochang212/monaco-speech-editor');\n	console.log(\"If you like this web application or think it's useful,\");\n	console.log('could you give me a star on GitHub (●°u°●)​ 」');\n<" + "/script>" + "\n<" + "/body>\n<" + "/html>"
    var noCode = "";


    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    });
    monaco.editor.setTheme('myTheme');



    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
            // fontSize: editorFontSize
            // theme: "vs-dark"
        });
        editorArray.push(editor);
        // console.log(editor.language);
        return editor;
    }

    /**
    * ============================================================================
    *                                   (/^▽^)/
    *                                EVENT LISTENER!
    * ============================================================================
    */

    document.getElementById("speak-document").addEventListener("click", function () {
        speakDocument();
    });
    document.getElementById("speak-by-line").addEventListener("click", function () {
        speakByLineFunc();
    });
    document.getElementById("stop-speaking").addEventListener("click", function () {
        doStop();
        musicIndex = false;
    });
    document.getElementById("search-cursor-position").addEventListener("click", function () {
        cursorPosition();
    });
    document.getElementById("cursor-jump-to-line").addEventListener("click", function () {
        clickJumpToLine();
    });
    document.getElementById("backward").addEventListener("click", function () {
        backward();
    });
    document.getElementById("play").addEventListener("click", function () {
        play();
    });
    document.getElementById("forward").addEventListener("click", function () {
        forward();
    });
    document.getElementById("hide-header").addEventListener("click", function () {
        hideHeader();
    });
    document.getElementById("find-deleted-files").addEventListener("click", function () {
        findDeletedFiles();
    });
    document.getElementById("load-demo").addEventListener("click", function () {
        loadDemo();
    });
    document.getElementById("night-mode-input").addEventListener("click", function () {
        if (document.getElementById("night-mode-input").checked == true) {
            monaco.editor.setTheme('vs-dark');
            document.getElementById("toolbar").style.background = "#333";
            document.getElementById("toolbar").style.color = "#FFFFF0";
            document.getElementById("console-bar").style.background = "#333";
            var btn_bar = document.getElementById('console-button-bar');
            for (var i = 0; i < btn_bar.children.length; i++) {
                btn_bar.children[i].style.color = "#FFF";
            }
        } else {
            monaco.editor.setTheme('myTheme');
            document.getElementById("toolbar").style.background = "#F5F5F5";
            document.getElementById("toolbar").style.color = "#000000";
            document.getElementById("console-bar").style.background = "#F5F5F5";
            var btn_bar = document.getElementById('console-button-bar');
            for (var i = 0; i < btn_bar.children.length; i++) {
                btn_bar.children[i].style.color = "inherit";
            }
        }
    });
    document.getElementById("console-button").addEventListener("click", function () {
        hideConsole();
        if (consoleToggle == "s") {
            run();
        }
    });
    document.getElementById("console-button-run").addEventListener("click", function () {
        run();
    });
    document.getElementById("console-button-open-tab").addEventListener("click", function () {
        openInNewTab();
    });
    document.getElementById("console-button-open-window").addEventListener("click", function () {
        openInNewWindow();
    });
    document.getElementById("character-mode-input").addEventListener("click", function () {
        document.getElementById("code-mode-input").checked = false;
        document.getElementById("overview-mode-input").checked = false;
        document.getElementById("music-mode-input").checked = false;
        if (document.getElementById("character-mode-input").checked === true) {
            modeController = 'charSpeak';
        } else {
            modeController = 'easySpeak';
        }
        // console.log(modeController);
    });
    document.getElementById("code-mode-input").addEventListener("click", function () {
        document.getElementById("character-mode-input").checked = false;
        document.getElementById("overview-mode-input").checked = false;
        document.getElementById("music-mode-input").checked = false;
        if (document.getElementById("code-mode-input").checked === true) {
            modeController = 'codeSpeak';
        } else {
            modeController = 'easySpeak';
        }
        // console.log(modeController);
    });
    document.getElementById("music-mode-input").addEventListener("click", function () {
        document.getElementById("code-mode-input").checked = false;
        document.getElementById("character-mode-input").checked = false;
        document.getElementById("overview-mode-input").checked = false;
        if (document.getElementById("music-mode-input").checked === true) {
            modeController = 'musicSpeak';
        } else {
            modeController = 'easySpeak';
        }
        // console.log(modeController);
    });
    document.getElementById("overview-mode-input").addEventListener("click", function () {
        document.getElementById("code-mode-input").checked = false;
        document.getElementById("character-mode-input").checked = false;
        document.getElementById("music-mode-input").checked = false;
        if (document.getElementById("overview-mode-input").checked === true) {
            modeController = 'overSpeak';
        } else {
            modeController = 'easySpeak';
            musicToggle = false;
        }
        // console.log(modeController);
    });
    document.getElementById("result-area-input").addEventListener("click", function () {
        document.getElementById("log-area-input").checked = false;
        if (document.getElementById("result-area-input").checked === true) {
            document.getElementById("console-result").style.width = '0';
            document.getElementById("console-log").style.left = '0';
        } else {
            document.getElementById("console-result").style.width = 'calc((100vw - 50px)*0.6)';
            document.getElementById("console-log").style.left = 'calc((100vw - 50px)*0.6)';
        }
    });
    document.getElementById("log-area-input").addEventListener("click", function () {
        document.getElementById("result-area-input").checked = false;
        if (document.getElementById("log-area-input").checked === true) {
            document.getElementById("console-log").style.left = '100vw';
            document.getElementById("console-result").style.width = '100%';
        } else {
            document.getElementById("console-result").style.width = 'calc((100vw - 50px)*0.6)';
            document.getElementById("console-log").style.left = 'calc((100vw - 50px)*0.6)';
        }
    });
    document.getElementById("voice-feedback-input").addEventListener("click", function () {
        if (document.getElementById("voice-feedback-input").checked === true) {
            voiceFbToggole = true;
        } else {
            voiceFbToggole = false;
        }
    });
    document.getElementById("audio-tutorial").addEventListener("click", function () {
        // var val = 'Here is a short introduction about Monaco Speech Editor. Press control, alt and s, if you want to stop this audio. Monaco Speech Editor is an online code editor for visually impaired people. It provides several built-in functions to make it easy to read code. For example, you can play the synthetic speech of current code line by pressing control, option and p on Mac or control, alt and p on window. Play next code line by pressing control, alt and arrow down key. Play previous code line by pressing control alt and arrow up key. If you want it to speak the whole document, please press control alt and d. Moreover, Monaco Speech Editor provides three modes to meet the different needs of reviewing code. There are character mode, code mode and overview mode. If you want to get accurate information about your code, you should use character mode, it will read every symbol, such as bracket or space. Code mode provides regular content of your code, some less important elements will be ignored. Overview mode will provide the outline information of this code line or this document, depending on your choice. Except powerful audio player, Monaco Speech Editor also provides incredible support in terms of file management. You can upload, download, add a new file, delete a file, change the file name by the build-in file manager. If you delete a file accidentally, you can recover the file by trash before you refresh current webpage. In addition, Monaco Speech Editor can also compile html file, It will render the html file in an iframe at the lower left corner of the editor. It can also output the result of consile dot log in an iframe at the lower right corner of the editor. There are many useful functionality, like using router to load setting. It will be introduced in my thesis. please enjoy and have fun. Thanks for listening.';
        var val = "Welcome to Monaco Speech Editor! If you want to stop this audio, please press control, alt, and S, in windows system, or press control, option and S, on mac system. Monaco Speech Editor is an online code editor for visually impaired people. It provides several built-in functions to make it easy to read, edit and compile code. If you want to explore these features, please press control, option, and I, to open linear index.  Linear index is a feature list. When you open linear index,  please press arrow, up, or arrow down key to select the feature. Once a feature is selected, It will tell you the feature name and hotkey automatically. If you want to explore the setting of Monaco speech editor, please press control, option, and space to open spotlight. Spotlight is a list of setting. When you open spotlight, you can press arrow, up, or arrow down key to select different setting, press arrow left or arrow right key to toggle the switch. Considering that the spotlight won't tell you the status of a setting automatically when you toggle the switch. My advice is to open the voice cue. If you want to open voice cue, please open spotlight first, then press arrow left or arrow right key. If you want to quit spotlight or linear index, please press any key except direction keys. This is the end of the quick start, please enjoy yourself!";
        easySpeak(val);
    });
    document.getElementById("open-console-input").addEventListener("click", function () {
        document.getElementById('console-button').click();
    });
    document.getElementById("speak-console-result").addEventListener("click", function () {
        var doc = getIframeDocument('result-iframe');
        var content = doc.body.innerText;
        // 暂时只能用easySpeak来念
        if (content == '') {
            easySpeak('console result is empty');
        } else {
            easySpeak(content);
        }
    });
    document.getElementById("speak-console-log").addEventListener("click", function () {
        var doc = getIframeDocument('log-iframe');
        var logger = doc.getElementById('logger');
        if (logger == null) {
            easySpeak('console log is empty');
        } else {
            easySpeak(logger.innerText);
        }
    });
    var mute = false;
    document.getElementById("mute-input").addEventListener("click", function () {
        if (document.getElementById("mute-input").checked === true) {
            mute = true;
        } else {
            mute = false;
        }
    });
    // 自动resize monaco editor组件大小
    // setTimeout的时间和动画时间有关，动画时间是.2s, 所以setTimeout时间必须大于200
    window.addEventListener('resize', () => {
        myEditor.layout();
        setTimeout(() => { myEditor.layout() }, 300);
    });
    document.getElementById("left-nav-button-1").addEventListener("click", e => {
        clickLeftNav(e, 'sidebar-1');
        for (i = 0; i < 250; i = i + 1) {
            setTimeout(() => { myEditor.layout() }, i);
        }
    });
    document.getElementById("left-nav-button-2").addEventListener("click", e => {
        clickLeftNav(e, 'sidebar-2');
        for (i = 0; i < 250; i = i + 1) {
            setTimeout(() => { myEditor.layout() }, i);
        }
    });
    document.getElementById("left-nav-button-3").addEventListener("click", e => {
        clickLeftNav(e, 'sidebar-3');
        for (i = 0; i < 250; i = i + 1) {
            setTimeout(() => { myEditor.layout() }, i);
        }
    });
    document.getElementById("left-nav-button-4").addEventListener("click", e => {
        clickLeftNav(e, 'sidebar-4');
        for (i = 0; i < 250; i = i + 1) {
            setTimeout(() => { myEditor.layout() }, i);
        }
    });







    // ------------------------------------------------------------------------------------------------------------------
    // 在这里输入spot light 成员
    var SLNameArray = ['voice-cue-input', 'character-mode-input', 'code-mode-input', 'music-mode-input', 'overview-mode-input', 'voice-feedback-input', 'night-mode-input', 'open-console-input', 'log-area-input', 'result-area-input'];

    var topPos;  // = document.getElementById('spot-light-1').offsetTop;
    var innerElementHeight;
    var innerElementNumber; // = SLArray.length;  // 元素总数
    var elementVisibleNumber = 3; // 可见元素数量
    var selectElemIndex = 1; // 选中元素序号
    var scrollDownDistance = 0; // 滑动的距离
    var spotLightToggle = false;
    var activePosi = null;  // 鼠标焦点位置
    // ------------------------------------------------------------------------------------------------------------------
    document.getElementById("spot-light-input").addEventListener("click", function () {
        if (document.getElementById("spot-light-input").checked === true) {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("spot-light-canvas").style.display = "block";

            // 最顶和最底为空元素，滑动时不可选中
            // 滑动前把选项的选中状态，选中与否，用颜色表示，深色的表示选中，浅色表示没有选中
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
            activePosi = document.activeElement;
            activePosi.blur();


            // 除了全局init外，本函数内也需要初始化，以在第二，第三，第n次打开时运行正确
            selectElemIndex = 1; // 选中元素序号
            scrollDownDistance = 0; // 滑动的距离
            updateSLColor(1);
            speakSL(1);
            updateSLStatus();
            document.getElementById('spot-light-canvas').scrollTop = 0;


            spotLightToggle = true;



        } else {
            // 关闭的时候取消对方向键的监听
            // document.removeEventListener("keyup", 
            //     SLReact(e)
            // );
            spotLightToggle = false;
        }
    });

    // 之前出bug了，是因为监听器放在监听器里，add监听并不是开启监听
    // 监听器的嵌套会导致加了很多个监听器，会出奇怪的bug
    // 监听键盘方向键
    document.addEventListener("keydown", (e) => {
        if (spotLightToggle === true) {
            // e.preventDefault()
            SLReact(e);
        } else if (LinearIndexToggle === true) {
            // e.preventDefault()
            LIReact(e);
        }
    });

    // 监听方向键的函数
    function SLReact(e) {
        // e.preventDefault();
        // console.log()
        topPos = document.getElementById('spot-light-1').offsetTop;
        innerElementHeight = document.getElementById('spot-light-1').offsetHeight;
        innerElementNumber = SLNameArray.length;
        // console.log(innerElementHeight);
        // e.preventDefault();

        if (e.which == 37) {
            // 左键
            // 左右键改变状态
            // 因为只有开和关两种状态，所以左右键是等价的，功能都一样
            // 处理按下左键触发的事件
            // 模拟点击该选项
            document.getElementById(SLNameArray[selectElemIndex - 1]).click();
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
            document.getElementById('spot-light-canvas').scrollTop = topPos + scrollDownDistance;
        } else if (e.which == 39) {
            // 右键
            // 处理按下右键触发的事件
            // 模拟点击该选项
            // console.log('1', selectElemIndex);
            document.getElementById(SLNameArray[selectElemIndex - 1]).click();
            updateSLStatus();
        } else if (e.which == 40) {
            // 下键

            // console.log("hi")
            // document.getElementById("spot-light-top-elem").style.top = "50px;"
            // document.getElementById("spot-light-top-elem").scrollTop = "15";
            // console.log(document.getElementById("spot-light-2").scrollTop);

            // 滑动距离限制
            // if ((scrollDownDistance + innerElementHeight) < (innerElementNumber - elementVisibleNumber) * innerElementHeight + 0.01) {  // 加了以后不能超过可以滑动的最大距离 


            if (selectElemIndex <= (innerElementNumber - 1)) {
                scrollDownDistance += innerElementHeight;
                // console.log(selectElemIndex)
                selectElemIndex += 1;
            }

            // 在上面的if控制语句之后的selectElemIndex是准确的div序号
            // 移动后更新着色
            updateSLColor(selectElemIndex);
            speakSL(selectElemIndex);
            // console.log(scrollDownDistance);
            document.getElementById('spot-light-canvas').scrollTop = topPos + scrollDownDistance;
            // var width = document.getElementById('spot-light-1').offsetWidth;
            // console.log(width);
        } else {
            // 按下除方向键之外的所有按键，关闭spot light
            document.getElementById('overlay').click();
        }
    }


    // 用于动态创建spot-light-div
    var SLArray;  // 这是全局变量
    function createSLMember(SLNameArray) {
        // init
        // spot light 成员
        var SoptLightMember = {
            name: "",
            status: false
        }
        var SLArray = [];

        // SLArray的第一个元素是空元素
        var div = document.createElement('DIV');
        var newMember = Object.create(SoptLightMember);
        newMember.name = '';
        newMember.status = false;
        SLArray.push(newMember);

        for (var i = 0; i < SLNameArray.length; i++) {
            var SLName = document.getElementById(SLNameArray[i]).parentElement.parentElement.innerText;
            var SLStatus = document.getElementById(SLNameArray[i]).checked;
            var newMember = Object.create(SoptLightMember);
            newMember.name = SLName;
            newMember.status = SLStatus;
            SLArray.push(newMember);
        }

        // SLArray的最后一个元素是空元素
        var div = document.createElement('DIV');
        var newMember = Object.create(SoptLightMember);
        newMember.name = "";
        newMember.status = false;
        SLArray.push(newMember);

        // console.log(SLArray);

        // 动态创建spot light视图
        for (var i = 0; i < SLArray.length; i++) {
            var div = document.createElement('DIV');
            div.className = 'spot-light-div';
            div.id = 'spot-light-' + (i + 1).toString(10);
            if (i != 0 && i != SLArray.length - 1) {
                div.innerText = SLArray[i].name + (SLArray[i].status ? ":  on" : ": off");
            }
            // 默认中间元素被选中
            if (i == 1) {
                div.style.backgroundColor = "#b1b1b1";
                div.style.fontSize = "28px";
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
            allDiv[i].style.fontSize = "25px";
        }
        allDiv[index].style.backgroundColor = '#b1b1b1'; // 被选中的字背景深一点
        allDiv[index].style.fontSize = "28px"; // 被选中的字字体大一点
    }

    // 阅读当前div里的文本
    function speakSL(index) {
        if (!mute) {
            var allDiv = document.getElementById('spot-light-canvas').children;
            easySpeak(allDiv[index].innerText);
        }
    }

    // 当按上下键切换时，可以打开声音提示
    // 待完成特性

    // 更新 spot light 成员状态
    // 更新整张div表
    function updateSLStatus() {
        // 更新 spot light 成员状态
        for (var i = 1; i < SLArray.length - 1; i++) {
            var SLStatus = document.getElementById(SLNameArray[i - 1]).checked;
            SLArray[i].status = SLStatus;
        }

        // 更新整张div表
        var allDiv = document.getElementById('spot-light-canvas').children;
        for (var i = 1; i < allDiv.length - 1; i++) {
            allDiv[i].innerText = SLArray[i].name + (SLArray[i].status ? ":  on" : ": off");
        }
    }

    // 点击overlay关闭spot light
    document.getElementById("overlay").addEventListener("click", function () {
        document.getElementById("spot-light-canvas").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        document.getElementById("spot-light-input").checked = false;
        spotLightToggle = false;
        // 鼠标回到原焦点
        if (activePosi != null) {
            activePosi.focus();
        }
        activePosi = null;
    });


    // linear index
    // 线性索引功能，是功能的索引，是快速查找功能的功能
    // ------------------------------------------------------------------------------------------------------------------
    // linear index 的全局变量
    var topPosLI;  // = document.getElementById('spot-light-1').offsetTop;
    var innerElementHeightLI;
    var innerElementNumberLI; // = SLArray.length;  // 元素总数
    var elementVisibleNumberLI = 3; // 可见元素数量
    var selectElemIndexLI = 1; // 选中元素序号
    var scrollDownDistanceLI = 0; // 滑动的距离
    var LinearIndexToggle = true;
    // ------------------------------------------------------------------------------------------------------------------
    // 打开linear index
    document.getElementById("linear-index-input").addEventListener("click", function () {
        if (document.getElementById("linear-index-input").checked === true) {
            document.getElementById("overlay-2").style.display = "block";
            document.getElementById("linear-index-canvas").style.display = "block";

            // 把鼠标在编辑器中的位置记下
            // 让它失焦
            activePosi = document.activeElement;
            activePosi.blur();

            // 除了全局init外，本函数内也需要初始化，以在第二，第三，第n次打开时运行正确
            selectElemIndexLI = 1; // 选中元素序号
            scrollDownDistanceLI = 0; // 滑动的距离
            updateSLColorLI(1);
            speakLI(1);
            document.getElementById('linear-index-canvas').scrollTop = 0;

            LinearIndexToggle = true;
            // console.log(LinearIndexToggle)
        } else {
            LinearIndexToggle = false;
        }
    });


    // linear index 和 spot light 共用一个监听器
    var LinearIndexToggle = false;
    function LIReact(e) {
        topPosLI = document.getElementById('linear-index-1').offsetTop;
        innerElementHeightLI = document.getElementById('linear-index-1').offsetHeight;
        innerElementNumberLI = document.getElementById('linear-index-canvas').children.length - 2;

        if (e.which == 38) {
            // 上键
            // 滑动距离限制
            if (selectElemIndexLI > 1) {
                scrollDownDistanceLI -= innerElementHeightLI;
                selectElemIndexLI -= 1;
            }
            document.getElementById('linear-index-canvas').scrollTop = topPosLI + scrollDownDistanceLI;
            // 在上面的if控制语句之后的selectElemIndex是准确的div序号
            // 移动后更新着色
            updateSLColorLI(selectElemIndexLI);
            // 移动后自动自动念出该条目的名字以及快捷方式
            speakLI(selectElemIndexLI);
        } else if (e.which == 40) {
            // 下键
            // 滑动距离限制
            if (selectElemIndexLI <= (innerElementNumberLI - 1)) {
                scrollDownDistanceLI += innerElementHeightLI;
                selectElemIndexLI += 1;
            }
            document.getElementById('linear-index-canvas').scrollTop = topPosLI + scrollDownDistanceLI;
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
            allDiv[i].style.fontSize = "25px";
        }
        allDiv[index].style.backgroundColor = '#b1b1b1'; // 被选中的字背景深一点
        allDiv[index].style.fontSize = "28px"; // 被选中的字字体大一点
    }

    // 移动后自动自动念出该条目的名字以及快捷方式
    function speakLI(index) {
        if (!mute) {
            var allDiv = document.getElementById('linear-index-canvas').children;
            var fullName = allDiv[index].innerText;
            var realName = fullName.split('(').shift();
            var realhotKey = fullName.split('+').pop().replace(")", "");
            easySpeak(realName + ', hot key is control, alt and ' + realhotKey + ', In windows systems. On Mac systems, hot key is control, option and ' + realhotKey);
        }
    }

    // 关闭 linear index
    document.getElementById("overlay-2").addEventListener("click", function () {
        document.getElementById("linear-index-canvas").style.display = "none";
        document.getElementById("overlay-2").style.display = "none";
        document.getElementById("linear-index-input").checked = false;
        LinearIndexToggle = false;
        doStop();
        // 鼠标回到原焦点
        if (activePosi != null) {
            activePosi.focus();
        }
        activePosi = null;
    });



    // voice cue
    var voiceCueToggle = false;
    document.getElementById("voice-cue-input").addEventListener("click", function () {
        if (document.getElementById("voice-cue-input").checked === true) {
            voiceCueToggle = true;
        } else {
            voiceCueToggle = false;
            easySpeak('close voice cue');
        }
    });

    // click switch
    document.getElementById('sidebar-4').addEventListener("click", function (evt) {
        if (voiceCueToggle == true) {
            if (evt.target.tagName == "INPUT" && evt.target.id != 'rate' && evt.target.id != 'pitch') {
                if (evt.target.checked == true) {
                    // console.log(evt.target.parentElement.parentElement.innerText)
                    easySpeak('open' + evt.target.parentElement.parentElement.innerText);
                } else if (evt.target.checked == false) {
                    easySpeak('close' + evt.target.parentElement.parentElement.innerText);
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
        allBtns[i].addEventListener("mouseover", function (evt) {
            if (voiceCueToggle == true) {
                easySpeak(this.innerText + 'button');
            }
        });
    }
    // hover span
    for (var i = 0; i < allSpans.length; i++) {
        allSpans[i].addEventListener("mouseover", function (evt) {
            if (voiceCueToggle == true) {
                easySpeak(this.innerText);
            }
        });
    }

    // 手动加的提示音
    // click
    document.getElementById('left-nav-button-1').addEventListener("click", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('you click explorer navigation button');
        }
    });
    document.getElementById('left-nav-button-2').addEventListener("click", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('you click upload navigation button');
        }
    });
    document.getElementById('left-nav-button-3').addEventListener("click", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('you click feature list navigation button');
        }
    });
    document.getElementById('left-nav-button-4').addEventListener("click", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('you click setting navigation button');
        }
    });
    document.getElementById('editable-textarea').addEventListener("dblclick", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('you can modify the file name now, click outside of the text box to submit your input.');
        }
    });

    // mouseover
    document.getElementById('left-nav-button-1').addEventListener("mouseover", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('explorer navigation button');
        }
    });
    document.getElementById('left-nav-button-2').addEventListener("mouseover", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('upload navigation button');
        }
    });
    document.getElementById('left-nav-button-3').addEventListener("mouseover", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('feature list navigation button');
        }
    });
    document.getElementById('left-nav-button-4').addEventListener("mouseover", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('setting navigation button');
        }
    });
    document.getElementById('editable-textarea').addEventListener("mouseover", function (evt) {
        if (voiceCueToggle == true) {
            easySpeak('file name text area, double click to modify the file name');
        }
    });


    /* ------------------------------------------------------------------------ */
    // require(['vs/editor/editor.main'], function() {

    //     monaco.editor.defineTheme('myTheme', {
    //         base: 'vs',
    //         inherit: true,
    //         rules: [{ background: 'EDF9FA' }],
    //         colors: {
    //             // 'editor.foreground': '#000000',
    //             // 'editor.background': '#EDF9FA',
    //             // 'editorCursor.foreground': '#8B0000',
    //             'editor.lineHighlightBackground': '#0000FF20',
    //             // 'editorLineNumber.foreground': '#008800',
    //             // 'editor.selectionBackground': '#88000030',
    //             // 'editor.inactiveSelectionBackground': '#88000015'
    //         }
    //     });
    //     monaco.editor.setTheme('myTheme');

    //     editor = monaco.editor.create(document.getElementById('container'), {
    //         value: [defaultValue].join('\n'),
    //         language: 'javascript',
    //         wordWrap: "on",   //自动换行，注意大小写
    //         wrappingIndent: "indent",
    //         // lineNumbers: "off",
    //         // roundedSelection: false,
    //         // scrollBeyondLastLine: false,
    //         readOnly: false,
    //         // theme: "vs-dark",
    //         // language: "text/plain",
    //         // fontFamily: "Arial",
    //         fontSize: editorFontSize
    //     });

    //     // var value = editor.getModel().getLineContent(1)
    //     // var value = editor.getModel().getLineContent(editor.getPosition().lineNumber)
    // });
    /* ------------------------------------------------------------------------ */

    /**
    * ============================================================================
    *                                 ヽ/❀o ل͜ o\ﾉ
    *                               SPEECH SYNTHESIS!!!
    * ============================================================================
    */

    function easySpeak(val) {
        doStop();
        inputTxt = val;
        speak();
    }

    // 模式控制器，全局变量，始终只有一个值（废话）
    var modeController = 'easySpeak';

    // character mode
    function charSpeak(val) {
        var res = '';
        for (var i = 0; i < val.length; i++) {
            var temp = val[i];
            switch (temp) {
                case ' ':
                    temp = "space";
                    break;
                case '!':
                    temp = "exclamation mark";
                    break;
                case '\"':
                    temp = "quotation mark";
                    break;
                case '#':
                    temp = "number sign";
                    break;
                case '$':
                    temp = "dollar sign";
                    break;
                case '%':
                    temp = "percent sign";
                    break;
                case '&':
                    temp = "ampersand";
                    break;
                case '\'':
                    temp = "apostrophe";
                    break;
                case '(':
                    temp = "left parenthesis";
                    break;
                case ')':
                    temp = "right parenthesis";
                    break;
                case '*':
                    temp = "asterisk";
                    break;
                case '+':
                    temp = "plus sign";
                    break;
                case ',':
                    temp = "comma";
                    break;
                case '-':
                    temp = "hyphen";
                    break;
                case '.':
                    temp = "full stop";
                    break;
                case '/':
                    temp = "solidus";
                    break;
                case ':':
                    temp = "colon";
                    break;
                case ';':
                    temp = "semicolon";
                    break;
                case '<':
                    temp = "less than sign";
                    break;
                case '=':
                    temp = "equals sign";
                    break;
                case '>':
                    temp = "greater than sign";
                    break;
                case '?':
                    temp = "question mark";
                    break;
                case '@':
                    temp = "at sign";
                    break;
                case 'A':
                    temp = "capital a";
                    break;
                case 'B':
                    temp = "capital b";
                    break;
                case 'C':
                    temp = "capital c";
                    break;
                case 'D':
                    temp = "capital d";
                    break;
                case 'E':
                    temp = "capital e";
                    break;
                case 'F':
                    temp = "capital f";
                    break;
                case 'G':
                    temp = "capital g";
                    break;
                case 'H':
                    temp = "capital h";
                    break;
                case 'I':
                    temp = "capital i";
                    break;
                case 'J':
                    temp = "capital j";
                    break;
                case 'K':
                    temp = "capital k";
                    break;
                case 'L':
                    temp = "capital l";
                    break;
                case 'M':
                    temp = "capital m";
                    break;
                case 'N':
                    temp = "capital n";
                    break;
                case 'O':
                    temp = "capital o";
                    break;
                case 'P':
                    temp = "capital p";
                    break;
                case 'Q':
                    temp = "capital q";
                    break;
                case 'R':
                    temp = "capital r";
                    break;
                case 'S':
                    temp = "capital s";
                    break;
                case 'T':
                    temp = "capital t";
                    break;
                case 'U':
                    temp = "capital u";
                    break;
                case 'V':
                    temp = "capital v";
                    break;
                case 'W':
                    temp = "capital w";
                    break;
                case 'X':
                    temp = "capital x";
                    break;
                case 'Y':
                    temp = "capital y";
                    break;
                case 'Z':
                    temp = "capital z";
                    break;
                case '[':
                    temp = "left square bracket";
                    break;
                case '\\':
                    temp = "reverse solidus";
                    break;
                case ']':
                    temp = "right square bracket";
                    break;
                case '^':
                    temp = "circumflex accent";
                    break;
                case '_':
                    temp = "low line";
                    break;
                case '`':
                    temp = "grave accent";
                    break;
                case '{':
                    temp = "left curly bracket";
                    break;
                case '|':
                    temp = "vertical line";
                    break;
                case '}':
                    temp = "right curly bracket";
                    break;
                case '~':
                    temp = "tilde";
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
                    temp = " exclamation ";
                    break;
                case '\"':
                    temp = " quotation ";
                    break;
                case '#':
                    temp = " number sign ";
                    break;
                case '$':
                    temp = " dollar sign ";
                    break;
                case '%':
                    temp = " percent ";
                    break;
                case '&':
                    temp = " ampersand ";
                    break;
                case '\'':
                    temp = " apostrophe ";
                    break;
                case '(':
                    temp = " left parenthesis ";
                    break;
                case ')':
                    temp = " right parenthesis ";
                    break;
                case '*':
                    temp = " asterisk ";
                    break;
                case '+':
                    temp = " plus ";
                    break;
                case ',':
                    temp = " comma ";
                    break;
                case '-':
                    temp = " hyphen ";
                    break;
                case '.':
                    temp = " full stop ";
                    break;
                case '/':
                    temp = " solidus ";
                    break;
                case ':':
                    temp = " colon ";
                    break;
                case ';':
                    temp = " semicolon ";
                    break;
                case '<':
                    temp = " less than ";
                    break;
                case '=':
                    temp = " equals ";
                    break;
                case '>':
                    temp = " greater than ";
                    break;
                case '?':
                    temp = " question mark ";
                    break;
                case '@':
                    temp = " at ";
                    break;
                case '[':
                    temp = " left square bracket ";
                    break;
                case '\\':
                    temp = " reverse solidus ";
                    break;
                case ']':
                    temp = " right square bracket ";
                    break;
                case '^':
                    temp = " circumflex accent ";
                    break;
                case '_':
                    temp = " low line ";
                    break;
                case '`':
                    temp = " grave accent ";
                    break;
                case '{':
                    temp = " left curly bracket ";
                    break;
                case '|':
                    temp = " vertical line ";
                    break;
                case '}':
                    temp = " right curly bracket ";
                    break;
                case '~':
                    temp = " tilde ";
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
        value: "",
        isSymbol: false
    }

    function findSymbolIndex(val) {
        // 文本预处理
        // 建一个数组用来存代码段
        // 当遇到一个符号时，返回符号在val中的index，然后再在符号的前后进行切割，再把切割后的代码段存放进数组里
        var codeArray = [];
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
            setTimeout(() => { audio_1.play(); }, 250)  // 125 250
            audio_2 = document.getElementById(audio_id_2);
            audio_2.play();
            audio_2.onended = function () {  // 这里的audio_2 换成audio_1会念乱码
                playNext()
            };
        } else {
            audio_2 = document.getElementById(audio_id_2);
            audio_2.play();
            audio_2.onended = function () {
                playNext()
            };
        }
    }


    var musicIndex = 0;
    var musicToggle = false;
    var wordArray;
    function musicSpeak(val) {
        // 把回车去掉
        val = val.replace(/(\r\n|\n|\r)/gm, "");

        wordArray = createWordArray(val);  // 带判断是否是特殊符号的字符串集合

        // 除非上一段语音结束，否则不能播放下一段
        musicIndex = 0;
        musicToggle = true;
        easySpeak(' ');
        // console.log(musicToggle)
    }

    // code music 功能在一次播放中要调用好多次easySpeak
    // 而且是在一次播放完毕以后，自动播放下一段
    // 因此，我们需要加一个变量监听器，来监听上一段语音是否已经播放完毕了
    function playNext() {
        // console.log('hiii');
        if (musicIndex < wordArray.length && musicToggle == true) {
            if (wordArray[musicIndex].isSymbol == false) {
                // code spaek
                // console.log(wordArray[musicIndex].value);
                easySpeak(codeSpeak(wordArray[musicIndex].value));
            } else {
                CreateMusic(wordArray[musicIndex].value);
            }
            musicIndex++;
            if (musicIndex == wordArray.length) {
                musicToggle = false;
                // console.log(musicToggle);
            }
        }
    }


    // overview mode
    function overDocSpeak() {
        var index = findActiveEditor();
        var file_name = fileArray[index - 1].fileName;
        var max_line = myEditor.getModel().getLineCount();
        var char_count = myEditor.getValue().length;
        // + how many functions, how many variables
        var res = 'the filename is ' + file_name + ' the row count is ' + max_line + '  and there are ' + char_count + 'characters in this file ';
        return res;
    }

    function overLineSpeak(line_number) {
        var char_count = myEditor.getModel().getLineContent(line_number).length;
        // + 变量的数量，是否在函数里，是否在控制结构里 this line belong to function blablabla
        var res = 'This is line ' + line_number + ' This line have ' + char_count + ' characters ';
        return res;
    }

    // 这个api还是不会用，蛋疼 provideDocumentSymbols
    // function testSymbol() {
    //     var token = '';
    //     var x;
    //     // console.log( monaco.languages.getEncodedLanguageId() );
    //     // console.log( monaco.languages.provideDocumentSymbols() );
    //     // console.log(x);
    //     console.log( myEditor.getModel().DocumentSymbol )
    // }

    function speakDocument() {
        // console.log(myEditor);
        if (modeController == 'easySpeak') {
            easySpeak(myEditor.getValue());
        } else if (modeController == 'charSpeak') {
            easySpeak(charSpeak(myEditor.getValue()));
        } else if (modeController == 'codeSpeak') {
            easySpeak(codeSpeak(myEditor.getValue()));
        } else if (modeController == 'overSpeak') {
            easySpeak(overDocSpeak());
        } else if (modeController == 'musicSpeak') {
            musicSpeak(myEditor.getValue());
        } else {
            console.log('Something wrong in speakDocument()');
        }
    }

    function speakByLine(line_number) {
        if (modeController == 'easySpeak') {
            easySpeak(myEditor.getModel().getLineContent(line_number));
        } else if (modeController == 'charSpeak') {
            easySpeak(charSpeak(myEditor.getModel().getLineContent(line_number)));
        } else if (modeController == 'codeSpeak') {
            easySpeak(codeSpeak(myEditor.getModel().getLineContent(line_number)));
        } else if (modeController == 'overSpeak') {
            easySpeak(overLineSpeak(line_number));
        } else if (modeController == 'musicSpeak') {
            musicSpeak(myEditor.getModel().getLineContent(line_number));
        } else {
            console.log('Something wrong in speakByLine()');
        }
    }

    function speakByLineFunc() {
        var lineNumber = prompt("Please input the line number:", "");
        if (lineNumber == null || lineNumber == "") {
            easySpeak("You didn't input anything");
            // alert("Please input something!");
        } else {
            speakByLine(lineNumber);
        }
    }

    function cursorPosition() {
        easySpeak("Line number is " + myEditor.getPosition().lineNumber + "and column number is " + myEditor.getPosition().column);
        // alert('Line number: ' + editor.getPosition().lineNumber);
    }

    // cursor focus
    function cursorJumpToLine(line_number) {
        myEditor.setSelection(new monaco.Selection(line_number, 1, line_number, 1));
        myEditor.focus();

        // a feature
        // currentLineNumber = val;
        // document.getElementById("showLineNumber").value = currentLineNumber;


        // editor.setPosition({column: 1, lineNumber: val});
        // editor.setScrollPosition({scrollTop: 0});   
        // editor.revealLine(15);
        // editor.revealLineInCenter(15);
    }

    // function jumpToPosition(x, y) {
    //     editor.setSelection(new monaco.Selection(x,y,x,y));
    //     editor.focus();
    // }

    function clickJumpToLine() {
        var lineNumber = prompt("Please input the line number:", "");
        var lineNumber_int = parseInt(lineNumber, 10);  // parseInt: string to int
        if (lineNumber == null || lineNumber == "") {
            easySpeak("You didn't input anything");
        } else if (lineNumber_int < 1 || lineNumber_int > myEditor.getModel().getLineCount()) {
            easySpeak("Your input is out of range");
        } else {
            cursorJumpToLine(lineNumber_int);
        }
    }

    // editor.onDidChangeCursorPosition(function () {
    //     document.getElementById("test").innerHTML = "ditor.getPosition().lineNumber";
    // });
    // editor.onDidChangeModelContent(e => {
    //     console.log(editor.getValue());
    // });

    var languageSelect = document.querySelector('.language-picker');

    // 语法高亮
    function syntaxHighlight(langName) {
        var index = findActiveEditor();
        monaco.editor.setModelLanguage(window.monaco.editor.getModels()[index - 1], langName)
        fileArray[index - 1].editorLanguage = langName;
        // console.log(fileArray);
    }

    languageSelect.onchange = function () {
        syntaxHighlight(languageSelect.value);
        // document.getElementById('test').innerHTML = languageSelect.value;
    }

    var currentLineNumber = 1;
    var currentColumnNumber = 1;
    var clickNumber = 0;

    // 因为变量pauseResume无法传出，故把doPauseResume函数从script.js迁来这儿
    function doPauseResume() {
        if (pauseResume == 'R') {
            window.speechSynthesis.pause();
            document.getElementById("play-pause").src = "./images/play-solid.svg";
            // document.getElementById('control-button').setAttribute("class", "play");
            pauseResume = 'P';
        } else if (pauseResume == 'P') {
            window.speechSynthesis.resume();
            document.getElementById("play-pause").src = "./images/pause-solid.svg";
            // document.getElementById('control-button').setAttribute("class", "pause");
            pauseResume = 'R';
        } else {
            console.log("Unknown state...");
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
            var utterThis = new SpeechSynthesisUtterance(inputTxt);
            utterThis.onend = function (event) {
                document.getElementById("play-pause").src = "./images/play-solid.svg";
                clickNumber = 0;
                pauseResume = 'R';
                if (musicToggle == true) {
                    playNext();
                }
                // console.log('SpeechSynthesisUtterance.onend');
            }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror');
            }
            var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');  // "Google UK English Female";
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
        window.speechSynthesis.cancel();
        return false;
    }

    function play() {
        musicToggle = false;
        var testTxt = myEditor.getModel().getLineContent(currentLineNumber);
        if (testTxt == "") {
            easySpeak("Information from monaco speech editor: " + "This line is empty");
            // alert("This line is empty.");
            return -1;
        }

        clickNumber++;
        if (clickNumber == 1) {
            // doStop();  // 没有必要，inputTxt只有一个，占用不会发生
            // 第一次点击是播放，第二第三第n次该键的功能变成播放和暂停，一行播放结束以后clickNumber归零
            pauseResume = 'R';
            speakByLine(currentLineNumber);
            document.getElementById("play-pause").src = "./images/pause-solid.svg";
        } else {
            doPauseResume();
            // console.log(clickNumber);
        }
    }

    function backward() {
        doStop();
        clickNumber = 0;
        // clickNumber = 0;
        if (currentLineNumber <= 1) {
            easySpeak("This is the first line");
            // alert("This is the first line.");
            return -1;
        } else {
            currentLineNumber--;
            cursorJumpToLine(currentLineNumber);
        }
        document.getElementById("showLineNumber").value = currentLineNumber;
    }

    function forward() {
        doStop();
        clickNumber = 0;
        // clickNumber = 0;
        // console.log(clickNumber);
        // 可恶，摩纳哥里的变量只能进不能出，我都忘了
        // 摩纳哥的这个限制让这里出了奇怪的bug
        // 啥bug呢？就是用快捷键换行的时候会迷之把play()当暂停使用，这是因为一个语音进程没有自然结束，clickNumber没有归零
        // 在doStop里手动置零就可以了
        // 整了半天才想起来这个设定
        // 我还呆呆地去script.js里加了一句clickNumber = 0;
        var maxLine = myEditor.getModel().getLineCount();
        if (currentLineNumber >= maxLine) {
            easySpeak("This is the last line");
            // alert("This is the last line.");
            return -1;
        } else {
            currentLineNumber++;
            cursorJumpToLine(currentLineNumber);
        }
        document.getElementById("showLineNumber").value = currentLineNumber;
    }

    document.getElementById("showLineNumber").addEventListener("onkeyup", handleEnter);
    document.getElementById("showLineNumber").addEventListener("change", jumpToLine);


    function jumpToLine() {
        var x = document.getElementById("showLineNumber");
        if (x.value >= 1 && x.value <= myEditor.getModel().getLineCount()) {
            currentLineNumber = x.value;
            cursorJumpToLine(parseInt(currentLineNumber, 10));
        } else {
            x.value = currentLineNumber;
            easySpeak("Your input is out of range");
            // alert("Input is out of range.");
        }
    }

    function valueChangeWithCursor() {
        var x = document.getElementById("showLineNumber");
        x.value = currentLineNumber;
    }

    function updateLineColumnNumber() {
        currentLineNumber = myEditor.getPosition().lineNumber;
        currentColumnNumber = myEditor.getPosition().column;
    }

    function showLineColumn() {
        document.getElementById("show-line-column").innerHTML = "Ln " + currentLineNumber + ", Col " + currentColumnNumber;
    }

    function updateCursorPosition() {
        updateLineColumnNumber();
        showLineColumn();
        valueChangeWithCursor();
    }

    // keyup event
    // 快捷键设置
    document.addEventListener('keyup', (e) => {
        // e.preventDefault();
        if (e.ctrlKey && e.altKey && (e.which == 80 || e.which == 13)) {
            // 播放
            // enter or p
            play();
        } else if (e.ctrlKey && e.altKey && e.which == 83) {
            // 终止
            // s
            doStop();
            musicToggle = false;
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
            document.getElementById("showLineNumber").focus();
        } else if (e.ctrlKey && e.altKey && e.which == 73) {
            // 打开linear index
            // i
            // 虽然这个失焦事件可以防止按键时光标到处跑，但当我蒙上眼睛测试以后发现，要回到焦点就真的很难
            // document.activeElement.blur();
            document.getElementById("linear-index-input").click();
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
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.which == 32) {
            // 取消对编辑器的聚焦
            // spot light
            // space
            // 虽然这个失焦事件可以防止按键时光标到处跑，但当我蒙上眼睛测试以后发现，要回到焦点就真的很难
            // document.activeElement.blur();
            document.getElementById("spot-light-input").click();
        }
    });

    // 按下enter时光标移动，从这个函数我知道了keyup和keydown的区别，这里只能用keyup
    function handleEnter() {
        if (e.keyCode == 13) {
            document.getElementById("showLineNumber").blur();
        }
    }

    /**
    * ============================================================================
    *                                 ⌒(❀>◞౪◟<❀)⌒
    *                               FILE MANAGER!!!
    * ============================================================================
    */

    // editable textarea
    function configureEditableTextarea(id, modifyClassName, readOnlyClassName) {
        var textarea = document.getElementById(id);
        textarea.ondblclick = function () {
            this.readOnly = false;
            this.className = modifyClassName;
        }
        textarea.onblur = function () {
            this.readOnly = true;
            this.className = readOnlyClassName;
            // document.getElementById("test").innerHTML = document.getElementById(id).value;
            // 找到当前激活的编辑器序号
            var index = findActiveEditor();
            // console.log(index);

            // 文件名不能为空
            if (document.getElementById(id).value == '') {
                document.getElementById(id).value = fileArray[index - 1].fileName;
            } else {
                fileArray[index - 1].fileName = document.getElementById(id).value;
                // 更新文件列表里的标题
                document.getElementById("file-list-input-" + index.toString(10)).value = fileArray[index - 1].fileName;
            }
        }

    }

    configureEditableTextarea("editable-textarea", "textarea-modify", "textarea-readonly");


    // editable textarea 2
    function configureFilenameText(id, button_id, modifyClassName, readOnlyClassName) {
        var textarea = document.getElementById(id);
        var button = document.getElementById(button_id);
        button.onclick = function () {
            textarea.readOnly = false;
            textarea.className = modifyClassName;
            textarea.focus();
            closeClickSpan = "y";
        }

        textarea.onblur = function () {
            this.readOnly = true;
            this.className = readOnlyClassName;

            // textarea.onclick=event.stopPropagation();
            var index = parseInt(id.toString(10).split('-').pop());
            // 文件名不能为空
            if (document.getElementById(id).value == '') {
                document.getElementById(id).value = fileArray[index - 1].fileName;
            } else {
                fileArray[index - 1].fileName = document.getElementById(id).value;
                // 这里的逻辑和editable textarea 2不完全相同，因为这里是一对多，一个框对多个名称
                // 标题只显示当前编辑器的名称，以下注释部分正是因为没有理解这一点而写错的
                // <del>更新编辑器顶上的那个标题，即id=editable-textarea</del>
                // document.getElementById("editable-textarea").value = fileArray[index-1].fileName;

                // 重写：每次激活编辑器，都要将题头设为fileArray[i].fileName
                // 但是，有一种情况例外，那就是正在修改的时候，没有激活，也需要变化题头
                // 判断当前正在编辑文件名的文件的标题，是不是当下激活的编辑器的标题

                // 找到当前激活的编辑器序号
                var active_index = findActiveEditor();

                if (closeClickSpan == "y" & active_index == index) {
                    document.getElementById("editable-textarea").value = fileArray[index - 1].fileName;
                }
            }
            closeClickSpan = "n";
        }

    }

    // 每次新增文件时需要运行此函数以配置文件管理器中该文件所属标签的文本框
    // configureFilenameText("filename-input-1", "edit-button-1", "filename-modify", "filename-readonly");



    // 点击span和点击span上的button事件的分离
    // 可以在不跳转编辑器的情况下修改别的编辑器的文件名
    var closeClickSpan = "n";

    document.getElementById("title-button-add").addEventListener("click", function () {
        addFile(noCode, "html", "");
        // console.log("hi");
    });


    // 重写file manager
    // UI 部分

    var fileCounter = 1;

    var trash = document.getElementsByClassName("trash");
    var editable = document.getElementsByClassName("editable");
    var input = document.getElementsByClassName("editable");
    var inputSpan = document.getElementsByClassName("input-span");
    var saveSpan = document.getElementsByClassName("save");

    var list = document.querySelector('.file-list');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI' && closeClickSpan == 'n') {
            // // 激活文件-li区
            // // 文件列表被选中的文件背景高亮
            // // 用了此方法注意其他地方不宜再用li
            // var myList = document.getElementsByTagName("LI");
            // for (var i = 0; i < myList.length; i++) {
            //     myList[i].className = myList[i].className.replace("active", "");
            // }
            // ev.target.classList.toggle('active');

            var index = parseInt(ev.target.id.toString(10).split('-').pop());
            activeEditor(index)

            // // editor跳转
            // // 被选中的文件的display设置为block，其他设为none
            // var allContainer = document.getElementsByClassName("container");
            // for (var i = 0; i < allContainer.length; i++) {
            //     allContainer[i].style.display = "none";
            // }
            // // 获取container序号(string)
            // var index = ev.target.id.toString(10).split('-').pop();
            // document.getElementById("container-" + index.toString(10)).style.display = "block";

            // // 将读屏功能相关的函数绑定到该active的editor上
            // myEditor = fileArray[parseInt(index) - 1].editor;


            // // 注册光标移动事件，每次移动触发更新
            // myEditor.onDidChangeCursorPosition((e) => {
            //     // console.log(JSON.stringify(e));
            //     updateCursorPosition();
            // });

        }
    }, false);


    function addFileView() {
        var li = document.createElement("li");
        li.id = "li-" + fileCounter.toString(10);
        // var file_name = "Untitled-" + fileCounter.toString(10);
        var file_name = fileArray[fileCounter - 1].fileName;
        var input = document.createElement("input");
        input.readOnly = true;
        input.className = "filename-readonly";
        input.id = "file-list-input-" + fileCounter.toString(10);
        input.type = "text";
        input.value = file_name;
        var input_span = document.createElement("SPAN");
        input_span.className = "input-span";
        li.appendChild(input_span);
        input_span.appendChild(input);
        document.getElementById("my-file-list").appendChild(li);

        var save_span = document.createElement("SPAN");
        save_span.className = "save";
        var img = document.createElement("IMG");
        img.src = "./images/save-solid.svg";
        img.className = "title-icon";
        save_span.appendChild(img);
        li.appendChild(save_span);

        var trash_span = document.createElement("SPAN");
        trash_span.className = "trash";
        var img = document.createElement("IMG");
        img.src = "./images/trash-alt-solid.svg";
        img.className = "title-icon";
        trash_span.appendChild(img);
        li.appendChild(trash_span);

        var edit_span = document.createElement("SPAN");
        edit_span.className = "editable";
        edit_span.id = "file-list-edit-" + fileCounter.toString(10);
        var img = document.createElement("IMG");
        img.src = "./images/pen-solid.svg";
        img.className = "title-icon";
        edit_span.appendChild(img);
        li.appendChild(edit_span);

        // 此处投机取巧，除trash以外，其他原素是借用了trash的length值，因为数值相同
        for (var i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                // 如果被删除，不再在文件列表中显示该文件
                var ThisLi = this.parentElement;
                ThisLi.style.display = "none";
                // 如果被删除，将该对象的isDelete属性设置为true
                var index = parseInt(ThisLi.id.toString(10).split('-').pop());
                fileArray[index - 1].isDelete = "true";
                // 如果被删除，更新editorContent
                fileArray[index - 1].editorContent = fileArray[index - 1].editor.getValue();
                // 如果被删除，第一个文件的li的class设为active
                // 先检查是否至少存在一个文件，如果一个文件都没有，那么新建一个
                var fileIndex;
                for (var i = 0; i < fileArray.length; i++) {
                    var isAllDelete = "y";
                    if (fileArray[i].isDelete == "false") {
                        isAllDelete = "n";
                        fileIndex = i + 1;

                        break;
                    }
                }

                if (isAllDelete == "y") {
                    // 删除时调用addFile函数，addFile函数会调用activeEditor函数，因此此处不用激活
                    addFile(noCode, "html", "");

                } else {
                    // 目前文件序列中的第一个文件的li的class设为active
                    // console.log(fileIndex);
                    activeEditor(fileIndex);
                }

            }

            inputSpan[i].onclick = function () {
                if (closeClickSpan == 'n') {
                    // // 激活文件-span区
                    // // 文件列表被选中的文件背景高亮
                    // // 用了此方法注意其他地方不宜再用li
                    // var myList = document.getElementsByTagName("LI");
                    // for (var i = 0; i < myList.length; i++) {
                    //     myList[i].className = myList[i].className.replace("active", "");
                    // }
                    // var ThisLi = this.parentElement;
                    // ThisLi.classList.toggle('active');

                    var ThisLi = this.parentElement;
                    var index = parseInt(ThisLi.id.toString(10).split('-').pop());
                    activeEditor(index);

                    // // editor跳转
                    // // 被选中的文件的display设置为block，其他设为none
                    // var allContainer = document.getElementsByClassName("container");
                    // for (var i = 0; i < allContainer.length; i++) {
                    //     allContainer[i].style.display = "none";
                    // }
                    // // 获取container序号(string)
                    // var index = ThisLi.id.toString(10).split('-').pop();
                    // document.getElementById("container-" + index).style.display = "block";

                    // // 将读屏功能相关的函数绑定到该active的editor上
                    // myEditor = fileArray[parseInt(index) - 1].editor;

                    // // 注册光标移动事件，每次移动触发更新
                    // myEditor.onDidChangeCursorPosition((e) => {
                    //     // console.log(JSON.stringify(e));
                    //     updateCursorPosition();
                    // });
                }
            }

            saveSpan[i].onclick = function () {
                var ThisLi = this.parentElement;
                var index = parseInt(ThisLi.id.toString(10).split('-').pop());
                save(index);
            }

            configureFilenameText("file-list-input-" + (i + 1).toString(10), "file-list-edit-" + (i + 1).toString(10), "filename-modify", "filename-readonly");
        }

    }

    // 用面向对象的方法控制页面切换
    // 初始化变量
    var Files = {
        fileId: "",
        fileName: "",
        isDelete: "false",
        isActive: "",
        editor: null,
        editorContent: "",
        editorLanguage: ""
    };

    var fileArray = [];

    // 在文件列表里新增一个文件，先新增对象，然后刷新视图
    function addFile(code, language, fn) {

        // console.log(fileCounter);
        // 新建一个container
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        // console.log(fileCounter);
        new_container.className = "container";
        // 判断是否处于full screen
        if (headerHidden == "y") {
            new_container.style.top = "28px";
        } else {
            new_container.style.top = "78px";
        }
        // 判断sidebar是否打开
        if (leftSidebarStatus == "o") {
            new_container.style.left = "300px";
        } else {
            new_container.style.left = "50px";
        }
        document.getElementById("monaco-speech-editor").appendChild(new_container);
        // 新建一个editor
        var editor = newEditor(new_container.id, code, language);


        // 新增编辑器向右移动
        // document.getElementById("container-" + fileCounter.toString(10)).style.marginLeft = "250px";

        // 更新对象的属性
        var file = Object.create(Files);
        file.fileId = fileCounter.toString(10);
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
        fileArray.push(file);


        // 刷新文件列表
        addFileView();

        // // 将当前新增文件的文件列表的li的class设为active
        // var myList = document.getElementsByTagName("LI");
        // for (var i = 0; i < myList.length; i++) {
        //     myList[i].className = myList[i].className.replace("active", "");
        // }
        // document.getElementById('li-' + fileCounter.toString(10)).className = "active";

        var index = fileCounter;
        activeEditor(index);

        // // 将新增文件的editor的display设为block，经实验是多此一举，因为新建的editor就是出现在最上层的，但是为了保险还是做了
        // var allContainer = document.getElementsByClassName("container");
        // for (var i = 0; i < allContainer.length; i++) {
        //     allContainer[i].style.display = "none";
        // }
        // // 获取container序号(string)
        // var index = fileCounter;
        // document.getElementById("container-" + index.toString(10)).style.display = "block";

        // // 将读屏功能相关的函数绑定到该active的editor上
        // myEditor = fileArray[parseInt(index) - 1].editor;

        // // 注册光标移动事件，每次移动触发更新
        // myEditor.onDidChangeCursorPosition((e) => {
        //     // console.log(JSON.stringify(e));
        //     updateCursorPosition();
        // });

        // 文件计数器加一
        fileCounter += 1;
    }

    // var voiceFbToggole = '';
    function voiceFeedback(editor) {
        // console.log(toggle);
        // console.log('a');
        var row, col, char;
        myEditor.onDidChangeCursorPosition((e) => {
            row = myEditor.getPosition().lineNumber;
            col = myEditor.getPosition().column;
            char = myEditor.getModel().getValueInRange({
                startLineNumber: row,
                startColumn: col - 1,

                endLineNumber: row,
                endColumn: col,
            });
            // console.log(char);
            if (voiceFbToggole === 't') {
                // console.log(toggle);
                // console.log('b');
                easySpeak(charSpeak(char));
            }
        });
    }

    // 当前所在编辑器发生变化时，激活一次当前编辑器
    var voiceFbToggole = '';
    function activeEditor(index) {
        // 文件列表该文件背景高亮
        // 将当前新增文件的文件列表的li的class设为active
        // 用了此方法注意其他地方不宜再用li
        var myList = document.getElementsByTagName("LI");
        for (var i = 0; i < myList.length; i++) {
            myList[i].className = myList[i].className.replace("active", "");
        }
        document.getElementById("li-" + index.toString(10)).classList.toggle('active');

        // editor跳转
        // 被选中的文件的display设置为block，其他设为none
        var allContainer = document.getElementsByClassName("container");
        for (var i = 0; i < allContainer.length; i++) {
            allContainer[i].style.display = "none";
        }
        // 获取container序号(int)
        document.getElementById("container-" + index.toString(10)).style.display = "block";

        // 将读屏功能相关的函数绑定到该active的editor上
        myEditor = fileArray[index - 1].editor;

        // 注册光标移动事件，每次移动触发更新
        var char;
        myEditor.onDidChangeCursorPosition((e) => {
            // console.log(JSON.stringify(e));
            updateCursorPosition();
            // 输入文字时触发语音反馈 voice feedback，会念出刚刚输入的文字
            if (voiceFbToggole === true) {
                char = myEditor.getModel().getValueInRange({
                    startLineNumber: currentLineNumber,
                    startColumn: currentColumnNumber - 1,

                    endLineNumber: currentLineNumber,
                    endColumn: currentColumnNumber,
                });
                easySpeak(charSpeak(char));
            }
        });

        // 遍历所有文件，isActive设为false，然后把当前激活的editor的isActive设为true
        for (var i = 0; i < fileArray.length; i++) {
            fileArray[i].isActive = "false";
        }
        fileArray[index - 1].isActive = "true";

        // 激活时题头要设为当前的文件名
        document.getElementById("editable-textarea").value = fileArray[index - 1].fileName;

        // 激活时resize窗口大小
        myEditor.layout();

        // 激活时语法栏要设为当前model的语言
        // 暂时没找到api
        // languageSelect.value = 
        // 用取巧的办法实现
        languageSelect.value = fileArray[index - 1].editorLanguage;
    }

    function findActiveEditor() {
        // 找到当前激活的编辑器序号
        for (var i = 0; i < fileArray.length; i++) {
            if (fileArray[i].isActive == "true") {
                var index = i + 1;
                return index;
            }
        }
        return -1;
    }

    /**
    * ============================================================================
    *                               ヾ（〃＾∇＾）ﾉ♪
    *                           UPLOAD AND DOWNLOAD!!!!
    * ============================================================================
    */

    // 上传
    // dropzone
    var drop_code = "";

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

        if (location.host.indexOf("sitepointstatic") >= 0) return;

        var request = new XMLHttpRequest();
        if (request.upload) {
            // console.log("CASE 2");
            var reader = new FileReader();

            // 下面这段代码有复用，考虑写成函数
            var ext = file.name.toString().split('.').pop();
            var filename = file.name.toString().split('.').shift();
            var type;

            // 用于自动跳转语法高亮
            if (ext === "json") {
                type = "json";
            } else if (ext === "js") {
                type = "javascript";
            } else if (ext === "php") {
                type = "php";
            } else if (ext === "html") {
                type = "html";
            } else if (ext === "java") {
                type = "java";
            } else if (ext === "py") {
                type = "python";
            } else if (ext === "go") {
                type = "go";
            } else if (ext === "css") {
                type = "css";
            } else if (ext === "cpp" || ext === "C" || ext === "cxx" || ext === "c++" || ext === "cc") {
                type = "css";
            } else if (ext === "c") {
                type = "c";
            } else if (ext === "rb") {
                type = "ruby";
            } else if (ext === "sh") {
                type = "shell";
            } else if (ext === "swift") {
                type = "swift";
            } else if (ext === "ts") {
                type = "typescript";
            } else if (ext === "R") {
                type = "r";
            } else if (ext === "md") {
                type = "markdown";
            } else if (ext === "yml") {
                type = "yaml";
            } else if (ext === "xml") {
                type = "xml";
            }

            reader.readAsText(file);

            reader.onloadend = function (e) {
                drop_code = reader.result;
                if (type != null) {
                    addFile(drop_code, type, file.name.toString());
                    // languageSelect.value = type;
                } else {
                    addFile(drop_code, "html", file.name.toString());
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
        addFile(drop_code, "html", "");
        // fileArray[findActiveEditor()]
        // document.getElementById("test").innerHTML = drop_code;
    }

    function configureDropZone(zone_id) {
        var filedrag = document.getElementById(zone_id);
        filedrag.addEventListener("dragover", fileDragHover, false);
        filedrag.addEventListener("dragleave", fileDragHover, false);
        filedrag.addEventListener("drop", uploadFile, false);
    }

    configureDropZone("myDropZone");


    // upload by button
    function handleFileSelect(e) {
        getUploadText(e, updateDropCode);
    }

    function configureFileSelect(id) {
        document.getElementById(id).addEventListener('change', handleFileSelect, false);
    }

    configureFileSelect("upload");

    // download
    // 下载功能
    function save(index) {
        download(fileArray[index - 1].fileName, fileArray[index - 1].editor.getValue());

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
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // trash
    // 垃圾桶功能
    function findDeletedFiles() {
        alert("Please open the console in your browser.");
        console.log(fileArray);
    }


    // load demo
    // 从json加载示例代码
    function loadDemo() {
        // $.getJSON("https://www.luochang.ink/gadget/monaco-speech-editor/data/code.json", function(data){
        $.getJSON("./data/code.json", function (data) {
            $.each(data, function (key, val) {
                var ext = key.toString().split('.').pop();
                // var filename = key.toString().split('.').shift();
                var type;

                // 用于自动跳转语法高亮
                if (ext === "json") {
                    type = "json";
                } else if (ext === "js") {
                    type = "javascript";
                } else if (ext === "php") {
                    type = "php";
                } else if (ext === "html") {
                    type = "html";
                } else if (ext === "java") {
                    type = "java";
                } else if (ext === "py") {
                    type = "python";
                } else if (ext === "go") {
                    type = "go";
                } else if (ext === "css") {
                    type = "css";
                } else if (ext === "cpp" || ext === "C" || ext === "cxx" || ext === "c++" || ext === "cc") {
                    type = "css";
                } else if (ext === "c") {
                    type = "c";
                } else if (ext === "rb") {
                    type = "ruby";
                } else if (ext === "sh") {
                    type = "shell";
                } else if (ext === "swift") {
                    type = "swift";
                } else if (ext === "ts") {
                    type = "typescript";
                } else if (ext === "R") {
                    type = "r";
                } else if (ext === "md") {
                    type = "markdown";
                } else if (ext === "yml") {
                    type = "yaml";
                } else if (ext === "xml") {
                    type = "xml";
                }

                if (type != null) {
                    addFile(val, type, key);
                } else {
                    addFile(val, "html", key);
                }
                // 加入文件的函数是不能指定文件名的，下面这个方法取巧了，可以说是手动更新
                // var index = fileCounter - 1;
                // fileArray[index - 1].fileName = key;
                // document.getElementById("file-list-input-" + index.toString(10)).value = fileArray[index - 1].fileName;
                // document.getElementById("editable-textarea").value = fileArray[index - 1].fileName;


            });
        });
    }

    // console
    function run() {
        var text = myEditor.getValue();
        // new iframe
        newIframe("result-iframe");
        // refresh iframe
        document.getElementById("result-iframe").contentDocument.write(text);

        // logger
        // 重写console.log
        // implement it by hack way
        var injection = "<script" + ">(function (logger) {conso" + "le.old = console.log;console.log = function () {var output = \"\", arg, i;for (var i = 0; i < argu" + "ments.length; i++) {arg = argume" + "nts[i];output += \"<span class='log-\" + (typeof arg) + \"'>\";if (ty" + "peof arg === \"object\" \&" + "\&typeof JSON === \"object\" \&" + "\&typeof JSON.stringify === \"function\") {output += JSON.stringify(arg);   } else {output += arg;   }output += '<" + "/span>\&nbsp;';}logger.innerHTML += output + '<br>';console.old.apply(undefined, arguments);};})(document.getElementById('logger'));<" + "/script>";
        var hideAllElem = "<script" + ">var nodes = document.all;for(var i=0;i<nodes.length;i++){var o = nodes[i];o.style.display = 'none';}<" + "/script>";
        var showLog = "<script" + ">document.getElementsByTagName('html')[0].style.display = 'block';document.getElementsByTagName('body')[0].style.display = 'block';document.getElementById('logger').style.display = 'block'; var cn = document.getElementById('logger').childNodes;for (var i = 0; i < cn.length; i++) {cn[i].style = 'display: block;';}<" + "/script>";
        var logInput = "<link rel=\"stylesheet\" href=\"./src/style.css\">" + "<div id='logger'></div>" + injection + text + hideAllElem + showLog;
        newIframe("log-iframe");
        document.getElementById("log-iframe").contentDocument.write(logInput);
        // 防止myEditor里的代码注入导致的背景颜色变化
        document.getElementById("log-iframe").contentDocument.body.style.background = "#FFFFFF";  // "#202020";
        // document.getElementById("log-iframe").contentDocument.body.style.borderLeft = "1px solid #bbbbbb";
    }

    function newIframe(id) {
        // remove iframe
        var selectedIframe = document.getElementById(id);
        var parent = selectedIframe.parentNode;
        parent.removeChild(selectedIframe);

        // create a new iframe
        var iframe = document.createElement("iframe");
        iframe.id = id;
        parent.appendChild(iframe);
    }

    // open iframe in new window
    function openInNewWindow() {
        var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
        var text = myEditor.getValue();
        win.document.write(text);
        // win.document.body.innerHTML = text;
    }

    function openInNewTab() {
        var win = window.open("_blank");
        var text = myEditor.getValue();
        win.document.write(text);
        // win.document.body.innerHTML = text;
    }

    function getIframeDocument(iframe_id) {
        var iframe = document.getElementById(iframe_id);
        var doc = iframe.contentWindow.document;
        return doc;
    }


    var leftSidebarStatus = "c";
    var leftSidebarSelected = "";
    var leftSidebarSelect = "";


    function openLeftSideBar() {
        document.getElementById("left-sidebar").style.width = "250px";
        document.getElementById("header").style.marginLeft = "250px";
        document.getElementById("toolbar").style.marginLeft = "250px";
        document.getElementById("console-bar").style.marginLeft = "250px";
        var conta = document.getElementsByClassName("container");
        for (var i = 0; i < conta.length; i++) {
            conta[i].style.left = "300px";
        }
    }

    function closeLeftSideBar() {
        document.getElementById("left-sidebar").style.width = "0";
        document.getElementById("header").style.marginLeft = "0";
        document.getElementById("toolbar").style.marginLeft = "0";
        document.getElementById("console-bar").style.marginLeft = "0";
        var conta = document.getElementsByClassName("container");
        for (var i = 0; i < conta.length; i++) {
            conta[i].style.left = "50px";
        }

        var i, tablinks;
        tablinks = document.getElementsByClassName("left-nav-button");
        for (var i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

    }

    function clickLeftNav(evt, sidebarName) {
        // 选择对应tab的内容
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        document.getElementById(sidebarName).style.display = "block";

        tablinks = document.getElementsByClassName("left-nav-button");
        for (var i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        evt.currentTarget.className += " active";

        //控制sidebar的开关，因为closeLeftSideBar()内的语句，本节代码和上一节顺序不可对调
        leftSidebarSelected = leftSidebarSelect;
        leftSidebarSelect = sidebarName;
        if (leftSidebarStatus == "c") {
            openLeftSideBar();
            leftSidebarStatus = "o";
        } else if (leftSidebarSelected == leftSidebarSelect) {
            closeLeftSideBar();
            leftSidebarStatus = "c"
            leftSidebarSelect = "";
        }
    }

    // 全局初始化函数
    function init() {
        // 初始化spot light
        SLArray = createSLMember(SLNameArray)
        // document.getElementById("left-nav-button-1").click();
        // addFile(javaCode);
        addFile(htmlCode, "html", "");
        // document.getElementById("hide-header").click(); 必须在 addFile(); 之后
        // document.getElementById("hide-header").click();
        // 默认收起tutorial
        // document.getElementById("tutorial-controller-title").click();
        // 默认打开code mode
        document.getElementById("code-mode-input").click();
    }
    init();

    // document.getElementById("left-nav-button-4").click();
    // document.getElementById("night-mode-input").click();
    // document.getElementById("speak-document").click();
    // document.getElementById("console-button").click();
    // document.getElementById("code-mode-input").click();
    // document.getElementById("left-nav-button-4").click();
    // document.getElementById("voice-cue-input").click();
    // document.getElementById("spot-light-input").click();
    // document.getElementById("linear-index-input").click();
    // document.getElementById("music-mode-input").click();

    // overDocSpeak();
    // overLineSpeak();
    // testSymbol();
    // openInNewWindow();
    // openInNewTab();
    // voiceFeedback();
    // console.log(findSymbolIndex(myEditor.getValue()));
    // console.log(findSymbolIndex(myEditor.getValue()));

    // console.log(createWordArray(myEditor.getValue()));

    // var myString = myEditor.getValue();
    // var String = myString.replace(/(\r\n|\n|\r)/gm, ""); // var String = myString.replace(/(\r\n|\n|\r)/gm, "<br />");
    // // console.log(myString);
    // console.log(String);

    // codeMusicSpeak(myEditor.getValue());




});

// ------------------------------------------------------------------------------------



// sidebar
function hideSection(evt, section_id, icon_id) {
    var selectedElement = document.getElementById(section_id);
    var selectedIcon = document.getElementById(icon_id);
    if (evt.currentTarget.className.toString().split(' ').pop() != "hidden") {
        selectedElement.style.display = "none";
        evt.currentTarget.className += " hidden";
        selectedIcon.style = "-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);-o-transform: rotate(-90deg);-ms-transform: rotate(-90deg);transform: rotate(-90deg);";
    } else {
        selectedElement.style.display = "block";
        evt.currentTarget.className = evt.currentTarget.className.replace(" hidden", "");
        selectedIcon.style = "";
    }
}

// full screen
var headerHidden = "y"
function hideHeader() {
    if (headerHidden == "n") {
        document.getElementById("header").style.display = "none";
        document.getElementById("toolbar").style.top = "0px";
        // document.getElementById("container").style.top = "28px";
        var conta = document.getElementsByClassName("container");
        for (var i = 0; i < conta.length; i++) {
            conta[i].style.top = "28px";
        }
        headerHidden = "y";
    } else {
        document.getElementById("header").style.display = "block";
        document.getElementById("toolbar").style.top = "50px";
        // document.getElementById("container").style.top = "78px";
        var conta = document.getElementsByClassName("container");
        for (var i = 0; i < conta.length; i++) {
            conta[i].style.top = "78px";
        }
        headerHidden = "n";
    }
}

// console hide and show
var consoleToggle = "h";
function hideConsole() {
    if (consoleToggle == "h") {
        // 打开状态
        // 显示run button console-button-open-window console-button-open-tab
        document.getElementById("console-button-run").style.display = "inline-block";
        document.getElementById("console-button-open-window").style.display = "inline-block";
        document.getElementById("console-button-open-tab").style.display = "inline-block";
        // 打开状态下，所有console button类的按钮高度调为29px，字体大小调为14px
        var btn_bar = document.getElementById('console-button-bar');
        for (var i = 0; i < btn_bar.children.length; i++) {
            btn_bar.children[i].style.height = '29px';
            btn_bar.children[i].style.fontSize = '14px';
        }
        // 打开状态下，为console bar 加一条上边线
        console_border_style = "1px solid";
        document.getElementById("console-bar").style.borderTop = console_border_style + console_border_color;
        // 打开状态下，为console button bar 加一条下边线
        // document.getElementById("console-button-bar").style.borderBottom = "1px solid #bbbbbb"; //+ console_border_style + console_border_color;
        // Code for Safari
        document.getElementById("console-bar").style.WebkitTransform = "translateY(-310px)";
        // Code for IE9
        document.getElementById("console-bar").style.msTransform = "translateY(-310px)";
        // Standard syntax
        document.getElementById("console-bar").style.transform = "translateY(-310px)";
        consoleToggle = "s";
        // 将设置里的open console bar开关打开
        document.getElementById('open-console-input').checked = true;
    } else {
        // 关闭状态
        // 隐藏run button console-button-open-window console-button-open-tab
        document.getElementById("console-button-run").style.display = "none";
        document.getElementById("console-button-open-window").style.display = "none";
        document.getElementById("console-button-open-tab").style.display = "none";
        // 关闭状态下，所有console button类的按钮高度调为20px，字体大小调为12px
        var btn_bar = document.getElementById('console-button-bar');
        for (var i = 0; i < btn_bar.children.length; i++) {
            btn_bar.children[i].style.height = '20px';
            btn_bar.children[i].style.fontSize = '12px';
        }
        // 关闭状态下，去掉上边线
        console_border_style = "0px none";
        document.getElementById("console-bar").style.borderTop = console_border_style + console_border_color;
        // Code for Safari
        document.getElementById("console-bar").style.WebkitTransform = "translateY(0)";
        // Code for IE9
        document.getElementById("console-bar").style.msTransform = "translateY(0)";
        // Standard syntax
        document.getElementById("console-bar").style.transform = "translateY(0)";
        consoleToggle = "h";
        // 将设置里的open console bar开关关闭
        document.getElementById('open-console-input').checked = false;
    }
}

var console_border_style = "0px none";
var console_border_color = "#bbbbbb";

document.getElementById("night-mode-input").addEventListener("click", function () {
    // console.log('asdfasdf');
    if (document.getElementById("night-mode-input").checked === true) {
        console_border_color = "#000000";
        // 夜间模式下，将console button bar 下边线的颜色改为#000000
        // document.getElementById("console-button-bar").style.borderBottom = "1px " + console_border_style + console_border_color;
        // 夜间模式下，将console bar 上边线的颜色改为#000000
        document.getElementById("console-bar").style.borderTop = console_border_style + console_border_color;
    } else {
        console_border_color = "#bbbbbb";
        // 白天模式下，将console button bar 下边线的颜色改为#bbbbbb
        // document.getElementById("console-button-bar").style.borderBottom = "1px " + console_border_style + console_border_color;
        // 白天模式下，将console bar 上边线的颜色改为#bbbbbb
        document.getElementById("console-bar").style.borderTop = console_border_style + console_border_color;
    }
    // console.log(document.getElementById("console-bar").style.borderTop)
});


// router
// 利用路由加载设置偏好
function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () { };
};
Router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};
Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();

Router.route('/', function () {
    // do nothing
    // remove this function will cause an error
});
Router.route('load-demo', function () {
    document.getElementById("load-demo").click();
});
Router.route('dark', function () {
    document.getElementById("night-mode-input").click();
});
Router.route('full-screen', function () {
    document.getElementById("left-nav-button-1").click();
    document.getElementById("hide-header").click();
});
Router.route('run', function () {
    document.getElementById("console-button").click();
});
Router.route('tutorial', function () {
    setTimeout(() => { document.getElementById("audio-tutorial").click(); }, 1000);
});
Router.route('spotlight', function () {
    document.getElementById("spot-light-input").click();
});
Router.route('linear-index', function () {
    document.getElementById("linear-index-input").click();
});
Router.route('character-mode', function () {
    document.getElementById("character-mode-input").click();
});
Router.route('code-mode', function () {
    document.getElementById("code-mode-input").click();
});
Router.route('overview-mode', function () {
    document.getElementById("overview-mode-input").click();
});
Router.route('voice-feedback', function () {
    document.getElementById("voice-feedback-input").click();
});
Router.route('voice-cue', function () {
    document.getElementById("voice-cue-input").click();
});
Router.route('mute', function () {
    document.getElementById("mute-input").click();
});
Router.route('dark&run', function () {
    document.getElementById("night-mode-input").click();
    document.getElementById("console-button").click();
});
Router.route('dark&mute', function () {
    document.getElementById("night-mode-input").click();
    document.getElementById("mute-input").click();
});