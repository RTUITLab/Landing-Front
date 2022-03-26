let elems=Array.from(document.getElementsByClassName("equipment__content")[0].children)

for(let i=2;i<elems.length;i++){
  elems[i].setAttribute("hidden","true")
}