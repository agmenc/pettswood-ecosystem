//

function CssLoader(scriptLocation) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", scriptLocation);
    document.getElementsByTagName("head")[0].appendChild(link);
}
