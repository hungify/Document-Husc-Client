import { isAuthenticated } from "app/selectors/auth";
import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import { fetchDocuments } from "features/ManageDocuments/documentsSlice";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);

  React.useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch, authenticated]);

  return (
    <>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument />
      </HeaderListDocument>
    </>
  );
}
