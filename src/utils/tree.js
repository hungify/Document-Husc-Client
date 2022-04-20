import _ from "lodash";

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
