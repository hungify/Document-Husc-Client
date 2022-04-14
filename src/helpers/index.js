export function capitalizeFirstLetter(string) {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

export const detectURL = (message) => {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
};
