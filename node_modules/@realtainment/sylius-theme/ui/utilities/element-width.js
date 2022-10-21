const elementwidth = (element, withMargins = true) => {

  const elementToMeasure = (typeof element === 'string') ? document.querySelector(element) : element;

  const styles = window.getComputedStyle(elementToMeasure);

  let margins = 0;

  if (withMargins) {
    margins = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  }

  return Math.ceil(elementToMeasure.offsetWidth + margins);
}

export default elementwidth;
