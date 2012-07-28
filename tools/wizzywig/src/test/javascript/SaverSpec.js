//

function mockEvent() {
    var obj = new Object();
    obj.stopPropagation = function() {};
    obj.preventDefault = function() {};
    return obj;
}

describe('Saver', function () {
    var contents = '<div id="saverTest"><div class="editable"><h1 class="editable">Whatever</h1><div class="middleFixed"><div id="wizzywigConsole">sausage</div></div><p class="hairy editable" draggable="true">Monkeys</p></div></div>';

    beforeEach(function () {
        $("body").append(contents);
    });

    afterEach(function () {
        $("#saverTest").remove();
    });

    it('Saves the page', function () {
        spyOn(window, 'open');

        new Saver().save(mockEvent());

        expect(window.open).toHaveBeenCalled();
    });

    it('The page contents should have all signs of WizzyWig removed', function () {
        var result = new Saver().contents();

        expect(result).toContain('<div><h1>Whatever</h1><p class="hairy">Monkeys</p></div>');
    });

    it('Regex works as expected', function () {
        var input = '<div class=""><h1 class="">';

        var result = input.replace(/ class=\"\"/g, "");

        expect(result).toEqual('<div><h1>');
    });
});