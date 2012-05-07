//

function asPlain($jquerifiedElement) {
    return $jquerifiedElement[0];
}

function exists($thing) {
    if (typeof $thing === "undefined") return false;
    if (!$thing.size) throw "Not a JQuery object";
    return $thing.size() > 0;
}

function WizzyWig(editableElements) {
    $(editableElements).each(function() {
        $(this).addClass("editable");
        $(this).click(function () { new Inputter($(this)); });
    });
}

$(document).ready(function() {
    new CssLoader("../../main/css/wizzywig.css");
    new WizzyWig("td, h1, h2, p");
});
