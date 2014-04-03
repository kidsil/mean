/* jshint eqeqeq: false, unused: false, -W041: false */
/* global $:false, io:false, data:false */

'use strict';

var allowedForward = true;
var allowedBackward = true;
var allowedLeft = true;
var allowedRight = true;
var allowedSpeedUp = true;
var allowedSpeedDown = true;
var allowedCamera = true;
var allowedElbowUp = true;
var allowedElbowDown = true;
var allowedWristLeft = true;
var allowedWristRight = true;
var allowedGrab = true;
var allowPan = false;

var xPosition = 0;
var yPosition = 0;
var xPreviousPosition = 0;
var yPreviousPosition = 0;

var socket = io.connect('//cloudyrobotics.com');

function forwardDown() {
    socket.emit('clientToLynx', 'forward');
    console.log('forward');
}

function forwardUp(){
    socket.emit('clientToLynx', '-forward');
    console.log('-forward');
}

function backwardDown() {
    socket.emit('clientToLynx', 'backward');
    console.log('backward');
}

function backwardUp() {
    socket.emit('clientToLynx', '-backward');
    console.log('-backward');
}

function leftDown() {
    socket.emit('clientToLynx', 'left');
    console.log('left');
}

function leftUp() {
    socket.emit('clientToLynx', '-left');
    console.log('-left');
}

function rightDown() {
    socket.emit('clientToLynx', 'right');
    console.log('right');
}

function rightUp() {
    socket.emit('clientToLynx', '-right');
    console.log('-right');
}

function speedDownDown() {
    socket.emit('clientToLynx', 'speeddown');
    console.log('speeddown');
}

function speedDownUp() {
    socket.emit('clientToLynx', '-speeddown');
    console.log('-speeddown');
}

function speedUpDown() {
    socket.emit('clientToLynx', 'speedup');
    console.log('speedup');
}

function speedUpUp() {
    socket.emit('clientToLynx', '-speedup');
    console.log('-speedup');
}

function cameraDown() {
    // if (allowPan == false)
    // {
    //     allowPan = true;
    // }
    // else
    // {
    //     allowPan = false;
    // }

    allowPan = true;
    console.log('camera');
}

function cameraUp() {
    allowPan = false;
    console.log('-camera');
}

function wristLeftDown() {
    socket.emit('clientToLynx', 'wristleft');
    console.log('wristleft');
}

function wristLeftUp() {
    socket.emit('clientToLynx', '-wristleft');
    console.log('-wristleft');
}

function wristRightDown() {
    socket.emit('clientToLynx', 'wristright');
    console.log('wristright');
}

function wristRightUp() {
    socket.emit('clientToLynx', '-wristright');
    console.log('-wristright');
}

function elbowUpDown() {
    socket.emit('clientToLynx', 'elbowup');
    console.log('elbowup');
}

function elbowUpUp() {
    socket.emit('clientToLynx', '-elbowup');
    console.log('-elbowup');
}

function elbowDownDown() {
    socket.emit('clientToLynx', 'elbowdown');
    console.log('elbowdown');
}

function elbowDownUp() {
    socket.emit('clientToLynx', '-elbowdown');
    console.log('-elbowdown');
}

function grabDown() {
    socket.emit('clientToLynx', 'grab');
    console.log('grab');
}

