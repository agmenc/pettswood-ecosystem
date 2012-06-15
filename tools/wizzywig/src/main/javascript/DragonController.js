//

function DragonController(blesser) {
    var $source;
    var effect;

    this.makeMoveable = function($draggables) { makeDraggable($draggables, "move"); };
    this.makeCopyable = function($draggables) { makeDraggable($draggables, "copy"); };

    function makeDraggable($draggables, dragEffect) {
        $draggables.each(function () { new DragSource($(this), {dragStart:dragRecorder, effect: dragEffect}); });
    }

    function dragRecorder($draggedElement, effectAllowed) { $source = $draggedElement; effect = effectAllowed; }

    this.makeDropTarget = function ($targets) {
        $targets.each(function () { new DropTarget($(this), {drop: dropHandler}); });
    };

    function dropHandler($target) {
        var $incoming = $source;
        if (effect === "copy") {
            $incoming = $source.clone();
            $incoming.addClass("clear").removeClass("left");
            $incoming.find(WizzyWig.editableElements).each(function() { blesser.bless($(this)); });
            new DragSource($incoming, {dragStart: dragRecorder});
            new DropTarget($incoming, {drop: dropHandler});
        }

        $target.before($incoming);
    }
}