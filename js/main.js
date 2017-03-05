$(function() {
  var runningIntervalID;
  var pausedIntervalID;

  var startTime;
  var startLapTime;
  var pauseTime;

  var timeElapsed = 0;
  var timePaused = 0;

  var isStarted = false;
  var isPaused = false;

  var $displayTime = $('h1#total-time');
  var $displayLapTime = $('h2#current-lap-time');
  var $startStopButton = $('button.btn-lg').first();
  var $lapButton = $('button#lap');
  var $resetButton = $('button#reset');


  $('div#button-container').on('click', 'button', function($event) {
    switch ($event.target.id) {
      case 'start':
        start($(this));
        break;
      case 'stop':
        stop($(this));
        break;
      case 'lap':

        break;
      case 'reset':
        reset();
        break;
    }
  });

  function start($button) {
    $button.removeClass('btn-success').addClass('btn-danger')
    $button.html('<i class="fa fa-stop" aria-hidden="true"></i>')
    $button.attr('id', 'stop');
    $lapButton.removeAttr('disabled');
    $resetButton.removeAttr('disabled');

    clearInterval(pausedIntervalID);
    runningIntervalID = window.setInterval(running);

  }

  function stop($button) {
    $button.removeClass('btn-danger').addClass('btn-success');
    $button.html('<i class="fa fa-play" aria-hidden="true"></i>')
    $button.attr('id', 'start');

    clearInterval(runningIntervalID);
    pausedIntervalID = window.setInterval(paused);
  }

  function lap() {

  }

  function reset() {
    clearInterval(runningIntervalID);
    clearInterval(pausedIntervalID);

    $displayTime.text('00:00.000');
    $displayLapTime.text('00:00.000');

    $startStopButton.removeClass('btn-danger').addClass('btn-success');
    $startStopButton.html('<i class="fa fa-play" aria-hidden="true"></i>')
    $startStopButton.attr('id', 'start');

    $lapButton.attr('disabled', 'true');
    $resetButton.attr('disabled', 'true');

    isStarted = false;
    isPaused = false;

    timeElapsed = 0;
    timePaused = 0;

  }

  function running() {
    if (!isStarted) {
      startTime = Date.now();
      isStarted = true;
    } else if (isPaused) {

      isPaused = false;
    }
    timeElapsed = new Date(Date.now() - startTime - timePaused);
    updateTotalTimeDisplay(timeElapsed);
    updateLapTimeDisplay(timeElapsed);
  }

  function paused() {
    if (!isPaused) {
      pauseTime = Date.now();
      isPaused = true;
    }
    timePaused = new Date(Date.now() - pauseTime);
  }

  function formatTwoDigitTime(time) {
    return time < 10 ? '0' + time : time;
  }

  function formatThreeDigitTime(time) {
    if (time < 10) {
      return `00` + time;
    } else if (time < 100) {
      return '0' + time;
    } else {
      return time;
    }
  }

  function updateTotalTimeDisplay(time) {
    $displayTime.text(`${formatTwoDigitTime(time.getMinutes())}:${formatTwoDigitTime(time.getSeconds())}.${formatThreeDigitTime(time.getMilliseconds())}`);
  }

  function updateLapTimeDisplay(time) {
    $displayLapTime.text(`${formatTwoDigitTime(time.getMinutes())}:${formatTwoDigitTime(time.getSeconds())}.${formatThreeDigitTime(time.getMilliseconds())}`);
  }

})
