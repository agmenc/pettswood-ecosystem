//

describe('Inputter', function () {

    beforeEach(function () {
        $("body").append('<h1 id="monkeys">Monkeys</h1>')
    });

    afterEach(function () {
        inputters().remove();
        $("#monkeys").remove();
    });

    it('Each new Inputter creates an input field inside the target element', function () {
        expect(exists(inputters())).toBeFalsy();

        new Inputter($("#monkeys"));

        expect(exists(inputters())).toBeTruthy();
    });

    it('New inputters always grab the focus', function () {
        new Inputter($("#monkeys"));

        expect(inputters().is(":focus")).toBeTruthy();
    });

    it('The value of the input field is stolen from the parent object', function () {
        expect(textNoKids($("#monkeys"))).toEqual("Monkeys");

        new Inputter($("#monkeys"));

        expect(textNoKids($("#monkeys"))).toEqual("");
        expect(inputters().val()).toEqual("Monkeys");
    });

    it('Passes its value back to the parent object when it loses focus', function () {
        new Inputter($("#monkeys"));

        inputters().blur();

        expect(textNoKids($("#monkeys"))).toEqual("Monkeys");
    });

    it('Removes the input field when it loses focus', function () {
        new Inputter($("#monkeys"));

        $(inputters()).blur();

        expect(exists(inputters())).toBeFalsy();
    });

    it('The input field takes the dimensions of the parent field', function () {
        $("#monkeys").css("height", "150px");
        $("#monkeys").css("width", "250px");

        new Inputter($("#monkeys"));

        expect(inputters().css("height")).toEqual("150px");
        expect(inputters().css("width")).toEqual("250px");
    });

    it('Clicking the input field should not cause a new, empty, input field to take its place', function () {
        expect($("#monkeys").text()).toEqual("Monkeys");

        $("#monkeys").click(function () { if (!exists($("input.inputter"))) new Inputter($("#monkeys")); });
        $("#monkeys").click();
        $("#monkeys").click();
        $("#monkeys").click();

        inputters().blur();
        expect($("#monkeys").text()).toEqual("Monkeys");
    });

    function textNoKids($elem) {
        return $elem.contents().first().text();
    }

    function inputters() {
        return $("input.inputter");
    }
});
