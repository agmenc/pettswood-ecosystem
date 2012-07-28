//

function Saver() {
    var self = this;

    function bodyWithoutWizzyWig() {
        $("body").append('<div id="saverSandbox" class="hidden">' + $("body").html() + '</div>');

        $("#saverSandbox .editable").each(function () {
            $(this).removeClass("editable");
        });

        $("#saverSandbox [draggable='true']").each(function () {
            $(this).removeAttr("draggable");
        });

        $("#saverSandbox #wizzywigConsole").remove();
        $("#saverSandbox #wizzywigConsole").remove();
        $("#saverSandbox .middleFixed").remove();
        $("#saverSandbox #saveAs").remove();

        var strippedContents = $("#saverSandbox").html().replace(/ class=\"\"/g, "");
        $("#saverSandbox").remove();
        return strippedContents;
    }

    this.contents = function() {
        var strippedContents = bodyWithoutWizzyWig();
        return '<html><head>' + $("head").html() + '</head>' + '<body>' + strippedContents + '</body></html>';
    };

    this.save = function($event) {
        var uriContent = "data:application/octet-stream," + encodeURIComponent(self.contents());
        window.open(uriContent, '_self');

        // TODO - CAS - 27/07/2012 - Alternative approaches:
        // execCommand("saveas", false, "someName.html") ==> waiting for this to hit the main browsers. Part of HTML5
        // Open an iFrame and set the contents to the page contents, then use "Save Frame As" ==> Unfortunately, Chrome does not have "Save Frame As"

        $event.stopPropagation();
        $event.preventDefault();
        return false;
    };
}