function grabUp() {
    socket.emit('clientToLynx', '-grab');
    console.log('-grab');
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
    else if (e.keyCode == '16') {
        if (!allowedCamera)
        {
            return;
        }

        allowedCamera = false;
        cameraDown();
        $('#button_camera').addClass('active');
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
    else if (e.keyCode == '82') {
        if (!allowedElbowUp)
        {
            return;
        }

        allowedElbowUp = false;
        elbowUpDown();
        $('#button_elbowup').addClass('active');
    }
    else if (e.keyCode == '70') {
        if (!allowedElbowDown)
        {
            return;
        }

        allowedElbowDown = false;
        elbowDownDown();
        $('#button_elbowdown').addClass('active');
    }
    else if (e.keyCode == '3') {
        if (!allowedWristLeft)
        {
            return;
        }

        allowedWristLeft = false;
        wristLeftDown();
        $('#button_wristleft').addClass('active');
    }
    else if (e.keyCode == '4') {
        if (!allowedWristRight)
        {
            return;
        }

        allowedWristRight = false;
        wristRightDown();
        $('#button_wristright').addClass('active');
    }
    else if (e.keyCode == '32') {
        if (!allowedGrab)
        {
            return;
        }

        allowedGrab = false;
        grabDown();
        $('#button_grab').addClass('active');
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
    else if (e.keyCode == '16') {
        allowedCamera = true;
        cameraUp();
        $('#button_camera').removeClass('active');
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
    else if (e.keyCode == '82') {
        allowedElbowUp = true;
        elbowUpUp();
        $('#button_elbowup').removeClass('active');
    }
    else if (e.keyCode == '70') {
        allowedElbowDown = true;
        elbowDownUp();
        $('#button_elbowdown').removeClass('active');
    }
    else if (e.keyCode == '3') {
        allowedWristLeft = true;
        wristLeftUp();
        $('#button_wristleft').removeClass('active');
    }
    else if (e.keyCode == '4') {
        allowedWristRight = true;
        wristRightUp();
        $('#button_wristright').removeClass('active');
    }
    else if (e.keyCode == '32') {
        allowedGrab = true;
        grabUp();
        $('#button_grab').removeClass('active');
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

$('#button_camera').mousedown(cameraDown);
$('#button_camera').click(cameraUp);

$('#button_speedup').mousedown(speedUpDown);
$('#button_speedup').click(speedUpUp);

$('#button_speeddown').mousedown(speedDownDown);
$('#button_speeddown').click(speedDownUp);

$('#button_elbowup').mousedown(elbowUpDown);
$('#button_elbowup').click(elbowUpUp);

$('#button_elbowdown').mousedown(elbowDownDown);
$('#button_elbowdown').click(elbowDownUp);

$('#button_wristleft').mousedown(wristLeftDown);
$('#button_wristleft').click(wristLeftUp);

$('#button_wristright').mousedown(wristRightDown);
$('#button_wristright').click(wristRightUp);

$('#button_grab').mousedown(grabDown);
$('#button_grab').click(grabUp);

$(window).resize(function () {
    $('#videostream').css({ height: (getPanelWidth() * 0.680851) });
    $('#videostreamwebkit').css({ height: (getPanelWidthWebkit() * 0.680851) });
});

$(document).mousemove(function(e) {
    if (allowPan) {
        xPosition = Math.round(e.clientX / $(window).width() * 180);
        yPosition = 180 - Math.round(e.clientY / $(window).height() * 180);

        // if (xPosition % 5 == 0 && xPreviousPosition != xPosition)
        // {
        //     xPreviousPosition = xPosition;
        //     console.log('X: ' + xPosition);
        //     socket.emit('clientToLynx', 'pan' + xPosition);
        // }

        // if(yPosition % 5 == 0 && yPreviousPosition != yPosition)
        // {
        //     yPreviousPosition = yPosition;
        //     console.log('Y: ' + yPosition);
        //     socket.emit('clientToLynx', 'tilt' + yPosition);
        // }

        if ((xPreviousPosition - xPosition) >= 1) {
            xPreviousPosition = xPosition;
            console.log('X: ' + xPosition);
            socket.emit('clientToLynx', 'pan1');
        }
        else if ((xPreviousPosition - xPosition) <= -1) {
            xPreviousPosition = xPosition;
            console.log('X: ' + xPosition);
            socket.emit('clientToLynx', 'pan0');
        }

        if((yPreviousPosition - yPosition) >= 1) {
            yPreviousPosition = yPosition;
            console.log('Y: ' + yPosition);
            socket.emit('clientToLynx', 'tilt1');
        }
        else if((yPreviousPosition - yPosition) <= -1) {
            yPreviousPosition = yPosition;
            console.log('Y: ' + yPosition);
            socket.emit('clientToLynx', 'tilt0');
        }

    }

});

socket.on('hello', function(data) {
    socket.emit('clientType', 'PC (Lynx) Connected');
});

socket.on('lynxToClient', function(data) {
    $('#speed').html(data);
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