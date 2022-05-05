import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

const getRecipients = (state) => state?.recipients?.users;
const getExcludedRecipients = (state) => state?.recipients?.excludedUsers;
export const getTotalRecipients = (state) => state?.recipients?.total;

export const getFilterRecipients = createSelector(
  getRecipients,
  getExcludedRecipients,
  (users, excludedUserIds) => {
    return _.isEmpty(excludedUserIds)
      ? users
      : _.map(users, (user) => {
          return {
            ...user,
            disabled: excludedUserIds.includes(user._id),
          };
        });
  }
);
