//

function WizzyWig(editableElements) {

    $(editableElements).each(function() {
        $(this).addClass("editable");
        $(this).click(function () { new Inputter($(this)); });
    });
}
