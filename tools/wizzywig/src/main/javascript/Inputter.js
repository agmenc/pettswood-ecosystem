//

function Inputter($elem) {

    var originalText = $elem.text();
    var originalStyles = new StyleCopier($elem, ['height', 'width']);
    $elem.text("");
    $elem.append(Inputter.inputElement);
    var $inputElement = $elem.find("input");
    $inputElement.val(originalText);
    originalStyles.apply($inputElement);

    $inputElement.blur(function () {
        var parent = $inputElement.parent();
        var val = $inputElement.val();

        $inputElement.remove();
        parent.html(val);
    });

    asPlain($inputElement).focus();
}

Inputter.acceptInputFor = function ($element) {
    return function () {
        if (!exists($element.find("input.inputter"))) new Inputter($element);
        return true;
    }
};

Inputter.inputElement = '<input class="inputter" name="inputter" type="text" draggable="false" value="@original text@">';