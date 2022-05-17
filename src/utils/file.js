export const getFileFromUrl = async (url, name, defaultType = "image/jpeg") => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
};
