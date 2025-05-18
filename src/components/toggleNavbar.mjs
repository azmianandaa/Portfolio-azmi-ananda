export function initNavbarToggle(btnSelector, navbarSelector) {
  const btnMenu = document.querySelector(btnSelector)
  const navbar = document.querySelector(navbarSelector)

  if (!btnMenu || !navbar) return

  let isOpen = false
  let isTransitioning = false

  btnMenu.addEventListener('click', () => {
    if (isTransitioning) return

    isTransitioning = true
    btnMenu.classList.add('pointer-events-none')

    if (!isOpen) {
      navbar.style.height = navbar.scrollHeight + 'px'
    } else {
      navbar.style.height = '0px'
    }

    isOpen = !isOpen

    const onTransitionEnd = () => {
      isTransitioning = false
      btnMenu.classList.remove('pointer-events-none')
      navbar.removeEventListener('transitionend', onTransitionEnd)
    }

    navbar.addEventListener('transitionend', onTransitionEnd)

    btnMenu.classList.toggle('hamburger-active')
  })

  // Reset navbar jika pindah ke desktop
  window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth >= 768

    if (isDesktop) {
      navbar.style.height = 'auto'
      isOpen = false
      isTransitioning = false
      btnMenu.classList.remove('pointer-events-none')
    } else {
      navbar.style.height = isOpen ? navbar.scrollHeight + 'px' : '0px'
    }
  })
}
