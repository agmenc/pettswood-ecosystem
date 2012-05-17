//

function asPlain($jquerifiedElement) {
    return $jquerifiedElement[0];
}

function exists($thing) {
    if (typeof $thing === "undefined") return false;
    if (!$thing.size) throw "Not a JQuery object";
    return $thing.size() > 0;
}

function middle($element) { return $element.offset().top + ($element.outerHeight()/2); }
function left($element) { return $element.offset().left; }
function right($element) { return $element.offset().left + $element.outerWidth(); }

function WizzyWig(editableElements, saver, tableEditor, dragonController) {
    $(editableElements).each(function () { makeEditable($(this)); });
    dragonController.makeMoveable($(WizzyWig.draggableElements));
    dragonController.makeDropTarget($(WizzyWig.draggableElements), makeEditable);

    $("body").append(WizzyWig.console);
    $("#wizzywigConsole .save").click(function($event) { saver.save($event); });
    dragonController.makeCopyable($("#wizzywigConsole table"));

    function makeEditable($element) {
        if (!$element.hasClass("editable")) {
            $element.addClass("editable");
            $element.click(function() {
                tableEditor.edit($element);
                if (!exists($element.find("input.inputter"))) new Inputter($element);
            });
        }
    }
}

WizzyWig.editableElements = "td, h1, h2, p";
WizzyWig.draggableElements = "table, h1, h2, p";
WizzyWig.clearDiv = '<div class="clear"/>';
WizzyWig.saveButton = '<button class="save clear left">Save</button>';
WizzyWig.helpButton = '<button class="help clear left">Help</button>';
WizzyWig.simpleConcept = '<table id="simpleConcept" class="left"><tr><td class="names">Simple Concept</td><td>x</td><td class="names">does</td><td>y</td></tr></table>';
WizzyWig.multiRowConcept = '<table class="left"><tr><td class="fixture">MultiRow Concept</td></tr><tr class="names"><td>heading 1</td><td>heading 2</td></tr><tr><td>data 1</td><td>data 2</td></tr></table>';
WizzyWig.console = '<div class="middleFixed"><div id="wizzywigConsole" class="console tablet"><span id="plus">w</span><div class="left spaced" style="margin-top: 20px; ">' + WizzyWig.saveButton + WizzyWig.helpButton + '</div>' + WizzyWig.simpleConcept + WizzyWig.multiRowConcept + WizzyWig.clearDiv + '</div></div>';

WizzyWig.knownBugs = 'These features are known to misbehave in certain browsers:\n' +
        ' * Input fields don\'t respond to mouse clicks (Firefox)\n' +
        ' * Failure to insert the correct cells when adding columns (IE8)\n' +
        '';
