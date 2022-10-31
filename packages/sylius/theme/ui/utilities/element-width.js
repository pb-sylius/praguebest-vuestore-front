const elementwidth = (element, withMargins = true, withoutPadding = true) => {

  const elementToMeasure = (typeof element === 'string') ? document.querySelector(element) : element;

  if (elementToMeasure) {

    const styles = window.getComputedStyle(elementToMeasure);

    let margins = 0;
    let paddings = 0;

    if (withMargins) {
      margins = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    }

    if (withoutPadding) {
      paddings = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    }

    return Math.ceil(elementToMeasure.clientWidth + margins - paddings);
  }
}

export default elementwidth;
