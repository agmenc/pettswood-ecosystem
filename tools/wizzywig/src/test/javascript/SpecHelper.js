//

function fire($element, eventName) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
    return !asPlain($element).dispatchEvent(event);
}
