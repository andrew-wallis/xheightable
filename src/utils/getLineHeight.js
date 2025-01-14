function getLineHeight(fontSize, lineHeight) {

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }

  function interpolateValue(parameter) {
    const x1 = 1; // Start parameter
    const x2 = 2; // End parameter
    const y1 = 1; // Value at parameter 1
    const y2 = 0.66; // Value at parameter 2

    if (parameter <= x1) {
        return y1; // Return 1 if parameter is less than or equal to 1
    } else if (parameter >= x2) {
        return y2; // Return 0.66 if parameter is greater than or equal to 2
    } else {
        // Linear interpolation for values between 1 and 2
        return y1 + ((y2 - y1) / (x2 - x1)) * (parameter - x1);
    }
  }

  return roundToTwoDecimals(lineHeight * interpolateValue(fontSize));

}

export default getLineHeight;