//

function original($e) { return $e.originalEvent; }

function DragSource($element, options /* dragStart[function($element)], dragEnd[function($element)], effect["move", "copy" or "link"] */ ) {
    if (!options) options = {};
    $element.attr("draggable", "true");
    $element.bind('dragstart', handleDragStart);
    $element.bind('dragend', handleDragEnd);

    function handleDragStart(event) {
        original(event).dataTransfer.effectAllowed = options.effect ? options.effect : "move";
        original(event).dataTransfer.setData('text/html', "monkeys");
        if (options.dragStart) options.dragStart($element);
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
    var desiredEffect;

    function handleDragEnterAndOver(event) {
        desiredEffect = original(event).dataTransfer.dropEffect;
        $element.addClass("dragTarget");
        if (options.dragOver) options.dragOver($element);

        original(event).preventDefault();
        return false;
    }

    function handleDragLeave() {
        $element.removeClass("dragTarget");
        if (options.dragLeave) options.dragLeave($element);
    }

    function handleDrop(event) {
        if (options.drop) options.drop($element, desiredEffect);
        $element.removeClass("dragTarget");

        original(event).stopPropagation();
        return false;
    }
}