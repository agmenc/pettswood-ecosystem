//

describe('Blesser', function () {

    it('All delegates are called when we bless an element', function () {
        var blesser = new Blesser();
        var callCounter = 0;

        blesser.delegate(function () { callCounter++; });
        blesser.delegate(function () { callCounter++; });
        blesser.delegate(function () { callCounter++; });

        blesser.bless("whatever");

        expect(callCounter).toEqual(3);
    });
});
