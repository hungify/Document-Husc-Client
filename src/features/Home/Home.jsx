import { isAuthenticated } from "app/selectors/authSelector";
import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import SearchGroup from "features/SearchGroup/SearchGroup";
import { mockDocumentListProtect, mockDocumentListPublic } from "mocks/documents";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector(isAuthenticated);

  return (
    <>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument dataRender={isAuth ? mockDocumentListProtect : mockDocumentListPublic} />
      </HeaderListDocument>
    </>
  );
}
