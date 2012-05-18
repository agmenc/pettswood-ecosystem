//

function TableEditor() {
    var $currentElement;
    var $currentTable;
    var bless;

    this.edit = function ($element) {
        var $table = $element.parents("table").first();
        if (exists($table)) showConsole($table, $element);
    };

    this.addBlesser = function (blesserFunction) { bless = blesserFunction; };

    function showConsole($table, $element) {
        if (!exists($("#wizzywigTableEditor"))) { buildConsole(); }
        $currentElement = $element;
        $currentTable = $table;
        var datum = middle($element);
        var editorHeight = $("#wizzywigTableEditor").outerHeight();
        var top = datum - (editorHeight / 2);
        $("#wizzywigTableEditor").css("top", top);
        $("#wizzywigTableEditor").css("left", right($table));
        $("#wizzywigTableEditor").show();
    }

    function buildConsole() {
        $("body").append(TableEditor.console);
        $("#wizzywigTableEditor").hide();
        $("#wizzywigTableEditor .addColumn").click(copyColumn);
        $("#wizzywigTableEditor .addRow").click(copyRow);
        $("#wizzywigTableEditor .deleteColumn").click(deleteColumn);
        $("#wizzywigTableEditor .deleteRow").click(deleteRow);
    }

    function copyRow() {
        var $row = $currentElement.parent();
        var $newRow = $row.clone();
        $newRow.children().each(function () { bless($(this))} );
        $row.after($newRow);
    }

    function deleteRow() {
        $currentElement.parent().remove();
        if (!exists($currentTable.find("td"))) $currentTable.remove();
    }

    function copyColumn() { cellsInColumn(function ($cell) { $cell.after(bless($cell.clone())); }); }
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
}

TableEditor.buttonPad = '' +
        '<table>' +
        '   <tr style="visibility: hidden">' +
        '       <td></td>' +
        '       <td style="visibility: visible;"><div class="arrow u"></div></td>' +
        '       <td></td>' +
        '   </tr>' +
        '   <tr>' +
        '       <td><div class="arrow l"></div></td>' +
        '       <td title="Add cells" style="visibility: hidden"></td>' +
        '       <td><div class="arrow r"></div></td>' +
        '   </tr>' +
        '   <tr style="visibility: hidden">' +
        '       <td></td>' +
        '       <td style="visibility: visible;"><div class="arrow d"></div></td>' +
        '       <td></td>' +
        '   </tr>' +
        '</table>';

WizzyWig.addRowButton = '<button class="addRow clear right">Add Row</button>';
WizzyWig.addColumnButton = '<button class="addColumn clear right">Add Column</button>';
WizzyWig.deleteRowButton = '<button class="deleteRow clear left">Delete Row</button>';
WizzyWig.deleteColumnButton = '<button class="deleteColumn clear left">Delete Column</button>';
TableEditor.add = '<div class="spaced left">' + WizzyWig.addRowButton + WizzyWig.addColumnButton + '</div>';
TableEditor.deleteCells = '<div class="spaced left">' + WizzyWig.deleteRowButton + WizzyWig.deleteColumnButton + '</div>';
TableEditor.circleConsole = '<div id="add" class="console circle left">' + TableEditor.buttonPad + '</div>';
TableEditor.console = '<div id="wizzywigTableEditor">' + TableEditor.add + TableEditor.deleteCells + '</div>';
