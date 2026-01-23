import '@css/common.scss'

const resetScroll = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.addEventListener('pageshow', () => {
  resetScroll()
  setTimeout(resetScroll, 0)
})

window.addEventListener('load', () => {
  resetScroll()
  setTimeout(resetScroll, 0)
})

document.addEventListener('DOMContentLoaded', () => {
  resetScroll()
  requestAnimationFrame(resetScroll)
  init()
})

function init() {
  const base = document.querySelector('#js-jiyuka') as HTMLElement
  const cover = base.querySelector('.c-cover') as HTMLElement

  setTimeout(() => {
    cover?.classList.add('is-hide')
  }, 200)
}
