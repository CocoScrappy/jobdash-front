import { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";

function MyEditor(props) {
  const content = props.content;
  const setConvertedContent = props.setConvertedContent;

  const initialContent = content == "" ? "<p></p>" : content;
  const blocksFromHTML = convertFromHTML(initialContent);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state)
  );

  useEffect(() => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setConvertedContent(currentContentAsHTML);
    // console.log(convertedContent);
  }, [editorState]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    // convertContentToHTML();
  };

  return (
    <div className="mb-3">
      <Editor
        placeholder="Content"
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbar-class"
        editorStyle={{
          border: "1px solid",
          borderStyle: "groove",
          color: "black",
          height: "200px",
        }}
      />
    </div>
  );
}

export default MyEditor;
