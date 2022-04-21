import _ from "lodash";
export function findElementInTwoArray(data, keys) {
  if (!_.isArray(keys)) return [];
  return _.map(keys, (key) => {
    return _.find(data, { key: key });
  });
}
