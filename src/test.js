
import React from 'react';
import ReactDOM from 'react-dom';


class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);

    }

    edit () {
        this.setState({editing: true});
    }

    remove () {
        console.log('Removing comment');
        this.props.deleteFromBoard(this.props.index);
    }

    save () {
        this.props.updateCommentText(this.refs.newText.value, this.props.index);
        this.setState({editing: false});
    }

    renderNormal () {
        return (
            <div>
                <div>{this.props.children}</div>
                <button onClick={this.edit}>Edit</button>
                <button onClick={this.remove}>Remove</button>
            </div>
        )
    }

    renderForm () {
        return (
            <div> 
                <textarea ref="newText" defaultValue = {this.props.children}></textarea>
                <button onClick={this.save}>Save</button>
            </div>
        )
    }

    render () {
        if(this.state.editing) {
            return this.renderForm ();
        } else {
            return this.renderNormal ()
        }
    }
    
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                comments: [

                ]
        }
        this.removeComment = this.removeComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.eachComment = this.eachComment.bind(this);
        this.add = this.add.bind(this);


    }

    add (text) {
        var arr = this.state.comments;
        arr.push(text);
        this.setState({comments: arr})
    }

    removeComment (i) {
        console.log('Removing Comment: ' + i)
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({comments: arr})
    }

    updateComment (newText, i) {
        console.log('Updating Comment')
        var arr = this.state.comments;
        arr[i] = newText;
        this.setState({comments: arr})
    }

    eachComment (text, i) {
        return (
            <Comment key={i} index={i} updateCommentText = {this.updateComment} deleteFromBoard={this.removeComment}>
                {text}
            </Comment>
        );
    }

    render () {
        return (
            <div>
                <button onClick={this.add.bind(null, 'Default Text')}>Add New</button>
                <div>
                    {
                    this.state.comments.map(this.eachComment)
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));


