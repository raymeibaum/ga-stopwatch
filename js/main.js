$(function() {
  var $displayTime = $('h1#total-time');
  var $displayLapTime = $('h2#current-lap-time');
  var $runPauseButton = $('button.btn-lg').first();
  var $lapButton = $('button#lap');
  var $resetButton = $('button#reset');
  var $lapsTable = $('tbody');

  var intervalID;
  var elapsedTime = 0;
  var previousTime = 0;
  var lapTime = 0;
  var laps = 0;

  $('div#button-container').on('click', 'button', function($event) {
    switch ($event.target.id) {
      case 'start':
        start($(this));
        break;
      case 'pause':
        pause($(this));
        break;
      case 'lap':
        lap();
        break;
      case 'reset':
        reset();
        break;
    }
  });

  function start($button) {
    $button.removeClass('btn-success').addClass('btn-danger')
    $button.html('<i class="fa fa-pause" aria-hidden="true"></i>')
    $button.attr('id', 'pause');

    $lapButton.removeAttr('disabled');
    $resetButton.removeAttr('disabled');

    stopwatchInterval = window.setInterval(update);
  }

  function pause($button) {
    $button.removeClass('btn-danger').addClass('btn-success');
    $button.html('<i class="fa fa-play" aria-hidden="true"></i>')
    $button.attr('id', 'start');
    $lapButton.attr('disabled', 'true');

    clearInterval(stopwatchInterval);
    previousTime = 0;
  }

  function lap() {
    laps++;
    var newRow = $('<tr>');
    newRow.append(`<td>${laps}</td>`);
    newRow.append(`<td>${formatTime(new Date(lapTime))}</td>`);
    $lapsTable.append(newRow);
    lapTime = 0;
  }

  function reset() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    previousTime = 0;
    lapTime = 0;
    laps = 0;

    $displayTime.text('00:00.000');
    $displayLapTime.text('00:00.000');

    $runPauseButton.removeClass('btn-danger').addClass('btn-success');
    $runPauseButton.html('<i class="fa fa-play" aria-hidden="true"></i>')
    $runPauseButton.attr('id', 'start');

    $lapButton.attr('disabled', 'true');
    $resetButton.attr('disabled', 'true');
    $lapsTable.empty();

  }

  function update() {
    if (!previousTime) {
      previousTime = Date.now();
    }
    let addTime = Date.now() - previousTime;

    elapsedTime += addTime;
    lapTime += addTime;
    previousTime = Date.now();

    $displayTime.text(formatTime(new Date(elapsedTime)));
    $displayLapTime.text(formatTime(new Date(lapTime)));
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

  function formatTime(dateObj) {
    return `${formatTwoDigitTime(dateObj.getMinutes())}:${formatTwoDigitTime(dateObj.getSeconds())}.${formatThreeDigitTime(dateObj.getMilliseconds())}`;
  }
})
