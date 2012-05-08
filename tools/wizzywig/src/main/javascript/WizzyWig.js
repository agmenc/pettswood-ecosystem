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
    $("body").append(WizzyWig.console);
    $(editableElements).each(function() {
        $(this).addClass("editable");
        $(this).click(function () {
            new Inputter($(this));
            if ($("#wizzywigConsole").hasClass("hidden")) $("#wizzywigConsole").removeClass("hidden");
        });
    });
}

WizzyWig.console = '<div id="wizzywigConsole" class="hidden"><button>Save</button></div>';

function cssUrl() {
    var url = $('script[src*="izzy"]').first().attr("src");
    return url.replace(/main\/javascript\/.*/g, "main/css/wizzywig.css");
}
