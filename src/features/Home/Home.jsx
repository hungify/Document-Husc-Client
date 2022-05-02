import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocuments } from "app/selectors/documents";
import { fetchDocuments } from "features/Home/homeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const documents = useSelector(getDocuments);

  React.useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument dataRender={documents} />
      </HeaderListDocument>
    </>
  );
}
