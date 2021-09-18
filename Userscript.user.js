// ==UserScript==
// @name         rus-to-eng-kebab-case
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       Lui22
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @grant        none
// @include      http://*/*
// @include      https://*/*
// ==/UserScript==

'use strict';

let stri
document.onkeydown = function(e) {
    if(e.ctrlKey) {
        switch (e.keyCode) {
            case 81:
                console.log('ща')
                stri = null
                camelize(getSelectionText())
        }
    }
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function camelize(str) {


    var xhr = new XMLHttpRequest();

    var params = 'q=' + encodeURIComponent(str) +
        '&target=' + encodeURIComponent('en') +
        '&source=' + encodeURIComponent('ru');

    xhr.open("GET", 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://script.google.com/macros/s/AKfycbzTpY-St_55t4l5wbt7Fg19DMMEId_yMftRIUQ4DyBQbgz6fsII/exec?') + params, true);

    xhr.onload = function(){
        var jsonResponse = xhr.response;
        stri = JSON.parse(jsonResponse).contents
        stri = _.kebabCase(stri)
        console.log(stri)
        navigator.clipboard.writeText(stri);
        return stri;
    };

    xhr.send();
}
