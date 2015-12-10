'use strict';

let { viewFor } = require("sdk/view/core"),
    windows = require("sdk/windows").browserWindows;

//let buttons = require('sdk/ui/button/action'),
//    button;
//button = buttons.ActionButton({
//  id: "full-fullscreen",
//  label: "Full Fullscreen",
//  icon: {
//    "16": "./icon-16.png",
//    "32": "./icon-32.png",
//    "64": "./icon-64.png"
//  },
//  onClick: function () {
//      console.log(windows.activeWindow);
//  }
//});

// add listener to already opened windows
for (let lWindow of windows) {
    addListener(lWindow);
}

// add listener to new windows
windows.on('open', addListener);

function addListener(lWindow) {
    let window = viewFor(lWindow);
    
//    let toolbox = window.document.getElementById('navigator-toolbox');
//    toolbox.style.transition = 'height 1s';
    
    window.addEventListener('fullscreen', function () {
//        let toolbox = window.document.getElementById('navigator-toolbox');
//        let height = 200;
//        if (window.fullScreen) {
//            height = toolbox.clientHeight;
//        }
//        
//        toolbox.style.height = height + 'px';
        toolbox.style.height = window.fullScreen ? '0px' : 'auto';
        toolbox.style.overflow = window.fullScreen ? 'hidden' : 'auto';
    }, false);
}
