//

function fire($element, eventName) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
    return !asPlain($element).dispatchEvent(event);
}

describe('Drag', function () {

    var called = false;
    var handler = function () { called = true; };

    beforeEach(function () {
        $("body").append('<div id="aThing">Monkeys</div>');
        new DragSource($("#aThing"), {dragStart: handler, dragEnd: handler});
    });

    afterEach(function () {
        $("#aThing").remove();
    });

    it('Dragged nodes are styled differently', function () {
        expect($("#aThing").hasClass("drag")).toBeFalsy();

        fire($("#aThing"), "dragstart");

        expect($("#aThing").hasClass("drag")).toBeTruthy();
    });

    it('When we stop dragging a node, its styles return to normal', function () {
        fire($("#aThing"), "dragstart");
        fire($("#aThing"), "dragend");

        expect($("#aThing").hasClass("drag")).toBeFalsy();
    });

    it('The dragStart handler gets called', function () {
        fire($("#aThing"), "dragstart");

        expect(called).toBeTruthy();
    });

    it('The dragEnd handler gets called', function () {
        fire($("#aThing"), "dragend");

        expect(called).toBeTruthy();
    });
});
