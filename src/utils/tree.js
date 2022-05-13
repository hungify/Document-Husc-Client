import _ from "lodash";

export const listToTree = (items, id = null, parentKey = "parentId") =>
  items
    .filter((item) => item[parentKey] === id)
    .map((item) => ({ ...item, children: listToTree(items, item._id) }));

export function flattenArrayTree(trees, wrapKey = "children") {
  return trees.reduce((flattenedItems, node) => {
    flattenedItems.push(node);
    if (Array.isArray(node[wrapKey])) {
      flattenedItems = flattenedItems.concat(flattenArrayTree(node[wrapKey], wrapKey));
    }
    return flattenedItems;
  }, []);
}

export function findNodeByKey(trees, predicate, wrapKey = "children") {
  return _.find(flattenArrayTree(trees, wrapKey), { ...predicate });
}

export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
