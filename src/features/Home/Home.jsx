import { getDocuments } from "app/selectors/documents";
import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import { fetchDocuments } from "features/Home/homeSlice";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument />
      </HeaderListDocument>
    </>
  );
}
