//

function CssLoader(scriptLocation) {
    var matchingCurrentLinks = $("head link[href*='" + scriptLocation + "']");

    console.log("matchingCurrentLinks = " + matchingCurrentLinks);
    console.dir(matchingCurrentLinks);

    if (!exists(matchingCurrentLinks)) {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", scriptLocation);
        document.getElementsByTagName("head")[0].appendChild(link);
    }
}
