// replace _id with id in mongo array
export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

// replace _id with id in mongo single data
export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

// check given date is between from & to date
export const isDateInBetween = (date, from, to) => {
  return (
    new Date(date).getTime() >= new Date(from).getTime() &&
    new Date(date).getTime() <= new Date(to).getTime()
  );
};

// get day difference
export const getDayDifference = (from, to) => {
  const diff = new Date(to).getTime() - new Date(from).getTime();
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / millisecondsInADay) + 1;
};