import React, { Component } from 'react';


export class Comments extends Component {
  state = {
    text: '',
    username: ''
  }

  onTextHandler = (e) => {
    const { target } = e;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { comments } = this.props;

    if (!comments) {
      return null;
    }

    return(
      <>
      <form>
        <input
          name="username"
          placeholder="Введите имя"
          value={this.state.username}
          onChange={this.onTextHandler}
        />
        <textarea
          name="text"
          placeholder="Напишите свой комментарий"
          value={this.state.text}
          onChange={this.onTextHandler}
        />
      </form>
  
      <ul>
        {comments.map(({ username, text }) => (
          <li>
            <p>{username}</p>
            <p>{text}</p>
          </li>
        ))}
      </ul>
      </>
    )
  }
} 