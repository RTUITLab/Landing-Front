var equipmentHidden = false;

function hideEquipment() {
  if (!equipmentHidden) {
    new Promise((_) => {
      let elems = Array.from(document.getElementsByClassName('equipment__content')[0].children);

      for (let i = 3; i < elems.length; i++) {
        elems[i].setAttribute('hidden', 'true');
      }
      _();
    });
    equipmentHidden = true;
    window.removeEventListener("load",hideEquipment)
  }
}

window.addEventListener("load",hideEquipment)

