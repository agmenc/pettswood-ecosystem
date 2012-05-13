//

function asPlain($jquerifiedElement) {
    return $jquerifiedElement[0];
}

function exists($thing) {
    if (typeof $thing === "undefined") return false;
    if (!$thing.size) throw "Not a JQuery object";
    return $thing.size() > 0;
}

function WizzyWig(saver, editableElements) {
    $(editableElements).each(function () { makeEditable($(this)); });
    var dndController = new DragonController(makeEditable);
    dndController.makeMoveable($(WizzyWig.draggableElements));
    dndController.makeDropTarget($(WizzyWig.draggableElements));

    $("body").append(WizzyWig.console);
    $("#wizzywigConsole .save").click(function($event) { saver.save($event); });
    dndController.makeCopyable($("#wizzywigConsole table"));

    function makeEditable($element) {
        if (!$element.hasClass("editable")) {
            $element.addClass("editable");
            $element.click(Inputter.acceptInputFor($element));
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
WizzyWig.console = '<div class="middleFixed"><div id="wizzywigConsole"><span id="plus">+</span><div class="left spaced" style="margin-top: 20px; ">' + WizzyWig.saveButton + WizzyWig.helpButton + '</div>' + WizzyWig.simpleConcept + WizzyWig.multiRowConcept + WizzyWig.clearDiv + '</div></div>';
