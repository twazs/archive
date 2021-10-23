var pageLoadTime = Math.round(performance.now())
ga('send', 'timing', 'Page', 'load', pageLoadTime)
console.log(pageLoadTime)
    /* DBR Base Javascript file
    Will be used with all pages so make sure the code here will work globally
    These codes will be run after the page is loaded. (defer)*/

// Handles search bar

// Check if user is logged in or not
if (loggedIn) {
    if (window.innerWidth < 1300) {
        var widthToDel = window.innerWidth
    } else {
        var widthToDel = window.innerWidth - 30
    }
} else {
    var widthToDel = window.innerWidth - 390
}
// First load =>
if ($('.navbar-toggler-icon').is(":visible")) {
    document.getElementById("styledright").setAttribute("style", "margin-left:0px") // Sets margin to 0px if navbar toggler is displayed
} else {
    var width = window.innerWidth
    var l = width - widthToDel // Using constant, less compatible but works too
    document.getElementById("styledright").setAttribute("style", "margin-left:" + l.toString() + "px")
}
// Resize =>
function resize(event) {
    if ($('.navbar-toggler-icon').is(":visible")) {
        document.getElementById("styledright").setAttribute("style", "margin-left:0px")
        return;
    } else {
        var width = window.innerWidth
        var l = width - widthToDel
        document.getElementById("styledright").setAttribute("style", "margin-left:" + l.toString() + "px")
    }
}
window.addEventListener("resize", resize) // If the window is resized, change margin

// Handles active window
var g = document.getElementById("navmain").children
var count = 0
while (g[count]) {
    if (g[count].pathname == "/modportal" && window.location.pathname.startsWith("/modportal")) {
        g[count].setAttribute("class", g[count].getAttribute("class") + " active")
        break;
    }
    if (g[count].pathname == "/browse" && window.location.pathname.startsWith("/browse")) {
        g[count].setAttribute("class", g[count].getAttribute("class") + " active")
        break;
    }
    if (g[count].pathname == window.location.pathname) {
        g[count].setAttribute("class", g[count].getAttribute("class") + " active")
        break;
    } else {
        count++;
        continue;
    }
}
// GA redirect tracking (a tags only)
var a = document.getElementsByTagName("a")
var count = 0

function handleOutboundLinkClicks(event) {
    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: event.target.href,
        transport: 'beacon'
    });
}
while (a[count]) {
    a[count].addEventListener("click", handleOutboundLinkClicks)
    count++;
}
// GA search tracking
document.getElementById("search").addEventListener("click", (event) => {
    ga('send', 'event', {
        eventCategory: 'Search',
        eventAction: 'searchClick',
        eventLabel: document.getElementById("query").value,
        transport: 'beacon'
    });
});
document.getElementById("search-form").addEventListener("submit", (event) => {
    ga('send', 'event', {
        eventCategory: 'Search',
        eventAction: 'searchClick',
        eventLabel: document.getElementById("query").value,
        transport: 'beacon'
    });
});
if (window.location.pathname == "/search") {
    document.getElementById("search-2").addEventListener("click", (event) => {
        ga('send', 'event', {
            eventCategory: 'Search',
            eventAction: 'searchClick',
            eventLabel: document.getElementById("query-2").value,
            transport: 'beacon'
        });
    });
    document.getElementById("searchform-2").addEventListener("submit", (event) => {
        ga('send', 'event', {
            eventCategory: 'Search',
            eventAction: 'searchClick',
            eventLabel: document.getElementById("query-2").value,
            transport: 'beacon'
        });
    });
}
if (window.location.pathname.startsWith("/bot/") && loggedIn) {
    document.getElementById("comment-form").addEventListener("submit", (event) => {
        ga("send", "event", {
            eventCategory: "Comment",
            eventAction: "CommentPost",
            transport: "beacon",
        });
    });
}
if (window.location.pathname.startsWith("/bot/") && document.getElementById("status")) {
    ga("send", "event", {
        eventCategory: "Browses",
        eventAction: "BrowseBot",
        eventLabel: window.location.pathname.substr(5),
        transport: "beacon",
    });
}
if (loggedIn) {
    gtag('set', { 'user_id': userID.toString() })
} else {}