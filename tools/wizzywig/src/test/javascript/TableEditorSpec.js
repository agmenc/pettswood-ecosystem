//

describe('TableEditor', function () {

    var testTable = '' +
            '<table class="testTable" id="testTable">' +
            '    <tr id="title" class="fixture">' +
            '        <td colspan="2" class="editable">Animals</td>' +
            '    </tr>' +
            '    <tr id="headers">' +
            '        <td class="editable">Prey</td>' +
            '        <td class="editable">Food</td>' +
            '        <td class="editable">Predator</td>' +
            '    </tr>' +
            '    <tr>' +
            '        <td id="monkeys" class="editable">Monkeys<input class="inputter" type="text" id="anInputField"></td>' +
            '        <td class="editable">Nuts</td>' +
            '        <td class="editable">Lions</td>' +
            '    </tr>' +
            '</table>';
    var tableEditor;

    beforeEach(function () {
        $("head").append('<link rel="stylesheet" type="text/css" href="../../main/css/wizzywig.css"/>');
        $("body").append(testTable);
        $("body").append('<div id="somethingElse">Something Else</div>');
        tableEditor = new TableEditor(new Blesser());
    });

    afterEach(function () {
        $(".testTable").remove();
        $("#wizzywigTableEditor").remove();
        $("#somethingElse").remove();
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

        expect(left($("#wizzywigTableEditor"))).toEqual(right($("#testTable")) + 10);
    });

    it('We can add duplicate columns to a table', function () {
        expect($("#headers td").length).toEqual(3);

        click("Predator");
        $("#wizzywigTableEditor .add.column").click();

        click("Nuts");
        $("#wizzywigTableEditor .add.column").click();

        expect($("#headers td").length).toEqual(5);
    });

    it('After adding a column, new cells are blessed', function () {
        click("Food");
        $("#wizzywigTableEditor .add.column").click();

        $("#testTable td").each(function() {
            expect($(this).hasClass("editable")).toBeTruthy();
        });
    });

    it('We ignore titles of MultiRow tables when adding columns', function () {
        expect($("#title td").length).toEqual(1);

        click("Prey");
        $("#wizzywigTableEditor .add.column").click();

        expect($("#title td").length).toEqual(1);
    });

    it('We can add duplicate rows to a table', function () {
        expect($("#testTable tr").length).toEqual(3);

        click("Predator");
        $("#wizzywigTableEditor .add.row").click();

        expect($("#testTable tr").length).toEqual(4);
    });

    it('We can delete rows from a table', function () {
        expect($("#testTable tr").length).toEqual(3);

        click("Predator");
        $("#wizzywigTableEditor .delete.row").click();

        expect($("#testTable tr").length).toEqual(2);
    });

    it('We can delete columns from a table', function () {
        expect($("#headers td").length).toEqual(3);

        click("Nuts");
        $("#wizzywigTableEditor .delete.column").click();

        expect($("#headers td").length).toEqual(2);
    });

    it('Deleting all the cells in a table deletes the table as well', function () {
        expect($("#headers td").length).toEqual(3);

        click("Monkeys");
        $("#wizzywigTableEditor .delete.column").click();
        $("#wizzywigTableEditor .delete.column").click();
        $("#wizzywigTableEditor .delete.column").click();

        click("Animals");
        $("#wizzywigTableEditor .delete.row").click();

        expect(exists($("#testTable"))).toBeFalsy();
    });

    it('We can duplicate tables', function () {
        expect($(".testTable").length).toEqual(1);

        click("Nuts");
        $("#wizzywigTableEditor .add.table").click();

        expect($(".testTable").length).toEqual(2);
    });

    it('We can delete tables', function () {
        expect(exists($(".testTable"))).toBeTruthy();

        click("Nuts");
        $("#wizzywigTableEditor .delete.table").click();

        expect(exists($(".testTable"))).toBeFalsy();
    });

    it('When we stop editing a table, the editing console disappears', function () {
        click("Monkeys");
        expect($("#wizzywigTableEditor").is(":visible")).toBeTruthy();

        $("#anInputField").blur();
        expect($("#wizzywigTableEditor").is(":visible")).toBeFalsy();
    });

    function click(cellText) {
        var tableCell = $("#testTable td").filter(function() { return $(this).text() == cellText; }).first();
        tableEditor.edit(tableCell);
    }
});
