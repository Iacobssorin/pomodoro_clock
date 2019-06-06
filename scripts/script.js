let pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
   
    interval : null,
    minutesDom : null,
    secondsDom : null,
    
     initialize: function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseFloat(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      
    }
};
window.onload = function(){
  pomodoro.initialize();
};
function c(data) {
  console.log(data);
}

// get clock from the machine
const askDate = new Date();

// clock pointers degrees caclulator
let hoursStep =   -90 + (askDate.getHours() *  30);
let minutesStep = -90 + (askDate.getMinutes() * 6);
let secondsStep = -90 + (askDate.getSeconds() * 6);

// DOM current time setup
const elements = document.body.childNodes;
elements[1].childNodes[1].childNodes[25].style.transform = "rotate(" + hoursStep + "deg)";
elements[1].childNodes[1].childNodes[27].style.transform = "rotate(" + minutesStep + "deg)";
elements[1].childNodes[1].childNodes[29].style.transform = "rotate(" + secondsStep + "deg)";

// seconds pointer engine
setInterval(() => {
  elements[1].childNodes[1].childNodes[29].style.transform = "rotate(" + secondsStep + "deg)";
  secondsStep = secondsStep + 6;
  if (secondsStep == 276) {
      secondsStep = -84;
      minutesStep = minutesStep + 6;
      elements[1].childNodes[1].childNodes[27].style.transform = "rotate(" + minutesStep + "deg)";
      check();
  }
}, 1000);

// prevent infinite degrees for hours and minutes
function check() {
  if (minutesStep == 270) {
      minutesStep = -84;
      hoursStep = hoursStep + 30;
      elements[1].childNodes[1].childNodes[25].style.transform = "rotate(" + hoursStep + "deg)";
  }
  if (hoursStep == 270 || hoursStep == 630) {
      hoursStep = -90;
  }
}