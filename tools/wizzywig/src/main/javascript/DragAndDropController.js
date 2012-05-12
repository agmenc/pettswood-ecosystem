//

function DragAndDropController(bless) {
    var $source;

    this.makeMoveable = function($draggables) { makeDraggable($draggables, "move"); };
    this.makeCopyable = function($draggables) { makeDraggable($draggables, "copy"); };

    this.makeDroppable = function($droppables, dropEffect) {
        $droppables.each(function () { new DropTarget($(this), {drop: dropHandler, effect: dropEffect}); });
    };

    function makeDraggable($draggables, theEffect) {
        $draggables.each(function () { new DragSource($(this), {dragStart:dragRecorder, effect:theEffect}); });
    }

    function dragRecorder($draggedElement) { $source = $draggedElement; }

    function dropHandler($target, desiredEffect) {
        var $incoming = $source;
        if (desiredEffect === "copy") {
            $incoming = $source.clone();
            $incoming.addClass("clear").removeClass("left");
            $incoming.find(WizzyWig.editableElements).each(function() { bless($(this)); });
            new DragSource($incoming, {dragStart: dragRecorder});
            new DropTarget($incoming, {drop: dropHandler});
        }

        $target.before($incoming);
    }
}