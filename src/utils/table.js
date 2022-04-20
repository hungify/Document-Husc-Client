import _ from "lodash";
export function findElementInTwoArray(data, keys) {
  return keys.map((key) => {
    return _.find(data, { key: key });
  });
}
