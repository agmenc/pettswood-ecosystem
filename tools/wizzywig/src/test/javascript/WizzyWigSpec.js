//

describe('WizzyWig', function () {

    var HTML = '' +
            '<div id="html">' +
            '  <h1 id="mainHeading">Monkeys</h1><table><tr><td>Lions</td></tr></table><h2>Zebras</h2><p>Apples</p><div>Elephants</div>' +
            '</div>';
    var wizzyWig;
    var saver;

    beforeEach(function () {
        $("body").append(HTML);
        expect($(WizzyWig.editableElements).length).toBeGreaterThan(0);
        saver = new Saver();
        wizzyWig = new WizzyWig(saver, WizzyWig.editableElements);
    });

    afterEach(function () {
        $("#html").remove();
        $("#wizzywigConsole").remove();
    });

    it('Editable elements are identified on hover', function () {
        $("#wizzywigConsole").remove();

        $(WizzyWig.editableElements).each(function () {
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

    it('We can save the page after we have modified it', function () {
        spyOn(saver, 'save');

        click("Monkeys");
        click("Save");

        expect(saver.save).toHaveBeenCalled();
    });

    it('We can insert tables for simple Concepts', function () {
        expect(true).toBeFalsy();
    });

    it('We can insert tables for MultiRow Concepts', function () {
        expect(true).toBeFalsy();
    });

    it('We cannot insert things into the WizzyWig console', function () {
        expect(true).toBeFalsy();
    });

    it('We can drag existing tables and headers around', function () {
        expect(true).toBeFalsy();
    });

    it('We can tab from one editable element to the next', function () {
        expect(true).toBeFalsy();
    });

    it('Enter/Return moves to the next editable element', function () {
        expect(true).toBeFalsy();
    });

    it('Only leaf elements are editable', function () {
        expect(true).toBeFalsy();
    });

    function click(text) {
        var editableElement = elem(text);
        var element = exists(editableElement) ? editableElement : $("." + text.toLowerCase());
        element.click();
    }

    function elem(text) {
        return $(WizzyWig.editableElements).filter(function () {
            return $(this).text() == text;
        }).first();
    }
});
