//

function TableEditor() {
    var $currentElement;
    var $currentTable;

    this.edit = function ($element) {
        var $table = $element.parents("table").first();
        if (exists($table)) showConsole($table, $element);
    };

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
        $("#add .r").click(columnRight);
        $("#add .l").click(columnLeft);
    }

    function columnRight() {
        var column = index($currentElement) + 1;
        $currentTable.find("tr td:nth-child(" + column + ")").each(function() {
            $(this).after($(this).clone());
        });
    }

    function columnLeft() {
        var column = index($currentElement) + 1;
        $currentTable.find("tr td:nth-child(" + column + ")").each(function() {
            $(this).before($(this).clone());
        });
    }

    function toLeft($element) { $element.before($element.clone()); }
    function toRight($element) { $element.after($element.clone()); }

    function copyColumn(copyCells) {
        var column = index($currentElement) + 1;
        $currentTable.find("tr td:nth-child(" + column + ")").each(function() { copyCells($(this)); });
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

TableEditor.console = '<div id="wizzywigTableEditor"><div id="add" class="console circle">' + TableEditor.buttonPad + '</div></div>';
