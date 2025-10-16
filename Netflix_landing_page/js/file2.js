const tabItems =document.querySelectorAll('.tab-item');
const tabContentItems =document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e){
  removeBorder();
  removeShow();
// Add border to current tab
  this.classList.add('tab-border');
  // grab content item from DOM
  const tabContentItems = document.querySelector(`#${this.id}-content`);
  //Add show class
  tabContentItems.classList.add('show');
}

function removeBorder(){
  tabItems.forEach(item => item.classList.remove('tab-border'))
}

function removeShow(){
  tabContentItems.forEach(item => item.classList.remove('show'))
}





// Listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));
