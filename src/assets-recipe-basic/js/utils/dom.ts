export const attachAnimate = (): void => {
  document.querySelectorAll('.animate').forEach((el: any) => {
    el.dataset.animation = 'true'
  })
}
