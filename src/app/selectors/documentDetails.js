import { createSelector } from "@reduxjs/toolkit";

export const getProperty = (state) => state.documentDetails?.property;
export const getFiles = (state) => state.documentDetails?.files;
export const relatedDocuments = (state) => state.documentDetails?.relatedDocuments;
export const getParticipants = (state) => state.documentDetails?.participants;
const getAnalytics = (state) => state.documentDetails?.analytics;
export const getDatasets = createSelector(getAnalytics, (a) => {
  return [a.read?.count, a.unread?.count];
});
const getReaders = createSelector(getAnalytics, (a) => {
  return a.read?.users;
});
const getUnreaders = createSelector(getAnalytics, (a) => {
  return a.unread?.users;
});
export const getReadAndUnread = createSelector(getReaders, getUnreaders, (readers, unreaders) => {
  if (readers && unreaders) {
    return [...readers, ...unreaders];
  }
});
