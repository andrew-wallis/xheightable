function areNotEqual(array, string) {
  let stringArray = [];
  if(string) {
    stringArray = string.split('|').sort();
  }
  const sortedArray = array.slice().sort();
  return JSON.stringify(sortedArray) !== JSON.stringify(stringArray);
}

export default areNotEqual;