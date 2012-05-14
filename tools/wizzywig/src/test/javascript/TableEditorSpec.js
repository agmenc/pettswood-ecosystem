//

describe('TableEditor', function () {

    var HTML = '' +
            '<div id="html">' +
            '  <h1 id="mainHeading">Monkeys</h1><table><tr><td>Lions</td></tr></table><h2>Zebras</h2><p>Apples</p><div>Elephants</div>' +
            '</div>';
    var tableEditor;

    beforeEach(function () {
        $("body").append(HTML);
        expect($(WizzyWig.editableElements).length).toBeGreaterThan(0);
        tableEditor = new TableEditor();
    });

    afterEach(function () {
        $("#html").remove();
        $("#wizzywigConsole").remove();
    });

    it('We can add columns to a table', function () {
        expect(true).toBeFalsy();
    });

    it('We can add rows to a table', function () {
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
