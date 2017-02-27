'use strict';

let {viewFor} = require('sdk/view/core'),
    windows = require('sdk/windows').browserWindows;

const HIDE_PINNED_TABS_STYLE = '.tabbrowser-tabs[positionpinnedtabs] > .tabbrowser-tab[pinned] ' +
    '{ position: relative !important; }';


// listener function
function addListener(lWindow) {
    let window = viewFor(lWindow);
    let document = window.document;
    let toolbox = document.getElementById('navigator-toolbox');

    let styleElem = document.createElementNS('http://www.w3.org/1999/xhtml', 'style');
    toolbox.insertBefore(styleElem, toolbox.childNodes.item(0));
    let styleSheet = styleElem.sheet;

    window.addEventListener('fullscreen', () => {
        let active = window.fullScreen;

        toolbox.style.height = active ? '0px' : 'auto';
        toolbox.style.overflow = active ? 'hidden' : 'auto';

        // hide pinned tabs, required since Firefox 51
        if (active) {
            styleSheet.insertRule(HIDE_PINNED_TABS_STYLE, 0);
        } else {
            styleSheet.deleteRule(0);
        }
    }, false);
}


// add listener to opened windows
for (let lWindow of windows) {
    addListener(lWindow);
}


// add listener to new windows
windows.on('open', addListener);
