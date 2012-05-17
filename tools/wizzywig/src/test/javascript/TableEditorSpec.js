//

describe('TableEditor', function () {

    var testTable = '' +
            '<table class="testTable" id="testTable">' +
            '    <tr id="title">' +
            '        <td colspan="2">Animals</td>' +
            '    </tr>' +
            '    <tr id="headers">' +
            '        <td>Prey</td>' +
            '        <td>Food</td>' +
            '        <td>Predator</td>' +
            '    </tr>' +
            '    <tr>' +
            '        <td id="monkeys">Monkeys</td>' +
            '        <td>Nuts</td>' +
            '        <td>Lions</td>' +
            '    </tr>' +
            '</table>';
    var tableEditor;

    beforeEach(function () {
        $("head").append('<link rel="stylesheet" type="text/css" href="../../main/css/wizzywig.css"/>');
        $("body").append(testTable);
        tableEditor = new TableEditor();
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

    it('We can add columns to the right', function () {
        expect($("#headers td").length).toEqual(3);

        click("Food");
        $("#add .r").click();

        expect($("#headers td").length).toEqual(4);
    });

    it('After adding a column, the left of the editing console moves to the right of the table', function () {
        click("Food");
        $("#add .l").click();

        expect(left($("#wizzywigTableEditor"))).toEqual(right($("#testTable")));
    });

    it('We can add columns to the left', function () {
        expect($("#headers td").length).toEqual(3);

        click("Food");
        $("#add .l").click();

        expect($("#headers td").length).toEqual(4);
    });

    it('We ignore titles of MultiRow tables when adding columns', function () {
        expect($("#title td").length).toEqual(1);

        click("Food");
        $("#add .l").click();

        expect($("#title td").length).toEqual(1);
    });

    it('We can add rows to a table', function () {
        expect($("#testTable tr").length).toEqual(3);

        click("Predator");
        $("#add .u").click();

        expect($("#testTable tr").length).toEqual(4);
    });

    function click(cellText) {
        var tableCell = $("#testTable td").filter(function() { return $(this).text() == cellText; }).first();
        tableEditor.edit(tableCell);
    }
});
