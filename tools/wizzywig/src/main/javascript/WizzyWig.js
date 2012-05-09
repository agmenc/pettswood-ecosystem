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
    $("body").append(WizzyWig.console);
    $("#wizzywigConsole .save").click(function() { saver.save(); });
    $(editableElements).each(function() {
        $(this).addClass("editable");
        $(this).click(function () {
            new Inputter($(this));
            if ($("#wizzywigConsole").hasClass("hidden")) $("#wizzywigConsole").removeClass("hidden");
        });
    });
}

WizzyWig.console = '<div id="wizzywigConsole" class="hidden"><button class="save">Save</button></div>';
WizzyWig.editableElements = "td, h1, h2, p";

function cssUrl() {
    var url = $('script[src*="izzy"]').first().attr("src");
    return url.replace(/main\/javascript\/.*/g, "main/css/wizzywig.css");
}
