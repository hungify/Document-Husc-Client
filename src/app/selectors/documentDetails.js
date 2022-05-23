import { createSelector } from "@reduxjs/toolkit";
export const isPublicDocument = (state) => state.documentDetails?.isPublic;
export const getPublisherId = (state) => state.documentDetails?.publisherId;
export const getMyReadDate = (state) => state.documentDetails?.myReadDate;
export const getProperty = (state) => state.documentDetails?.property;
export const getFiles = (state) => state.documentDetails?.fileList;
export const getRelatedDocuments = (state) => state.documentDetails?.relatedDocuments;
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
    const newReaders = readers.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });

    const newUnreaders = unreaders.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
    return [...newReaders, ...newUnreaders];
  }
});

export const getConversationId = (state) => state.documentDetails?.conversationId;
export const getMessages = (state) => state.documentDetails?.messages;
