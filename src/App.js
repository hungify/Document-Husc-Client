import "antd/dist/antd.css";
import MainLayout from "layout/MainLayout";
import DocumentDetail from "pages/DocumentDetail/DocumentDetail";
import DocumentList from "pages/DocumentList/DocumentList";
import Home from "pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="d/:documentId" element={<DocumentDetail />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
