function Popup() {};

Popup.activeParent = null;
Popup.activePopup = null;

Popup.open = function(parent, popup) {
  Dim.enable();
  Popup.activeParent = parent;
  Popup.activePopup = popup;
  Popup.activeParent.appendChild(Popup.activePopup);
};

Popup.replace = function(popup) {
  removeFromDocument(Popup.activePopup);
  Popup.activePopup = popup;
  Popup.activeParent.appendChild(Popup.activePopup);
};

Popup.close = function() {
  removeFromDocument(Popup.activePopup);
  Popup.activePopup = null;
  Popup.activeParent = null;
  Dim.disable();
};
