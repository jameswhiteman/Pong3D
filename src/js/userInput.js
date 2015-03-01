UserInput.Type = {
    Keyboard : 0,
    Mouse : 1,
    Gamepad : 2,
    Joystick : 3,
    Camera : 4,
    Microphone : 5,
    Touchscreen : 6,
    Accelerometer : 7
}

function UserInput(devices)
{
    devices.forEach(function(entry) {
        if (entry == UserInput.Type.Keyboard)
        {
            document.addEventListener("keydown", onKeyDown, false);
        }
    });
}

function onKeyDown(event)
{
    alert("Key Pressed");
}
