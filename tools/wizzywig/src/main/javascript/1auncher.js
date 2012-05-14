//

if (typeof $ === "undefined" || !$) alert('' +
        'You must include JQuery to run WizzyWig. Consider adding this to the top of your HTML:\n' +
        '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>'
);

$(document).ready(function() {
    new CssLoader(cssUrl());
    new WizzyWig(WizzyWig.editableElements, new Saver(), new TableEditor(), new DragonController());
});

function cssUrl() {
    var url = $('script[src*="izzy"]').first().attr("src");
    return url.replace(/\/javascript\/.*/g, "/css/wizzywig.css");
}