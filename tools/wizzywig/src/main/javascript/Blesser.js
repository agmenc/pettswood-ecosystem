
function Blesser() {
    var delegates = [];
    this.delegate = function(blesser) { delegates.push(blesser); };
    this.bless = function($element) { $.each(delegates, function(index, value) { value($element) }); return $element; };
}
