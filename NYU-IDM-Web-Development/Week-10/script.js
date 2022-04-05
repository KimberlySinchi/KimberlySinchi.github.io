var theBody = document.querySelector("body");
var theWrapper = document.getElementById("wrapper");
var theTitle = document.getElementById("title");
var theEarsText = document.getElementById("ears_text");
var theEyesText = document.getElementById("eyes_text");
var theSenseImg = document.getElementsByClassName("sense");
var theInteractWrapper = document.getElementById("interactive_wrapper");
var theInteractWall = document.getElementById("interactive_wallpaper");
var theUserSpace = document.getElementById("user_space");
var theScPlayer = document.getElementById("sc_player");

// Soundcloud API
var SC="object"==typeof SC?SC:{};SC.Widget=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r,o,i,u=n(1),a=n(2),c=n(3),s=u.api,l=u.bridge,d=[],f=[],p=/^http(?:s?)/;function E(e){var t,n;for(t=0,n=f.length;t<n&&!1!==e(f[t]);t++);}function v(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function _(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(e[t]);return n}function S(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function h(e,t){var n=!0;return t.callbacks[e]=[],E((function(t){if((t.callbacks[e]||[]).length)return n=!1,!1})),n}function y(e,t,n){var r,o,i=v(n);if(!i.postMessage)return!1;r=n.getAttribute("src").split("?")[0],o=JSON.stringify({method:e,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),i.postMessage(o,r)}function b(e){var t;return E((function(n){if(n.instance===e)return t=n,!1})),t}function g(e){var t;return E((function(n){if(v(n.element)===e)return t=n,!1})),t}function m(e,t){return function(n){var r,o=!!((r=n)&&r.constructor&&r.call&&r.apply),i=b(this),u=!o&&t?n:null,a=o&&!t?n:null;return a&&S(e,a,i),y(e,u,i.element),this}}function R(e,t,n){var r,o,i;for(r=0,o=t.length;r<o;r++)e[i=t[r]]=m(i,n)}function O(e,t,n){return e+"?url="+t+"&"+function(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+("start_track"===t?parseInt(n,10):n?"true":"false")));return r.join("&")}(n)}function w(e,t,n){var r,o,i=e.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(e.instance,n);(function(e){var t,n=!1;for(t in a)if(a.hasOwnProperty(t)&&a[t]===e){n=!0;break}return n}(t)||t===s.READY)&&(e.callbacks[t]=[])}function A(e){var t,n,r,o,i;try{n=JSON.parse(e.data)}catch(e){return!1}return t=g(e.source),r=n.method,o=n.value,(!t||P(e.origin)===P(t.domain))&&(t?(r===s.READY&&(t.isReady=!0,w(t,"__LATE_BINDING__"),h("__LATE_BINDING__",t)),r!==s.PLAY||t.playEventFired||(t.playEventFired=!0),r!==s.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,w(t,s.PLAY,[o])),i=[],void 0!==o&&i.push(o),void w(t,r,i)):(r===s.READY&&d.push(e.source),!1))}function P(e){return e.replace(p,"")}window.addEventListener?window.addEventListener("message",A,!1):window.attachEvent("onmessage",A),e.exports=i=function(e,t,n){var i;if((""===(i=e)||i&&i.charCodeAt&&i.substr)&&(e=document.getElementById(e)),!function(e){return!(!e||1!==e.nodeType||"IFRAME"!==e.nodeName.toUpperCase())}(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=O("http://wt.soundcloud.test:9200/",t,n));var u,a,c=g(v(e));return c&&c.instance?c.instance:(u=d.indexOf(v(e))>-1,a=new r(e),f.push(new o(a,e,u)),a)},i.Events=s,window.SC=window.SC||{},window.SC.Widget=i,o=function(e,t,n){this.instance=e,this.element=t,this.domain=function(e){var t,n,r,o="";"//"===e.substr(0,2)&&(e=window.location.protocol+e);for(r=e.split("/"),t=0,n=r.length;t<n&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},(r=function(){}).prototype={constructor:r,load:function(e,t){if(e){t=t||{};var n=this,r=b(this),o=r.element,i=o.src,u=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){n.bind(s.READY,(function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==s.READY&&y(l.ADD_LISTENER,e,r.element);t.callback&&t.callback()}))},o.src=O(u,e,t)}},bind:function(e,t){var n=this,r=b(this);return r&&r.element&&(e===s.READY&&r.isReady?setTimeout(t,1):r.isReady?(S(e,t,r),y(l.ADD_LISTENER,e,r.element)):S("__LATE_BINDING__",(function(){n.bind(e,t)}),r)),this},unbind:function(e){var t,n=b(this);n&&n.element&&(t=h(e,n),e!==s.READY&&t&&y(l.REMOVE_LISTENER,e,n.element))}},R(r.prototype,_(a)),R(r.prototype,_(c),!0)},function(e,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(e,t){e.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(e,t){e.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);
//# sourceMappingURL=http://ent/web-sourcemaps/api.js-27d0ec1de3c5.map
var scWidget = SC.Widget(theScPlayer);

var mouseOverEarsText = false;
var mouseOverEyesText = false;
var numEarsConsecClicks = 0;
var numEyesConsecClicks = 0;
var currScene = 0; // 0: title, 1: ear, 2: eye
var lastClick = 0; // 0: title, 1: ear, 2: eye

theEarsText.onmouseover = function(){ mouseOverEarsText = true; }
theEarsText.onmouseout = function(){ mouseOverEarsText = false; }
theEyesText.onmouseover = function(){ mouseOverEyesText = true; }
theEyesText.onmouseout = function(){ mouseOverEyesText = false; }

theEarsText.addEventListener("mouseover", hover);
theEarsText.addEventListener("mouseout", hover);
theEyesText.addEventListener("mouseover", hover);
theEyesText.addEventListener("mouseout", hover);

// Ears text selected
theEarsText.onclick = function earContent() {
    theUserSpace.style.background = "var(--fadeOutBlack)";
    theSenseImg[0].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";
    theSenseImg[1].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";
    theTitle.textContent = "a medium through the ears";
    theInteractWrapper.style.backgroundImage = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi2ejJ0KXLGz80aQezNGMNiyf47Mu5DmKavg&usqp=CAU)";
    theBody.style.cursor = "url(https://ed27f9fac55a6c9b4009.b-cdn.net/wp-content/uploads/2021/11/WOMG-Music-icon-Export-1c-3.gif), auto";
    theEarsText.style.opacity = "100%";
    theEyesText.style.opacity = "0%";
    theInteractWall.style.backgroundImage = "url(https://media1.giphy.com/media/YRbMpoi5D9bqHNC9Ey/giphy.gif?cid=6c09b9524279f5943dbd4070bf382d3158b6647e3ea20aad&rid=giphy.gif&ct=s)"; 


    earHoverState();
    eyesUnhoverState();

    // Playing music
    currScene = 1;
    scWidget.setVolume(25);
    scWidget.play();
}

// Eyes text selected
theEyesText.onclick = function eyesContent() {
    theSenseImg[0].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";
    theSenseImg[1].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";
    theTitle.textContent = "a medium through the eyes";
    theInteractWrapper.style.backgroundImage = "url(https://media0.giphy.com/media/l2uHjqlI8agQupxmIC/200w.gif?cid=82a1493bdv0ursbv54mtp7v04oi5g3av9h1lk4ql6xolmaw7&rid=200w.gif&ct=g)";
    theUserSpace.style.background = "var(--fadeOutBlack)";
    theEarsText.style.opacity = "0%";
    theEyesText.style.opacity = "100%";
    theInteractWall.style.backgroundImage = "url(https://www.biologymann.com/uploads/1/7/3/8/17386939/inside-out-spinning-wheel_orig.gif)";

    earUnhoverState();
    eyesHoverState();

    currScene = 2;
    scWidget.pause();
}

// Title selected
theTitle.onclick = function titleContent() {
    titleContent();
}

// Tracking clicks
theEarsText.addEventListener('click', function() {
    // Double click functionality
    if(lastClick == 1){
        numEarsConsecClicks++;

        if(numEarsConsecClicks%2 == 0){
            titleContent();
        }
    }
    else
        numEarsConsecClicks = 1;

    lastClick = 1;
});

theEyesText.addEventListener('click', function() {
    // Double click functionality
    if(lastClick == 2){
        numEyesConsecClicks++;

        if(numEyesConsecClicks%2 == 0)
            titleContent();
    }
    else
        numEyesConsecClicks = 1;

    lastClick = 2;
});

// Title content
function titleContent(){
    theSenseImg[0].src = "https://data.whicdn.com/images/140051440/original.gif";
    theSenseImg[1].src = "https://data.whicdn.com/images/140051440/original.gif";
    theTitle.textContent = "explore your senses";
    theInteractWrapper.style.backgroundImage = "url(https://media1.giphy.com/media/1YiJ9qOYgWPCQKhRjj/giphy.gif)";
    theUserSpace.style.background = "var(--fadeOutBlack)";
    theInteractWall.style.backgroundImage = "none";

    earUnhoverState();
    eyesUnhoverState();

    theEarsText.style.opacity = "100%";
    theEyesText.style.opacity = "100%";

    currScene = 0;
    scWidget.pause();
}

// Hover states
function earHoverState(){
    theEarsText.style.color = "pink";
    theEarsText.style.fontSize = "10vh";
}

function earUnhoverState(){
    theEarsText.style.color = "white";
    theEarsText.style.fontSize = "4vh";
}

function eyesHoverState(){
    theEyesText.style.color = "pink";
    theEyesText.style.fontSize = "10vh";
}

function eyesUnhoverState(){
    theEyesText.style.color = "white";
    theEyesText.style.fontSize = "4vh";
}

function hover(){
    // Enable hover in specific scenarios
    if(currScene == 0 || currScene == 2){
        if(mouseOverEarsText)
            earHoverState();
        else
            earUnhoverState();
    }
    if(currScene == 0 || currScene == 1){
        if(mouseOverEyesText)
            eyesHoverState();
        else
            eyesUnhoverState();
    }
    console.log(currScene);
}