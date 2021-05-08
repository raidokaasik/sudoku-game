const deepCopy = (array) => {
  let copy = [];
  for (let i = 0; i < array.length; i++) {
    copy[i] = array[i].slice();
  }
  return copy;
};
export { deepCopy };
