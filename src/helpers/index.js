export function capitalizeFirstLetter(string) {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

export const detectURL = (message) => {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
};

export const removeEmptyObjects = (obj) => {
  const finalObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const nestedObj = this.removeEmpty(obj[key]);
      if (Object.keys(nestedObj).length) {
        finalObj[key] = nestedObj;
      }
    } else if (Array.isArray(obj[key])) {
      if (obj[key].length) {
        obj[key].forEach((x) => {
          const nestedObj = this.removeEmpty(x);
          if (Object.keys(nestedObj).length) {
            finalObj[key] = finalObj[key] ? [...finalObj[key], nestedObj] : [nestedObj];
          }
        });
      }
    } else if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== null) {
      finalObj[key] = obj[key];
    }
  });
  return finalObj;
};
