//

function StyleCopier($elem, styles) {
    var self = this;

    var snapshot = $.map(styles, function (style, index) {
        return {
            styleName: style,
            styleValue: $elem.css(style)
        }
    });

    self.apply = function ($anotherElem) {
        $.each(snapshot, function(index, style) {
            $anotherElem.css(style.styleName, style.styleValue);
        });
    };
}