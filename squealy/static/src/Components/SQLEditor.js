import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/sql'
import 'brace/theme/tomorrow'
import 'brace/ext/language_tools'


export class SQLEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: 'SELECT ...'
    }
  }

  textChangeHandler = (text) => {
    this.setState({editorContent: text})
  }

  componentWillMount() {
    //Set editor content on mount only if user has already wrriten a query
    if(this.props.sqlQuery && this.props.sqlQuery !== '') {
      this.setState({editorContent: this.props.sqlQuery})
    }
  }

  onBlur = () => {
    const {onChangeApiDefinition} = this.props
    let {editorContent} = this.state
    //Update sql query in selected api definition
    this.props.onChangeApiDefinition('sqlQuery', editorContent)
  }

  render () {
    const {
      onHandleTest,
      onChangeApiDefinition,
      sqlQuery,
      selectedApiIndex
    } = this.props
    return (
      <div className="sql-editor-wrapper">
        <div className="hidash-sql-editor-component">
          <h2>Query: </h2>
          <AceEditor
            mode="sql"
            theme="tomorrow"
            name={'sqlQuery' + selectedApiIndex}
            height="200px"
            width="100%"
            fontSize={15}
            maxLines={20}
            minLines={15}
            highlightActiveLine={true}
            ref="ace"
            value={this.state.editorContent}
            editorProps={{$blockScrolling: true}}
            onChange={this.textChangeHandler}
            onBlur={this.onBlur}
            onLoad={(editor => editor.focus())}
          />
        </div>
      </div>
    )
  }
}
