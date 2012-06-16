//

function TableEditor(blesser) {
    var $currentElement;
    var $currentTable;
    var lockConsoleOpen = false;

    this.edit = function ($element) {
        var $table = $element.parents("table").first();
        if (exists($table)) showConsole($table, $element);

        var $inputField = $element.find("input.inputter").first();
        if (exists($inputField)) $inputField.blur(hideConsole);
    };

    function hideConsole() {
        if (lockConsoleOpen) lockConsoleOpen = false;
        else $("#wizzywigTableEditor").hide();
    }

    function showConsole($table, $element) {
        if (!exists($("#wizzywigTableEditor"))) { buildConsole(); }
        $currentElement = $element;
        $currentTable = $table;
        $("#wizzywigTableEditor").show();
        positionConsole($element, $table);
    }

    function positionConsole($element, $table) {
        var datum = middle($element);
        var editorHeight = $("#wizzywigTableEditor").outerHeight();
        var top = datum - (editorHeight / 2);
        $("#wizzywigTableEditor").css("top", top);
        $("#wizzywigTableEditor").css("left", right($table) + 10);
    }

    function lockConsole() { lockConsoleOpen = true; }
    function unlockConsole() { lockConsoleOpen = false; }

    function buildConsole() {
        $("body").append(TableEditor.console);
        $("#wizzywigTableEditor").hide();
        $("#wizzywigTableEditor .copyTable").click(hideAfter(copyTable));
        $("#wizzywigTableEditor .add.column").click(hideAfter(copyColumn));
        $("#wizzywigTableEditor .add.row").click(hideAfter(copyRow));
        $("#wizzywigTableEditor .deleteTable").click(hideAfter(deleteTable));
        $("#wizzywigTableEditor .delete.column").click(hideAfter(deleteColumn));
        $("#wizzywigTableEditor .delete.row").click(hideAfter(deleteRow));
        $("#wizzywigTableEditor").focus(function () { $("#wizzywigTableEditor").show(); });
        $("#wizzywigTableEditor").find(".add, .delete").mouseenter(lockConsole);
        $("#wizzywigTableEditor").find(".add, .delete").mouseleave(unlockConsole);
        $("#wizzywigTableEditor button").mouseenter(lockConsole);
        $("#wizzywigTableEditor button").mouseleave(unlockConsole);
    }

    function hideAfter(fn) {
        return function() {
            fn();
            hideConsole();
        }
    }

    function deleteTable() { $currentTable.remove(); }

    function copyTable() {
        var $newTable = $currentTable.clone();
        $newTable.find("td").each(function () { blesser.bless($(this)) });
        $currentTable.after($newTable);
    }

    function copyRow() {
        var $row = $currentElement.parent();
        var $newRow = $row.clone();
        $newRow.children().each(function () { blesser.bless($(this))});
        $row.after($newRow);
    }

    function deleteRow() {
        $currentElement.parent().remove();
        if (!exists($currentTable.find("td"))) $currentTable.remove();
    }

    function copyColumn() {
        cellsInColumn(function ($cell) {
            $cell.after(blesser.bless($cell.clone()));
        });
        positionConsole($currentElement, $currentTable);
    }

    function deleteColumn() { cellsInColumn(function ($cell) { $cell.remove(); }); }

    function cellsInColumn(f) {
        var column = index($currentElement);
        $currentTable.find("tr")
                .filter(function () { return !$(this).hasClass("fixture"); })
                .each(function () {
                          f($($(this).children("td").get(column)));
                      });
    }

    function index($element) {
        return $element.parent().children().index($element);
    }

    function button(effect, orientation, rows) {
        return '<div class="holder clear right">\n' +
                '<table class="' + effect + ' ' + orientation + '">\n' +
                renderRows(rows) +
                '</table>\n' +
                '</div>\n';
    }

    function renderRows(rows) {
        return (rows.length == 0) ? "" : '<tr>' + renderRow(rows.head()) + '</tr>' + renderRows(rows.tail());
    }

    function renderRow(cells) {
        return cells == "" ? "" : renderSingleCell(cells.head()) + renderRow(cells.tail());
    }

    function renderSingleCell(cellType) { return (cellType == "1") ? '<td class="change"></td>' : '<td></td>'; }

    TableEditor.affectColumn = ["01000", "01000", "01000", "01000"];
    TableEditor.affectRow = ["00000", "11111", "00000", "00000"];
    TableEditor.copyTableButton = '<button class="copyTable clear right">Copy Table</button>';
    TableEditor.addRowButton = button("add", "row", TableEditor.affectRow);
    TableEditor.addColumnButton = button("add", "column", TableEditor.affectColumn);
    TableEditor.deleteTableButton = '<button class="deleteTable clear left">Delete Table</button>';
    TableEditor.deleteRowButton = button("delete", "row", TableEditor.affectRow);
    TableEditor.deleteColumnButton = button("delete", "column", TableEditor.affectColumn);
    TableEditor.add = '<div class="spaced left">' + TableEditor.copyTableButton + TableEditor.addRowButton + TableEditor.addColumnButton + '</div>';
    TableEditor.deleteCells = '<div class="spaced left">' + TableEditor.deleteTableButton + TableEditor.deleteRowButton + TableEditor.deleteColumnButton + '</div>';
    TableEditor.console = '<div id="wizzywigTableEditor" class="console">' + TableEditor.add + TableEditor.deleteCells + '</div>';
}
