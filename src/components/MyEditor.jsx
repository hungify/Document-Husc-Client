import React from "react";

const { EditorState } = require("draft-js");
const { Editor } = require("draft-js");

export default function MyEditor() {
  const editorRef = React.useRef();
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
  const focus = () => {
    editorRef.current.focus();
  };

  return (
    <div className="custom-editor" onClick={focus}>
      <Editor ref={editorRef} editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
