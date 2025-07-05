(function() {
  const button = document.querySelector('.js-header-menu-desktop-button')
  const dropdown = document.querySelector('.js-header-menu-desktop-dropdown')

  button.addEventListener('click', function() {
    button.classList.toggle('app-menu-button--active')
    dropdown.classList.toggle('app-header-desktop__dropdown--show')
  })
})();
