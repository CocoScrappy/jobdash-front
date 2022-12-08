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
import { BsEmojiSmile } from "react-icons/bs";
// css
import "../css/components/Editor.css";

function MyEditor(props) {
  const content = props.content;
  const setConvertedContent = props.setConvertedContent;

  const initialContent = content === "" ? "<p></p>" : content;
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

  const toolbarOptions = {
    options: [
      "inline",
      "fontSize",
      "blockType",
      "list",
      "textAlign",
      "link",
      "emoji",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
  };

  return (
    <div className="mb-3">
      <Editor
        // placeholder="Content"
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="editor-wrapper"
        editorClassName="message-editor"
        toolbarClassName="message-toolbar"
        editorStyle={{
          height: "40vh",
          border: "1px solid #e5e7e8",
        }}
        toolbar={toolbarOptions}
      />
    </div>
  );
}

export default MyEditor;
