(function() {
  const button = document.querySelector('.js-header-menu-mobile-button')
  const dropdown = document.querySelector('.js-header-menu-mobile-dropdown')

  button.addEventListener('click', function() {
    button.classList.toggle('app-menu-button--active')
    dropdown.classList.toggle('app-header-mobile__dropdown--show')
  })
})();
