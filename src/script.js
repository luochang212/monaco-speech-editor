var synth = window.speechSynthesis;

var inputTxt = "I am going to play basketball"
var pauseResume = 'R';
var voiceSelect = document.querySelector('.voice-select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
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

function speak(){
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
      console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');  // "Google UK English Female";
	for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break;
    }
  }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

function doPauseResume() {
	if(pauseResume == 'R') {
    window.speechSynthesis.pause();
    document.getElementById("play-pause").src = "./images/play-solid.svg";
    // document.getElementById('control-button').setAttribute("class", "play");
		pauseResume = 'P';
	} else if(pauseResume == 'P') {
    window.speechSynthesis.resume();
    document.getElementById("play-pause").src = "./images/pause-solid.svg";
    // document.getElementById('control-button').setAttribute("class", "pause");
		pauseResume = 'R';
	} else {
		console.log("Unknown state...");
	}
	return false;
}

function doStop() {
	pauseResume = 'R';
	window.speechSynthesis.cancel();
	return false;
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}
