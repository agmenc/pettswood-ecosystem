//

describe('WizzyWig', function () {

    var wizzyWig;

    beforeEach(function () {
        wizzyWig = new WizzyWig();
    });

    afterEach(function () {
        //
    });

    it('Editable elements are identified on hover', function () {
        expect($emptyDiv.html()).toContain(child());
    });



//    it('Uses the div id as key to find saved JSON data to populate the tree', function () {
//        $emptyDiv.html("");
//        spyOn(storage, 'holds').andReturn(false);
//
//        listBuilder = new Builder($emptyDiv, storage);
//
//        expect(storage.holds).toHaveBeenCalledWith("emptyDiv");
//    });
//    it('Fails noisily if you try to bind an ideaList to a root that already contains one', function () {
//        $("body").append('<div id="divWithChildren" class="ideaList"><span>You are a monkey</span></div>');
//
//        expect(function() {
//            new Builder($("#divWithChildren"), storage);
//        }).toThrow("Cannot bind an ideaList to a DOM object with children. Use an empty div instead.");
//    });

});
