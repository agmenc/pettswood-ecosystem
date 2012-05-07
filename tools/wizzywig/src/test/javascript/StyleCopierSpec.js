//

describe('StyleCopier', function () {

    beforeEach(function () {
        $("body").append('' +
                '<div id="monkeys" style="display: block; height: 150px; width: 250px; color: red; opacity: 0.1; ">Monkeys</div>' +
                '<div id="dugongs" style="display: block; height: 001px; width: 001px; color: red; opacity: 0.9; ">Dugongs</div>'
        );
    });

    afterEach(function () {
        $("#monkeys").remove();
        $("#dugongs").remove();
    });

    it('Copies all named styles from original to target', function () {
        var copier = new StyleCopier($("#monkeys"), ["height", "width"]);

        copier.apply($("#dugongs"));

        expect($("#dugongs").css("height")).toEqual("150px");
        expect($("#dugongs").css("width")).toEqual("250px");
    });
});