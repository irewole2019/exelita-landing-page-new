export const scrollToElement = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId.replace("#", ""))
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}
