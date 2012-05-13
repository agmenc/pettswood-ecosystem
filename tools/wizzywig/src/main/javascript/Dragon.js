//

function original($e) { return $e.originalEvent; }

function DragSource($element, options /* dragStart[function($element, effectAllowed)], dragEnd[function($element)], effect["move", "copy" or "link"] */ ) {
    if (!options) options = {};
    $element.attr("draggable", "true");
    $element.bind('dragstart', handleDragStart);
    $element.bind('dragend', handleDragEnd);

    function handleDragStart(event) {
        $element.addClass("drag");
        if (options.dragStart) options.dragStart($element, options.effect ? options.effect : "move");
        original(event).dataTransfer.setData('text/html', "monkeys");
    }

    function handleDragEnd() {
        $element.removeClass("drag");
        if (options.dragEnd) options.dragEnd($element);
    }
}

function DropTarget($element, options /* dragOver[function($element)], dragLeave[function($element)], drop[function($element, desiredEffect)] */ ) {
    if (!options) options = {};
    $element.bind('dragenter', handleDragEnterAndOver);
    $element.bind('dragover', handleDragEnterAndOver);
    $element.bind('dragleave', handleDragLeave);
    $element.bind('drop', handleDrop);

    function handleDragEnterAndOver(event) {
        $element.addClass("dropTarget");
        if (options.dragOver) options.dragOver($element);

        original(event).preventDefault();
        return false;
    }

    function handleDragLeave() {
        $element.removeClass("dropTarget");
        if (options.dragLeave) options.dragLeave($element);
    }

    function handleDrop(event) {
        if (options.drop) options.drop($element);
        $element.removeClass("dropTarget");

        original(event).stopPropagation();
        return false;
    }
}