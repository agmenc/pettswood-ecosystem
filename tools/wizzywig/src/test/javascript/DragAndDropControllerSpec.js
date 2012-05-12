//

describe('DragAndDropController', function () {

    var dnd;

    beforeEach(function () {
        $("body").append('<div id="aThing">Monkeys</div>');
        dnd = new DragAndDrop($("#aList"), function() {});
    });

    afterEach(function () {
        $("#aThing").remove();
    });

    it('When templates are dragged, they are copied', function () {
        expect(true).toBeFalsy();
    });

    it('When existing elements are dragged, they are moved', function () {
        expect(true).toBeFalsy();
    });

    it('When existing elements are dragged onto themselves, nothing happens', function () {
        expect(true).toBeFalsy();
    });

    it('Non-header rows of MultiRow tables are drop targets', function () {
        expect(true).toBeFalsy();
    });
});