//

describe('WizzyWig', function () {

    var HTML = '' +
            '<div id="html">' +
            '  <h1 id="mainHeading">Monkeys</h1><table><tr><td>Lions</td></tr></table><h2>Zebras</h2><p>Apples</p><div>Elephants</div>' +
            '</div>';
    var EDITABLE_ELEMENTS = "td, h1, h2, p";
    var wizzyWig;

    beforeEach(function () {
        $("body").append(HTML);
        expect($(EDITABLE_ELEMENTS).length).toBeGreaterThan(0);
        wizzyWig = new WizzyWig(EDITABLE_ELEMENTS);
    });

    afterEach(function () {
        $("#html").remove()
    });

    it('Editable elements are identified on hover', function () {
        $(EDITABLE_ELEMENTS).each(function () {
            expect($(this).hasClass("editable")).toBeTruthy();
        });
    });

    it('Clicking on an editable element creates an inputter', function () {
        var monkeys = elem("Monkeys");

        click("Monkeys");

        expect(monkeys.find("input").val()).toEqual("Monkeys");
    });

    it('When an element that is being edited loses focus, the input field disappears', function () {
        var monkeys = elem("Monkeys");

        click("Monkeys");
        expect(exists(monkeys.find("input"))).toBeTruthy();

        click("Lions");
        expect(exists(monkeys.find("input"))).toBeFalsy();
    });

    it('When an element that is being edited loses focus, the value is written back to the original element', function () {
        var monkeys = elem("Monkeys");
        click("Monkeys");

        click("Lions");

        expect(monkeys.html()).toEqual("Monkeys");
    });

    it('We can tab from one editable element to the next', function () {
        expect(true).toBeFalsy();
    });

    it('We see an editing console when an item is being edited', function () {
        expect(true).toBeFalsy();
    });

    it('Only leaf elements are editable', function () {
        expect(true).toBeFalsy();
    });

    function click(text) {
        elem(text).click();
    }

    function elem(text) {
        return $(EDITABLE_ELEMENTS).filter(function () {
            return $(this).text() == text;
        }).first();
    }
});
