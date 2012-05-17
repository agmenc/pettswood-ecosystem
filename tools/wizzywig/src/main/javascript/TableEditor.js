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
    }

    function copyRow() {
        var $row = $currentElement.parent();
        var $newRow = $row.clone();
        $newRow.children().each(function () { bless($(this))} );
        $row.after($newRow);
    }

    function copyColumn() {
        var column = index($currentElement) + 1;
        $currentTable.find("tr td:nth-child(" + column + ")").each(function() {
            $(this).after(bless($(this).clone()));
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
TableEditor.console = '<div id="wizzywigTableEditor">' + TableEditor.add + '<div id="add" class="console circle left">' + TableEditor.buttonPad + '</div>' + TableEditor.deleteCells + '</div>';
