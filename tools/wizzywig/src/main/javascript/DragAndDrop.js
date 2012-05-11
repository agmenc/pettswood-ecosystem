//

function DragAndDrop(options) {
    var self = this;
    options.$draggableElements.each(function () { makeDraggable($(this)); });
    options.$droppableElements.each(function () { makeDroppable($(this)); });
    this.dragStart = options.dragStart ? options.dragStart : function($sourceElement) { $sourceElement.addClass("drag"); };
    this.dragEnd = options.dragEnd ? options.dragEnd : function($sourceElement) { $sourceElement.removeClass("drag"); };
    this.dragEnter = options.dragEnter ? options.dragEnter : function($targetElement) { $targetElement.addClass("dragTarget"); };
    this.dragOver = options.dragOver ? options.dragOver : function($targetElement) { $targetElement.addClass("dragTarget"); };
    this.dragLeave = options.dragLeave ? options.dragLeave : function($targetElement) { $targetElement.removeClass("dragTarget"); };
    this.drop = options.dropHandler ? options.dropHandler : function ($sourceElement, $targetElement) {};

    var $source;

    function makeDraggable($element) {
        $element.attr("draggable", "true");
        $element.bind('dragstart', handleDragStart);
        $element.bind('dragend', handleDragEnd);
    }

    function makeDroppable($element) {
        $element.bind('dragenter', handleDragEnter);
        $element.bind('dragover', handleDragOver);
        $element.bind('dragleave', handleDragLeave);
        $element.bind('drop', handleDrop);
    }

    function handleDragStart(event) {
        $source = $(this);
        self.dragStart($source);
        original(event).dataTransfer.effectAllowed = 'move';
        original(event).dataTransfer.setData('text/html', "monkeys");
    }

    function handleDragOver(event) {
        original(event).preventDefault();
        original(event).dataTransfer.dropEffect = 'move';
        self.dragOver($(this));
        return false;
    }

    function handleDragEnd(event) { self.dragEnd($source); }
    function handleDragEnter(event) { self.dragEnter($(this)); }
    function handleDragLeave(event) { self.dragLeave($(this)); }

    function handleDrop(event) {
        var $target = $(this);
        original(event).stopPropagation();
        self.drop($source, $target);
        return false;
    }

    function original($e) { return $e.originalEvent; }
}