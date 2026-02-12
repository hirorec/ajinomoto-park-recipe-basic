import '@css/index.scss'
import 'swiper/css/bundle'
import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  initSwiper()
}

function initSwiper() {
  new Swiper('#js-related-articles-swiper', {
    slidesPerView: 'auto' as 'auto',
    speed: 500,
  })
}
