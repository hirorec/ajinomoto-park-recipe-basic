import '@css/home.scss'
import 'swiper/css/bundle'
import Swiper from 'swiper'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import Inview from '@/modules/Inview'
import { isPC } from '@/utils'

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  new Inview().init()
  document.body.classList.add('disable-scroll')
  const base = document.querySelector('#js-jiyuka') as HTMLElement
  const inner = base.querySelector('.jiyuka-main__inner') as HTMLElement
  const cover = base.querySelector('.cover') as HTMLElement
  const chara = cover.querySelector('.cover__chara') as HTMLElement

  chara.classList.remove('is-inactive')
  chara.classList.add('is-active')

  cover.addEventListener('click', () => {
    document.body.classList.remove('disable-scroll')
    inner.classList.remove('is-inactive')
    inner.classList.add('is-active')
    cover.classList.add('is-hide')

    setTimeout(() => {
      onReady()
    }, 500)
  })
}

function onReady() {
  initSwiper()
  initFixedNavTrigger()

  const base = document.querySelector('#js-jiyuka') as HTMLElement
  const fv = base.querySelector('.fv') as HTMLElement
  const fixedNav = base.querySelector('.fixed-nav') as HTMLElement
  const elements = fv.querySelectorAll('.is-inactive')

  elements.forEach((el) => {
    el.classList.remove('is-inactive')
    el.classList.add('is-active')
  })

  fixedNav.classList.remove('is-inactive')
  fixedNav.classList.add('is-active')
}

function initSwiper() {
  if (isPC()) {
    return
  }

  const baseOptions = {
    slidesPerView: 'auto' as 'auto',
    speed: 500,
  }
  new Swiper('#js-intro-swiper', baseOptions)
  new Swiper('#js-pickup-swiper', baseOptions)
}

function initFixedNavTrigger() {
  const base = document.querySelector('#js-jiyuka') as HTMLElement
  const fixedNav = base.querySelector('.fixed-nav') as HTMLElement

  ScrollTrigger.create({
    trigger: '#js-fixed-nav-hide-trigger',
    start: 'bottom bottom',
    // markers: true,
    onEnter: () => {
      fixedNav.classList.remove('is-active')
      fixedNav.classList.add('is-inactive')
    },
    onLeaveBack: () => {
      fixedNav.classList.add('is-active')
      fixedNav.classList.remove('is-inactive')
    },
  })
}
