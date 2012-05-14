//

describe('DragonController', function () {

    var controller;

    beforeEach(function () {
        $("body").append('' +
                '<div id="all">' +
                '<div id="pool">Pool</div>' +
                '<div id="monkeys">Monkeys</div>' +
                '<div id="elephants">Elephants</div>' +
                '</div>');
        controller = new DragonController(function() {});
    });

    afterEach(function () {
        $("#all").remove();
    });

    it('For moveable items, the drop event places them before the target', function () {
        controller.makeDropTarget($("#pool"));
        controller.makeMoveable($("#elephants"));

        fire($("#elephants"), "dragstart");
        fire($("#pool"), "drop");

        expect(decluttered($("#all")).html()).toEqual('' +
                '<div id="elephants">Elephants</div>' +
                '<div id="pool">Pool</div>' +
                '<div id="monkeys">Monkeys</div>')
    });

    it('When existing elements are dragged onto themselves, nothing happens', function () {
        expect(true).toBeFalsy();
    });

    it('Non-header rows of MultiRow tables are drop targets', function () {
        expect(true).toBeFalsy();
    });

    function decluttered($element) {
        $element.children().removeAttr("class");
        $element.children().removeAttr("draggable");
        return $element;
    }
});