import '@css/index.scss'
import 'swiper/css/bundle'
import Swiper from 'swiper'
import { isPC } from '@/utils'

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  initSwiper()
}

function initSwiper() {
  if (isPC()) {
    return
  }

  new Swiper('#js-related-articles-swiper', {
    slidesPerView: 'auto' as 'auto',
    speed: 500,
  })
}
