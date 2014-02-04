/* jshint eqeqeq: false, unused: false, -W041: false */
/* global $:false, self:false, io:false, data:false */

'use strict';

var allowedForward = true;
var allowedBackward = true;
var allowedLeft = true;
var allowedRight = true;
var allowedShiftR = true;
var allowedShiftL = true;
var allowedCamera = true;
var allowedStop = true;
var allowedJump = true;
var allowedGrab = true;
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

function shiftLeftDown() {
    socket.emit('clientToThumper', 'shiftl');
    console.log('shiftl');
}

function shiftLeftUp() {
    socket.emit('clientToThumper', '-shiftl');
    console.log('-shiftl');
}

function shiftRightDown() {
    socket.emit('clientToThumper', 'shiftr');
    console.log('shiftr');
}

function shiftRightUp() {
    socket.emit('clientToThumper', '-shiftr');
    console.log('-shiftr');
}

function stopDown() {
    socket.emit('clientToThumper', 'stop');
    console.log('stop');
}

function stopUp() {
    socket.emit('clientToThumper', '-stop');
    console.log('-stop');
}

function cameraDown() {
    if (allowPan == false)
    {
        allowPan = true;
    }
    else
    {
        allowPan = false;
    }

    console.log('camera');
}

function cameraUp() {
    console.log('-camera');
}

function jumpDown() {
    socket.emit('clientToThumper', 'jump');
    console.log('jump');
}

function jumpUp() {
    socket.emit('clientToThumper', '-jump');
    console.log('-jump');
}

function grabDown() {
    socket.emit('clientToThumper', 'grab');
    console.log('grab');
}

function grabUp() {
    socket.emit('clientToThumper', '-grab');
    console.log('-grab');
}

function checkKeyDown(e) {
    e = e || window.event;

    if (e.keyCode == '87') {
        if (!allowedForward)
        {
            return;
        }

        allowedForward = false;
        forwardDown();
        $('#button_up').addClass('active');
    }
    else if (e.keyCode == '83') {
        if (!allowedBackward)
        {
            return;
        }

        allowedBackward = false;
        backwardDown();
        $('#button_down').addClass('active');
    }
    else if (e.keyCode == '65') {
        if (!allowedLeft)
        {
            return;
        }

        allowedLeft = false;
        leftDown();
        $('#button_left').addClass('active');
    }
    else if (e.keyCode == '68') {
        if (!allowedRight)
        {
            return;
        }

        allowedRight = false;
        rightDown();
        $('#button_right').addClass('active');
    }
    else if (e.keyCode == '88') {
        if (!allowedStop)
        {
            return;
        }

        allowedStop = false;
        stopDown();
        $('#button_stop').addClass('active');
    }
    else if (e.keyCode == '90') {
        if (!allowedCamera)
        {
            return;
        }

        allowedCamera = false;
        cameraDown();
        $('#button_camera').addClass('active');
    }
    else if (e.keyCode == '82') {
        if (!allowedJump)
        {
            return;
        }

        allowedJump = false;
        jumpDown();
        $('#button_jump').addClass('active');
    }
    else if (e.keyCode == '70') {
        if (!allowedGrab)
        {
            return;
        }

        allowedGrab = false;
        grabDown();
        $('#button_grab').addClass('active');
    }
    else if (e.keyCode == '69') {
        if (!allowedShiftR)
        {
            return;
        }
    
        allowedShiftR = false;
        shiftRightDown();
        $('#button_shiftr').addClass('active');
    }
    else if (e.keyCode == '81') {
        if (!allowedShiftL)
        {
            return;
        }

        allowedShiftL = false;
        shiftLeftDown();
        $('#button_shiftl').addClass('active');
    }

}

function checkKeyUp(e) {
    e = e || window.event;

    if (e.keyCode == '87') {
        allowedForward = true;
        forwardUp();
        $('#button_up').removeClass('active');
    }
    else if (e.keyCode == '83') {
        allowedBackward = true;
        backwardUp();
        $('#button_down').removeClass('active');
    }
    else if (e.keyCode == '65') {
        allowedLeft = true;
        leftUp();
        $('#button_left').removeClass('active');
    }
    else if (e.keyCode == '68') {
        allowedRight = true;
        rightUp();
        $('#button_right').removeClass('active');
    }
    else if (e.keyCode == '88') {
        allowedStop = true;
        stopUp();
        $('#button_stop').removeClass('active');
    }
    else if (e.keyCode == '90') {
        allowedCamera = true;
        cameraUp();
        $('#button_camera').removeClass('active');
    }
    else if (e.keyCode == '82') {
        allowedJump = true;
        jumpUp();
        $('#button_jump').removeClass('active');
    }
    else if (e.keyCode == '70') {
        allowedGrab = true;
        grabUp();
        $('#button_grab').removeClass('active');
    }
    else if (e.keyCode == '69') {
        allowedShiftR = true;
        shiftRightUp();
        $('#button_shiftr').removeClass('active');
    }
    else if (e.keyCode == '81') {
        allowedShiftL = true;
        shiftLeftUp();
        $('#button_shiftl').removeClass('active');
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

$('#button_camera').mousedown(cameraDown);
$('#button_camera').click(cameraUp);

$('#button_stop').mousedown(stopDown);
$('#button_stop').click(stopUp);

$('#button_jump').mousedown(jumpDown);
$('#button_jump').click(jumpUp);

$('#button_grab').mousedown(grabDown);
$('#button_grab').click(grabUp);

$('#button_shiftr').mousedown(shiftRightDown);
$('#button_shiftr').click(shiftRightUp);

$('#button_shiftl').mousedown(shiftLeftDown);
$('#button_shiftl').click(shiftLeftUp);

$(window).resize(function () {
    $('#videostream').css({ height: (getPanelWidth() * 0.680851) });
});

$(document).mousemove(function(e) {
    if (allowPan) {
        self.xPosition = Math.round(e.clientX / $(window).width() * 180);
        self.yPosition = 180 - Math.round(e.clientY / $(window).height() * 180);

        if (self.xPosition % 5 == 0 && self.xPreviousPosition != self.xPosition)
        {
            self.xPreviousPosition = self.xPosition;
            console.log('X: ' + self.xPosition);
            socket.emit('clientToThumper', 'pan' + self.xPosition);
        }

        if(self.yPosition % 5 == 0 && self.yPreviousPosition != self.yPosition)
        {
            self.yPreviousPosition = self.yPosition;
            console.log('Y: ' + self.yPosition);
            socket.emit('clientToThumper', 'tilt' + self.yPosition);
        }

    }

});

socket.on('hello', function(data) {
    socket.emit('clientType', 'PC (Thumper) Connected');
});

$('#videostream').css({ height: (getPanelWidth() * 0.680851) });

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;