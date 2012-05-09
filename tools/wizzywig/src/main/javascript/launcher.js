//

$(document).ready(function() {
    new CssLoader(cssUrl());
    new WizzyWig(new Saver(), WizzyWig,editableElements);
});