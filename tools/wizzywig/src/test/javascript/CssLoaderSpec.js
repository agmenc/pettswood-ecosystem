//

describe('CssLoader', function () {

    beforeEach(function () {
        link("wizzywig.css").remove()
    });

    afterEach(function () {
        link("wizzywig.css").remove()
    });

    it('We can load a CSS script', function () {
        expect(exists(link("wizzywig.css"))).toBeFalsy();
        new CssLoader("../../main/css/wizzywig.css");

        waitsFor(function () {
            return exists(link("wizzywig"));
        }, "CSS link to be added", 500);
    });

    function link(name) {
        var allLinks = $("head link");
        return allLinks.filter(attributeFilter("href", name))
    }

    function attributeFilter(attribute, contains) {
        return function () { return $(this).attr(attribute).match(new RegExp(contains, "g")) };
    }
});
