//

describe('TableEditor', function () {

    var testTable = '' +
            '<table class="testTable" id="testTable">' +
            '    <tr id="title">' +
            '        <td colspan="2" class="editable">Animals</td>' +
            '    </tr>' +
            '    <tr id="headers">' +
            '        <td class="editable">Prey</td>' +
            '        <td class="editable">Food</td>' +
            '        <td class="editable">Predator</td>' +
            '    </tr>' +
            '    <tr>' +
            '        <td id="monkeys" class="editable">Monkeys</td>' +
            '        <td class="editable">Nuts</td>' +
            '        <td class="editable">Lions</td>' +
            '    </tr>' +
            '</table>';
    var tableEditor;

    beforeEach(function () {
        $("head").append('<link rel="stylesheet" type="text/css" href="../../main/css/wizzywig.css"/>');
        $("body").append(testTable);
        tableEditor = new TableEditor();
        tableEditor.addBlesser(function(x) { return x });
    });

    afterEach(function () {
        $(".testTable").remove();
        $("#wizzywigTableEditor").remove();
    });

    it('Clicking on a table cell causes the table editing console to be displayed', function () {
        expect($("#wizzywigTableEditor").is(":visible")).toBeFalsy();

        tableEditor.edit($("#monkeys"));

        expect($("#wizzywigTableEditor").is(":visible")).toBeTruthy();
    });

    it('The middle of the editing console is level with the middle of the selected table cell', function () {
        tableEditor.edit($("#monkeys"));

        expect(middle($("#wizzywigTableEditor"))).toEqual(middle($("#monkeys")));
    });

    it('The left of the editing console is to the right of the table', function () {
        tableEditor.edit($("#monkeys"));

        expect(left($("#wizzywigTableEditor"))).toEqual(right($("#testTable")));
    });

    it('We can add duplicate columns to a table', function () {
        expect($("#headers td").length).toEqual(3);

        click("Food");
        $("#wizzywigTableEditor .addColumn").click();

        expect($("#headers td").length).toEqual(4);
    });

    it('After adding a column, the left of the editing console moves to the right of the table', function () {
        click("Food");
        $("#add .l").click();

        expect(left($("#wizzywigTableEditor"))).toEqual(right($("#testTable")));
    });

    it('After adding a column, new cells are blessed', function () {
        click("Food");
        $("#add .l").click();

        $("#testTable td").each(function() {
            expect($(this).hasClass("editable")).toBeTruthy();
        });
    });

    it('We ignore titles of MultiRow tables when adding columns', function () {
        expect($("#title td").length).toEqual(1);

        click("Prey");
        $("#wizzywigTableEditor .addColumn").click();

        expect($("#title td").length).toEqual(1);
    });

    it('We can add duplicate rows to a table', function () {
        expect($("#testTable tr").length).toEqual(3);

        click("Predator");
        $("#wizzywigTableEditor .addRow").click();

        expect($("#testTable tr").length).toEqual(4);
    });

    function click(cellText) {
        var tableCell = $("#testTable td").filter(function() { return $(this).text() == cellText; }).first();
        tableEditor.edit(tableCell);
    }
});
