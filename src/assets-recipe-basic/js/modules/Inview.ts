import { EventEmitter } from 'events'

export default class Inview extends EventEmitter {
  private intersectionObserver?: IntersectionObserver

  constructor() {
    super()
  }

  public init(rootMargin: string = '0px 0px -20% 0px'): Inview {
    const options = {
      root: null,
      rootMargin,
      threshold: [0],
    }
    this.intersectionObserver = new IntersectionObserver(this.intersectionObserverCallback.bind(this), options)

    const elements = document.querySelectorAll('.js-inview')

    elements.forEach((element) => {
      element.classList.add('is-inactive')
      this.intersectionObserver?.observe(element)
    })

    return this
  }

  private intersectionObserverCallback(entries: IntersectionObserverEntry[], _observer: IntersectionObserver) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-inactive')
        entry.target.classList.add('is-active')
        this.emit('onActive', entry.target)
      }
    })
  }
}
