//

function StyleCopier($elem, styles) {
    var snapshot = $.map(styles, function (style, index) {
        return {
            styleName: style,
            styleValue: $elem.css(style)
        }
    });

    this.apply = function ($anotherElem) {
        $.each(snapshot, function(index, style) {
            $anotherElem.css(style.styleName, style.styleValue);
        });
    };
}