import React from 'react';
import './App.css';
var marked = require('marked');

//Set's the marked.js option to allow carriage returns
marked.setOptions({
  breaks: true
});

//Initializes the marked renderer
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

//React parent app component
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: sample
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }
  render() {
    return (
      <div>
        <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        <Preview markdown={this.state.markdown} />
      </div>
    )
  }
};

//Editor child component
const Editor = (props) => {
  return (
    <div className="pepper">
      <h1 className="title">salt&peppa markdowner</h1>
      <div className="editor-header"><p>Editor</p></div>
      <textarea type="text" className="editor" id="editor" value={props.markdown} onChange={props.onChange} />
    </div>
  )
}
//Previewer child component
const Preview = (props) => {
  return (
    <div className="salt">
      <div className="preview-header"><p>Previewer</p></div>
      <div className="previewer" id="preview" dangerouslySetInnerHTML={{__html: marked(props.markdown, {renderer: renderer})}} />
    </div>
  )
}

//Sample text for editor
const sample =
`# Use one hash for an H1 heading...

## or two for and H2 and so on...

Links can be made using this syntax:
Created by: [Jason Rigdon](https://github.com/jpriggs)

Inline text is easy with a pair of tick marks like so \`<p></p>\`

//Code Block like the function below are fun to see
function foo(val) {
  return bar;
}

Or an unordered list using bullet points:
* First Item
* Second Item
  * Sub Item
  * Sub Item

Blockquotes:
> Interesting point 1
> Interesting point 2

Or even images:
![Git Hub Logo](http://i64.tinypic.com/5wbl9j.jpg)

You can stylize your text like so...

**Bold Text**
*Italic Text*
_**Even Both!**_
`
export default MarkdownPreviewer;
