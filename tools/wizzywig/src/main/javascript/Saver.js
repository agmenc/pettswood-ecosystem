//

function Saver() {
    var self = this;

    function bodyWithoutWizzyWig() {
        $("body").append('<div id="saverSandbox" class="hidden">' + $("body").html() + '</div>');

        $("#saverSandbox .editable").each(function () {
            $(this).removeClass("editable");
        });

        $("#wizzywigConsole").remove();
        $("#wizzywigConsole").remove();

        var strippedContents = $("#saverSandbox").html().replace(/ class=\"\"/g, "");
        $("#saverSandbox").remove();
        return strippedContents;
    }

    this.contents = function() {
        var strippedContents = bodyWithoutWizzyWig();
        return '<html><head>' + $("head").html() + "</head><body>" + strippedContents + '</body></html>';
    };

    this.save = function($event) {
        var uriContent = "data:application/octet-stream," + encodeURIComponent(self.contents());
        window.open(uriContent, '_self');
        $event.stopPropagation();
        $event.preventDefault();
        return false;
    };
}