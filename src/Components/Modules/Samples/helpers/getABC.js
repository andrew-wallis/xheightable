function getABC(viewport) {
  if (viewport >= 0 && viewport < 512) {
    return "ABC abc"
  } else if (viewport >= 512 && viewport < 840) {
    return "ABCDE abcde";
  } else if (viewport >= 840 && viewport <= 1024) {
    return "ABCDEFG abcdefg";
  } else {
    return "ABCDE abcde";
  }
}

export default getABC;