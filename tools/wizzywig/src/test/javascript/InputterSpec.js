//

describe('Inputter', function () {

    beforeEach(function () {
        $("body").append('<h1 id="monkeys">Monkeys</h1>')
    });

    afterEach(function () {
        inputter().remove();
        $("#monkeys").remove();
    });

    it('Each new Inputter creates an input field inside the target element', function () {
        expect(exists(inputter())).toBeFalsy();

        new Inputter($("#monkeys"));

        expect(exists(inputter())).toBeTruthy();
    });

    it('New inputters always grab the focus', function () {
        new Inputter($("#monkeys"));

        expect(inputter().is(":focus")).toBeTruthy();
    });

    it('The value of the input field is stolen from the parent object', function () {
        expect(textNoKids($("#monkeys"))).toEqual("Monkeys");

        new Inputter($("#monkeys"));

        expect(textNoKids($("#monkeys"))).toEqual("");
        expect(inputter().val()).toEqual("Monkeys");
    });

    it('Passes its value back to the parent object when it loses focus', function () {
        new Inputter($("#monkeys"));

        inputter().blur();

        expect(textNoKids($("#monkeys"))).toEqual("Monkeys");
    });

    it('Removes the input field when it loses focus', function () {
        new Inputter($("#monkeys"));

        $(inputter()).blur();

        expect(exists(inputter())).toBeFalsy();
    });

    it('The input field takes the dimensions of the parent field', function () {
        $("#monkeys").css("height", "150px");
        $("#monkeys").css("width", "250px");

        new Inputter($("#monkeys"));

        expect(inputter().css("height")).toEqual("150px");
        expect(inputter().css("width")).toEqual("250px");
    });

    function textNoKids($elem) {
        return $elem.contents().first().text();
    }

    function inputter() {
        return $("input.inputter");
    }
});
