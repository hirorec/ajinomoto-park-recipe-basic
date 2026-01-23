import '@css/voice.scss'
import Inview from '@/modules/Inview'

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  new Inview().init()
}
