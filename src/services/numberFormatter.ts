const thousand = 1000;
const million = 1000000;
const billion = 1000000000;

const numberFormatter = (num: number) => {
  console.log(num);
  if (num < thousand) {
    return `${num.toFixed(1)}`;
  } else if (num / thousand > 0 && num / thousand <= 999) {
    return `${(num / thousand).toFixed(1)} K`;
  } else if (num / million > 0 && num / million <= 999) {
    return `${(num / million).toFixed(1)} M`;
  } else {
    return `${(num / billion).toFixed(1)} B`;
  }
};

export default numberFormatter;
