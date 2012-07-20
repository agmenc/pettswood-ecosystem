//

function DragonController(blesser) {
    var self = this;
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
            $target.before($incoming);
            blesser.bless($incoming);
            new DragSource($incoming, {dragStart: dragRecorder});
            new DropTarget($incoming, {drop: dropHandler});
        } else  $target.before($incoming);
    }

    blesser.delegate(function($element) { self.makeMoveable($element);  self.makeDropTarget($element); })
}