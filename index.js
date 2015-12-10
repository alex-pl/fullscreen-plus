'use strict';

let { viewFor } = require('sdk/view/core'),
    windows = require('sdk/windows').browserWindows;


// listener function
function addListener(lWindow) {
    let window = viewFor(lWindow);

    window.addEventListener('fullscreen', function () {
        let toolbox = window.document.getElementById('navigator-toolbox');
        toolbox.style.height = window.fullScreen ? '0px' : 'auto';
        toolbox.style.overflow = window.fullScreen ? 'hidden' : 'auto';
    }, false);
}


// add listener to opened windows
for (let lWindow of windows) {
    addListener(lWindow);
}


// add listener to new windows
windows.on('open', addListener);
