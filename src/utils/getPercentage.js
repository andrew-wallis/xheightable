function getPercentage(decimal, showPrefix) {

  const percentage = Math.round(decimal * 100);
  const prefix = percentage > 0 ? "+" : "";

  return `${showPrefix ? prefix : ""}${percentage}`
}

export default getPercentage;