import React from "react";
import {Editor, EditorState, ContentState, convertFromHTML} from "draft-js";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    
    // const sampleMarkup = `
    // 	<div>
    //   	<h2>Title</h2>
    //     <i>some text</i>
    //   </div>
    // `;
    const sampleMarkup = props.content;

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(state),
    };
  }

  _handleChange = (editorState) => {
    this.setState({ editorState });
    this.props.editorState = this.state.editorState;
  }

  render() {
    return (
        <Editor 
          placeholder="Type"
          editorState={this.state.editorState}
          onChange={this._handleChange}
        />
    );
  }
}

export default MyEditor;

