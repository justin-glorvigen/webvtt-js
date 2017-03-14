//padLeft functionality, needed for int formatting
//src: http://stackoverflow.com/a/1127988
String.prototype.padLeft = function(length, character) {
  return new Array(length - this.length + 1).join(character || '0') + this;
}

//Timespan.js
//src: https://www.npmjs.com/package/timespan
"use strict";
(function() {
  var a = window.TimeSpan = function(g, i, h, j, k) {
    var l = "1.2",
      d = 1e3,
      c = 6e4,
      e = 3.6e6,
      f = 8.64e7,
      a = 0,
      b = function(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
      };
    if (b(k)) a += k * f;
    if (b(j)) a += j * e;
    if (b(h)) a += h * c;
    if (b(i)) a += i * d;
    if (b(g)) a += g;
    this.addMilliseconds = function(c) {
      if (!b(c)) return;
      a += c
    };
    this.addSeconds = function(c) {
      if (!b(c)) return;
      a += c * d
    };
    this.addMinutes = function(d) {
      if (!b(d)) return;
      a += d * c
    };
    this.addHours = function(c) {
      if (!b(c)) return;
      a += c * e
    };
    this.addDays = function(c) {
      if (!b(c)) return;
      a += c * f
    };
    this.subtractMilliseconds = function(c) {
      if (!b(c)) return;
      a -= c
    };
    this.subtractSeconds = function(c) {
      if (!b(c)) return;
      a -= c * d
    };
    this.subtractMinutes = function(d) {
      if (!b(d)) return;
      a -= d * c
    };
    this.subtractHours = function(c) {
      if (!b(c)) return;
      a -= c * e
    };
    this.subtractDays = function(c) {
      if (!b(c)) return;
      a -= c * f
    };
    this.isTimeSpan = true;
    this.add = function(b) {
      if (!b.isTimeSpan) return;
      a += b.totalMilliseconds()
    };
    this.subtract = function(b) {
      if (!b.isTimeSpan) return;
      a -= b.totalMilliseconds()
    };
    this.equals = function(b) {
      if (!b.isTimeSpan) return;
      return a === b.totalMilliseconds()
    };
    this.totalMilliseconds = function(c) {
      var b = a;
      if (c === true) b = Math.floor(b);
      return b
    };
    this.totalSeconds = function(c) {
      var b = a / d;
      if (c === true) b = Math.floor(b);
      return b
    };
    this.totalMinutes = function(d) {
      var b = a / c;
      if (d === true) b = Math.floor(b);
      return b
    };
    this.totalHours = function(c) {
      var b = a / e;
      if (c === true) b = Math.floor(b);
      return b
    };
    this.totalDays = function(c) {
      var b = a / f;
      if (c === true) b = Math.floor(b);
      return b
    };
    this.milliseconds = function() {
      return a % 1e3
    };
    this.seconds = function() {
      return Math.floor(a / d) % 60
    };
    this.minutes = function() {
      return Math.floor(a / c) % 60
    };
    this.hours = function() {
      return Math.floor(a / e) % 24
    };
    this.days = function() {
      return Math.floor(a / f)
    };
    this.getVersion = function() {
      return l
    }
  };
  a.FromSeconds = function(b) {
    return new a(0, b, 0, 0, 0)
  };
  a.FromMinutes = function(b) {
    return new a(0, 0, b, 0, 0)
  };
  a.FromHours = function(b) {
    return new a(0, 0, 0, b, 0)
  };
  a.FromDays = function(b) {
    return new a(0, 0, 0, 0, b)
  };
  a.FromDates = function(e, d, c) {
    var b = d.valueOf() - e.valueOf();
    if (c === true) b = Math.abs(b);
    return new a(b, 0, 0, 0, 0)
  }
})()

var webvtt = function(text, startSeconds, endSeconds, speaker) {
  this.text = text;
  this.startSeconds = TimeSpan.FromSeconds(startSeconds);
  this.endSeconds = TimeSpan.FromSeconds(endSeconds);
  if (speaker) {
    this.speaker = speaker;
  } else {
    this.speaker = '';
  }
}
webvtt.prototype.ToWebVTTString = function() {
  var returning = this.FormatWebVTTTime(this.startSeconds) + ' --> ' + this.FormatWebVTTTime(this.endSeconds) + '\n';
  if (this.speaker) {
    returning = returning + '<v ' + this.speaker + '>';
  }
  returning = returning + this.text + '\n\n';
  
  return returning;
}
webvtt.prototype.FormatWebVTTTime = function(time) {
  return time.minutes().toString().padLeft(3) + ':' + time.seconds().toString().padLeft(2) + '.' + time.milliseconds().toString().padLeft(3)
}
var CompileWebVTTFile = function(webvtts) {
  var invalidTypeMessage = 'Err: invalid input. Must by an array of webvtt';
  if (Array.isArray(webvtts)) {
    var returning = 'WEBVTT\n\n';

    for (var i = 0; i < webvtts.length; i++) {
      var entry = webvtts[i];
      if (entry && entry.ToWebVTTString && typeof(entry.ToWebVTTString) === 'function') {
        returning += entry.ToWebVTTString();
      } else {
        throw invalidTypeMessage;
      }
    }

    return returning;
  } else {
    throw invalidTypeMessage;
  }
}
