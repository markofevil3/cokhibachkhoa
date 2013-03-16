function Dim() {};

Dim.div = document.createElement('div');
Dim.div.setAttribute('id', 'dim');
Dim.isEnabled = false;

Dim.enable = function() {
  if (!Dim.isEnabled) {
    document.body.appendChild(Dim.div);

    Dim.isEnabled = true;
  }
};

Dim.disable = function() {
  if (Dim.isEnabled) {
    Dim.div.removeEventListener('touchstart', Dim.touchstart);
    Dim.div.removeEventListener('touchmove', Dim.touchmove);
    Dim.div.removeEventListener('touchend', Dim.touchend);
    removeFromDocument(Dim.div);
    Dim.isEnabled = false;
  }
};