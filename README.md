# monaco-speech-editor

Monaco Speech Editor is an online code editor for visually impaired people. It provides several built-in functions to make it easy to read, edit and compile. 

![](./images/open-sidebar.png)


## Quick Start

You can start from [this website]( https://luochang212.github.io/gadget/monaco-speech-editor/) or [run it locally]().

- If you are a visually impaired user, Please open the website above and add a router `#tutorial` to play an audio tutorial automatically. PS: this audio might not be played on google chrome because of [the policy of google chrome](https://www.chromestatus.com/feature/5687444770914304).

- If you are a person with normal vision, Please open the website above and add a router `#mute` to disable all autoplay event.

## Run Locally

Since this web application was written with pure JS and didn't use any framework, it is easy to run locally.

First, download the repository.

```
git clone https://github.com/luochang212/monaco-speech-editor.git
```

Then, open `monaco-speech-editor` and click `index.html`, it will open in your browser.

## Features

### File Manager

Monaco Speech Editor allows you to create a new file, delete a file, change the name of a file, upload a file, download a file and restore a file.

- Create File: File manager will jump to the new file when you create it.

- Delete File: File manager makes sure it has at least one file on current website. If the number of files is less than one, it will create one automatically.

- Upload File: File manager can identify file type and set syntax highlighting according to file type automatically.

- Restore File: You can find the file you deleted before you leave the website. But if you refresh the website or leave it. It will disappear forever.


### Console


## Accessibility

### Toolbar

### Spotlight

### Linear Index

### Reading mode

## Dependencies

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

- [Monaco Editor](https://github.com/microsoft/monaco-editor)

## FAQ

❓

## License

MIT License