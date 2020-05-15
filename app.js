class Drumkit {
  constructor() {
    this.mutebuttons = document.querySelectorAll(".mute-button");
    this.selects = document.querySelectorAll("select");
    this.kickpad = document.querySelectorAll(".kick-pad");
    this.snarepad = document.querySelectorAll(".snare-pad");
    this.hihatpad = document.querySelectorAll(".hihat-pad");
    this.pads = document.querySelectorAll(".pad");
    this.playbutton = document.querySelector(".play-button");
    this.kickaudio = document.querySelector(".kick-sound");
    this.snareaudio = document.querySelector(".snare-sound");
    this.hihataudio = document.querySelector(".hihat-sound");
    this.temposlider = document.querySelector(".tempo-slider");
    this.temponumber = document.querySelector(".tempo-number");

    this.index = 0;
    this.bpm = 150;
    this.isplaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }

  start() {
    let step = this.index % 8;
    const activebars = document.querySelectorAll(`.b${step}`);
    activebars.forEach((bar) => {
      bar.style.animation = `playtrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickaudio.currentTime = 0;
          this.kickaudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareaudio.currentTime = 0;
          this.snareaudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihataudio.currentTime = 0;
          this.hihataudio.play();
        }
      }
    });
    this.index++;
  }
  repeat() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isplaying) {
      clearInterval(this.isplaying);
      this.isplaying = null;
    } else {
      this.isplaying = setInterval(() => {
        this.start();
      }, interval);
    }
  }
  updatebutton() {
    if (!this.isplaying) {
      this.playbutton.innerHTML = "Stop";
      this.playbutton.classList.add("active");
    } else {
      this.playbutton.innerHTML = "Play";
      this.playbutton.classList.remove("active");
    }
  }
  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");
    event.target.classList.toggle("active");
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickaudio.volume = 0;
          break;
        case "1":
          this.snareaudio.volume = 0;
          break;
        case "2":
          this.hihataudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickaudio.volume = 1;
          break;
        case "1":
          this.snareaudio.volume = 1;
          break;
        case "2":
          this.hihataudio.volume = 1;
          break;
      }
    }
  }
  changeaudio(e) {
    const audioindex = e.target.name;
    const audiovalue = e.target.value;
    switch (audioindex) {
      case "kick-audio":
        this.kickaudio.src = audiovalue;
        break;
      case "snare-audio":
        this.snareaudio.src = audiovalue;
        break;
      case "hihat-audio":
        this.hihataudio.src = audiovalue;
        break;
    }
  }

  changetempo(e) {
    this.temponumber.innerText = e.target.value;
  }
  tempotempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isplaying);
    this.isplaying = null;
    if (this.playbutton.classList.contains("active")) {
      this.repeat();
    }
  }
}

const drumkit = new Drumkit();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playbutton.addEventListener("click", function () {
  drumkit.updatebutton();
  drumkit.repeat();
});

drumkit.mutebuttons.forEach((mutebtn) => {
  mutebtn.addEventListener("click", function (event) {
    drumkit.mute(event);
  });
});

drumkit.selects.forEach((select) => {
  select.addEventListener("click", function (e) {
    drumkit.changeaudio(e);
  });
});
drumkit.temposlider.addEventListener("input", function (e) {
  drumkit.tempotempo(e);
});

drumkit.temposlider.addEventListener("input", function (e) {
  drumkit.changetempo(e);
});
