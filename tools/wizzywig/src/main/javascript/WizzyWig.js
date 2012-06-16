//

function asPlain($jquerifiedElement) {
    return $jquerifiedElement[0];
}

function exists($thing) {
    if (typeof $thing === "undefined") return false;
    if (!$thing.size) throw "Not a JQuery object";
    return $thing.size() > 0;
}

var tail = function() { return this.slice(1); };
String.prototype.head = function() { return this.slice(0, 1); };
String.prototype.tail = tail;
Array.prototype.head = function() { return this[0]; };
Array.prototype.tail = tail;

function whole(num) { return parseInt(num.toFixed(0)); }
function middle($element) { return $element.offset().top + whole($element.outerHeight()/2); }
function left($element) { return $element.offset().left; }
function right($element) { return $element.offset().left + $element.outerWidth(); }

function WizzyWig(editableElements, saver, tableEditor, dragonController, blesser) {
    blesser.delegate(makeEditable);
    $(editableElements).each(function () { makeEditable($(this)); });
    dragonController.makeMoveable($(WizzyWig.draggableElements));
    dragonController.makeDropTarget($(WizzyWig.draggableElements));

    $("body").append(WizzyWig.console);
    $("#wizzywigConsole .save").click(function($event) { saver.save($event); });
    dragonController.makeCopyable($("#wizzywigConsole table"));

    function makeEditable($element) {
        $element.addClass("editable");
        $element.click(function () {
            if (!exists($element.find("input.inputter"))) new Inputter($element);
            tableEditor.edit($element);
        });
        return $element;
    }
}

WizzyWig.editableElements = "td, h1, h2, p";
WizzyWig.draggableElements = "table, h1, h2, p";
WizzyWig.clearDiv = '<div class="clear"/>';
WizzyWig.saveButton = '<button class="save clear left">Save</button>';
WizzyWig.helpButton = '<button class="help clear left">Help</button>';
WizzyWig.simpleConcept1 = '<table id="simpleConcept"><tr><td class="names">Simple Concept 1</td><td>some input 1</td><td class="names">some action</td><td>some input 2</td></tr></table>';
WizzyWig.simpleConcept2 = '<table id="simpleConcept"><tr><td class="names">Simple Concept 2</td><td>some input</td></tr></table>';
WizzyWig.multiRowConcept = '<table class="left"><tr><td class="fixture">MultiRow Concept</td></tr><tr class="names"><td>heading 1</td><td>heading 2</td></tr><tr><td>data element 1</td><td>data element 2</td></tr></table>';
WizzyWig.console = '<div class="middleFixed"><div id="wizzywigConsole" class="console"><span id="plus">w</span><div class="left spaced" style="margin-top: 20px; ">' + WizzyWig.saveButton + WizzyWig.helpButton + '</div><div class="left">' + WizzyWig.simpleConcept1 + WizzyWig.simpleConcept2 + '</div>' + WizzyWig.multiRowConcept + WizzyWig.clearDiv + '</div></div>';

WizzyWig.knownBugs = 'These features are known to misbehave in certain browsers:\n' +
        ' * Input fields don\'t respond to mouse clicks (Firefox)\n' +
        ' * Failure to insert the correct cells when adding columns (IE8)\n' +
        '';
