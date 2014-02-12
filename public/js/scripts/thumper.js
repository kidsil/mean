/* jshint eqeqeq: false, unused: false, -W041: false */
/* global $:false, io:false, data:false */

'use strict';

var allowedForward = true;
var allowedBackward = true;
var allowedLeft = true;
var allowedRight = true;
var allowedSpeedUp = true;
var allowedSpeedDown = true;
var allowPan = false;

var socket = io.connect('//localhost:3000');

function forwardDown() {
    socket.emit('clientToThumper', 'forward');
    console.log('forward');
}

function forwardUp(){
    socket.emit('clientToThumper', '-forward');
    console.log('-forward');
}

function backwardDown() {
    socket.emit('clientToThumper', 'backward');
    console.log('backward');
}

function backwardUp() {
    socket.emit('clientToThumper', '-backward');
    console.log('-backward');
}

function leftDown() {
    socket.emit('clientToThumper', 'left');
    console.log('left');
}

function leftUp() {
    socket.emit('clientToThumper', '-left');
    console.log('-left');
}

function rightDown() {
    socket.emit('clientToThumper', 'right');
    console.log('right');
}

function rightUp() {
    socket.emit('clientToThumper', '-right');
    console.log('-right');
}

function speedDownDown() {
    socket.emit('clientToThumper', 'speeddown');
    console.log('speeddown');
}

function speedDownUp() {
    socket.emit('clientToThumper', '-speeddown');
    console.log('-speeddown');
}

function speedUpDown() {
    socket.emit('clientToThumper', 'speedup');
    console.log('speedup');
}

function speedUpUp() {
    socket.emit('clientToThumper', '-speedup');
    console.log('-speedup');
}

function checkKeyDown(e) {
    e = e || window.event;

    if (e.keyCode == '87' || e.keyCode == '38') {
        if (!allowedForward)
        {
            return;
        }

        allowedForward = false;
        forwardDown();
        $('#button_up').addClass('active');
    }
    else if (e.keyCode == '83' || e.keyCode == '40') {
        if (!allowedBackward)
        {
            return;
        }

        allowedBackward = false;
        backwardDown();
        $('#button_down').addClass('active');
    }
    else if (e.keyCode == '65' || e.keyCode == '37') {
        if (!allowedLeft)
        {
            return;
        }

        allowedLeft = false;
        leftDown();
        $('#button_left').addClass('active');
    }
    else if (e.keyCode == '68' || e.keyCode == '39') {
        if (!allowedRight)
        {
            return;
        }

        allowedRight = false;
        rightDown();
        $('#button_right').addClass('active');
    }
    else if (e.keyCode == '69') {
        if (!allowedSpeedUp)
        {
            return;
        }
    
        allowedSpeedUp = false;
        speedUpDown();
        $('#button_speedup').addClass('active');
    }
    else if (e.keyCode == '81') {
        if (!allowedSpeedDown)
        {
            return;
        }

        allowedSpeedDown = false;
        speedDownDown();
        $('#button_speeddown').addClass('active');
    }

}

function checkKeyUp(e) {
    e = e || window.event;

    if (e.keyCode == '87' || e.keyCode == '38') {
        allowedForward = true;
        forwardUp();
        $('#button_up').removeClass('active');
    }
    else if (e.keyCode == '83' || e.keyCode == '40') {
        allowedBackward = true;
        backwardUp();
        $('#button_down').removeClass('active');
    }
    else if (e.keyCode == '65' || e.keyCode == '37') {
        allowedLeft = true;
        leftUp();
        $('#button_left').removeClass('active');
    }
    else if (e.keyCode == '68' || e.keyCode == '39') {
        allowedRight = true;
        rightUp();
        $('#button_right').removeClass('active');
    }
    else if (e.keyCode == '69') {
        allowedSpeedUp = true;
        speedUpUp();
        $('#button_speedup').removeClass('active');
    }
    else if (e.keyCode == '81') {
        allowedSpeedDown = true;
        speedDownUp();
        $('#button_speeddown').removeClass('active');
    }

}

function getPanelWidth() {
    return ($('#videostream').width());
}

$('#button_up').mousedown(forwardDown);
$('#button_up').click(forwardUp);

$('#button_down').mousedown(backwardDown);
$('#button_down').click(backwardUp);

$('#button_left').mousedown(leftDown);
$('#button_left').click(leftUp);

$('#button_right').mousedown(rightDown);
$('#button_right').click(rightUp);

$('#button_speedup').mousedown(speedUpDown);
$('#button_speedup').click(speedUpUp);

$('#button_speeddown').mousedown(speedDownDown);
$('#button_speeddown').click(speedDownUp);

$(window).resize(function () {
    $('#videostream').css({ height: (getPanelWidth() * 0.680851) });
});

socket.on('hello', function(data) {
    socket.emit('clientType', 'PC (Thumper) Connected');
});

$('#videostream').css({ height: (getPanelWidth() * 0.680851) });

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;