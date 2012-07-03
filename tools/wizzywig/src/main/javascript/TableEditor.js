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
        $("#wizzywigTableEditor .add.table").click(unlockAfter(copyTable));
        $("#wizzywigTableEditor .add.column").click(unlockAfter(copyColumn));
        $("#wizzywigTableEditor .add.row").click(unlockAfter(copyRow));
        $("#wizzywigTableEditor .delete.table").click(unlockAfter(deleteTable));
        $("#wizzywigTableEditor .delete.column").click(unlockAfter(deleteColumn));
        $("#wizzywigTableEditor .delete.row").click(unlockAfter(deleteRow));
        $("#wizzywigTableEditor").find(".add, .delete").mouseenter(lockConsole);
        $("#wizzywigTableEditor").mouseleave(hideConsole);
    }

    function unlockAfter(fn) {
        return function() {
            fn();
            unlockConsole();
        }
    }

    function deleteTable() { $currentTable.remove(); }

    function copyTable() {
        var $newTable = $currentTable.clone();
        $currentTable.after($newTable);
        blesser.bless($newTable);
    }

    function copyRow() {
        var $row = $currentElement.parent();
        var $newRow = $row.clone();
        $row.after($newRow);
        blesser.bless($newRow);
    }

    function deleteRow() {
        $currentElement.parent().remove();
        if (!exists($currentTable.find("td"))) $currentTable.remove();
    }

    function copyColumn() {
        cellsInColumn(function ($cell) {
            var newCell = $cell.clone();
            $cell.after(newCell);
            blesser.bless(newCell)
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

    function index($element) { return $element.parent().children().index($element); }

    function button(effect, orientation, rows) {
        return '<div class="holder clear right">\n' +
                '<table class="' + effect + ' ' + orientation + '">\n' +
                renderRows(rows) +
                '</table>\n' +
                '</div>\n';
    }

    function renderRows(rows) { return (rows.length == 0) ? "" : '<tr>' + renderRow(rows.head()) + '</tr>' + renderRows(rows.tail()); }
    function renderRow(cells) { return cells == "" ? "" : renderCell(cells.head()) + renderRow(cells.tail()); }
    function renderCell(cellType) { return (cellType == "1") ? '<td class="change"></td>' : '<td></td>'; }

    TableEditor.affectColumn = ["01000", "01000", "01000", "01000"];
    TableEditor.affectRow = ["00000", "11111", "00000", "00000"];
    TableEditor.affectAll = ["11111", "11111", "11111", "11111"];
    TableEditor.copyTableButton = button("add", "table", TableEditor.affectAll);
    TableEditor.addRowButton = button("add", "row", TableEditor.affectRow);
    TableEditor.addColumnButton = button("add", "column", TableEditor.affectColumn);
    TableEditor.deleteTableButton = button("delete", "table", TableEditor.affectAll);
    TableEditor.deleteRowButton = button("delete", "row", TableEditor.affectRow);
    TableEditor.deleteColumnButton = button("delete", "column", TableEditor.affectColumn);
    TableEditor.add = '<div class="spaced left"><div class="iconsTitle clear right">+</div>' + TableEditor.copyTableButton + TableEditor.addRowButton + TableEditor.addColumnButton + '</div>';
    TableEditor.deleteCells = '<div class="spaced left"><div class="iconsTitle clear left">-</div>' + TableEditor.deleteTableButton + TableEditor.deleteRowButton + TableEditor.deleteColumnButton + '</div>';
    TableEditor.console = '<div id="wizzywigTableEditor" class="console">' + TableEditor.add + TableEditor.deleteCells + '</div>';
}
