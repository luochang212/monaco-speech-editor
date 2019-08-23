# monaco-speech-editor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Monaco Speech Editor is an online code editor for visually impaired people. It provides several built-in functions to make it easy to read, edit and compile. 

![](./images/open-sidebar.png)

## Quick Start

Try the editor out [on my website]( https://luochang212.github.io/gadget/monaco-speech-editor/).

## Run Locally

Since this web application was written with pure JS and didn't use any framework, it is easy to run locally.

First, download the repository.

```
git clone https://github.com/luochang212/monaco-speech-editor.git
```

Then, open `monaco-speech-editor`.

```
cd monaco-speech-editor
```

Now, click `index.html`, it will open in your browser.

## Features

File Manager:

- Create a file
- Delete a file
- Rename a file
- Upload a file
- Download a file
- Restore a file

Console:

- Display HTML file in an iframe
- Display HTML file in a new tab
- Display HTML file in a new window
- Display the output of console.log()

Themes:

- Day mode
- Night mode

Accessibility:

- Toolbar: Including Syntax highlighting, Jump to line, play previous line, Play current line, Play next line.

- Reading mode: Including Character Mode, Code Mode, Music Mode, Overview mode.

- Spotlight: It is a list of settings that allows you to turn on or turn off settings.

- Linear Index: It is a list of features and their corresponding hotkeys.

## Initialize The Editor with Routers

If you are a visually impaired user, Please open the website above and add a router `#tutorial` after the address to play an audio tutorial automatically. PS: this audio might not be played on google chrome because of [the policy of google chrome](https://www.chromestatus.com/feature/5687444770914304).

If you are a person with normal vision, Please open the website above and add a router `#mute` to disable any autoplay event.

<details>
<summary>Complete list of routers</summary>

| Router          | Setting                                           |
| --------------- | ------------------------------------------------- |
| #load-demo      | load demo                                         |
| #dark           | turn on night mode                                |
| #full-screen    | full screen                                       |
| #run            | open console bar                                  |
| #tutorial       | play audio tutorial                               |
| #spotlight      | turn on spotlight                                 |
| #linear-index   | turn on linear index                              |
| #character-mode | trun on character mode                            |
| #code-mode      | turn on code mode                                 |
| #overview-mode  | turn on overview mode                             |
| #voice-feedback | turn on voice feedback                            |
| #voice-cue      | turn on voice cue                                 |
| #mute           | disable any autoplay event                        |
| #dark&run       | turn on night mode and console bar                |
| #dark&mute      | turn on night mode and disable any autoplay event |

</details>


## Dependencies

- [Monaco Editor](https://github.com/microsoft/monaco-editor)

- [Web Speech API](https://w3c.github.io/speech-api/)

## FAQ

❓Is the editor supported in mobile browsers or mobile web app frameworks?

No, both Monaco Editor and Web Speech API can't work well on mobile browser.

❓How to use routers to configure the initial setting？

For example, If you open [https://luochang212.github.io/gadget/monaco-speech-editor/#dark&mute](https://luochang212.github.io/gadget/monaco-speech-editor/#dark&mute). Monaco Speech Editor will turn on night mode and disable any autoplay event for you.

## License

MIT License
