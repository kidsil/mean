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

var socket = io.connect('//cloudyrobotics.com');

var inControl = false;
$('#robotcontrols').hide();

function forwardDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'forward');
        console.log('forward');
    }

}

function forwardUp(){
    if (inControl) {
        socket.emit('clientToThumper', '-forward');
        console.log('-forward');
    }

}

function backwardDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'backward');
        console.log('backward');
    }

}

function backwardUp() {
    if (inControl) {
        socket.emit('clientToThumper', '-backward');
        console.log('-backward');
    }

}

function leftDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'left');
        console.log('left');
    }

}

function leftUp() {
    if (inControl) {
        socket.emit('clientToThumper', '-left');
        console.log('-left');
    }

}

function rightDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'right');
        console.log('right');
    }

}

function rightUp() {
    if (inControl) {
        socket.emit('clientToThumper', '-right');
        console.log('-right');
    }

}

function speedDownDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'speeddown');
        console.log('speeddown');
    }

}

function speedDownUp() {
    if (inControl) {
        socket.emit('clientToThumper', '-speeddown');
        console.log('-speeddown');
    }

}

function speedUpDown() {
    if (inControl) {
        socket.emit('clientToThumper', 'speedup');
        console.log('speedup');
    }

}

function speedUpUp() {
    if (inControl) {
        socket.emit('clientToThumper', '-speedup');
        console.log('-speedup');
    }

}

function checkKeyDown(e) {
    e = e || window.event;

    if (e.keyCode == '87' || e.keyCode == '38') {
        if (!allowedForward) {
            return;
        }

        allowedForward = false;
        forwardDown();
        $('#button_up').addClass('active');
    }
    else if (e.keyCode == '83' || e.keyCode == '40') {
        if (!allowedBackward) {
            return;
        }

        allowedBackward = false;
        backwardDown();
        $('#button_down').addClass('active');
    }
    else if (e.keyCode == '65' || e.keyCode == '37') {
        if (!allowedLeft) {
            return;
        }

        allowedLeft = false;
        leftDown();
        $('#button_left').addClass('active');
    }
    else if (e.keyCode == '68' || e.keyCode == '39') {
        if (!allowedRight) {
            return;
        }

        allowedRight = false;
        rightDown();
        $('#button_right').addClass('active');
    }
    else if (e.keyCode == '69') {
        if (!allowedSpeedUp) {
            return;
        }
    
        allowedSpeedUp = false;
        speedUpDown();
        $('#button_speedup').addClass('active');
    }
    else if (e.keyCode == '81') {
        if (!allowedSpeedDown) {
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

function getPanelWidthWebkit() {
    return ($('#videostreamwebkit').width());
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
    $('#videostreamwebkit').css({ height: (getPanelWidthWebkit() * 0.680851) });
});

socket.on('hello', function(data) {
    socket.emit('clientType', 'PC (Thumper) Connected');
});

socket.on('thumperToClient', function(data) {
    $('#speed').html(data);
});

socket.on('thumperInfo', function(data) {
    if ((/^Queue/).test(data)) {
        $('#queuelength').html(data);
    }

});

socket.on('thumperQueue', function(id) {
    console.log(id);

    socket.on(id, function(data) {
        console.log(data);

        if (data === 'Go') {
            inControl = true;
            $('#robotcontrols').show();
        }
        else if (data === 'Stop') {
            inControl = false;
            $('#robotcontrols').hide();
        }
        if ((/^Your/).test(data)) {
            $('#currentposition').html(data);
        }

    });

});

$('#videostream').css({ height: (getPanelWidth() * 0.680851) });
$('#videostreamwebkit').css({ height: (getPanelWidthWebkit() * 0.680851) });

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

$(document).keydown(function(e) {
    var key = e.which;
    if(key == 32 || key == 37 || key == 38 || key == 39 || key == 40) {
        e.preventDefault();
        return false;
    }

    return true;
});