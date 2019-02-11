import React, { Component } from 'react';
import { withApollo, compose } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ADD_POST_COMMENT } from './PostPageMutation';
import styles from './Comments.scss'

@compose(
  withApollo
)
class Comments extends Component {
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

  saveComment = (e) => {
    e.preventDefault();
    this.props.client.mutate({
      mutation: ADD_POST_COMMENT,
      variables: {
        postId: this.props.commentId,
        text: this.state.text,
        username: this.state.username
      }
    })
  }

  render() {
    const { comments } = this.props;

    if (!comments) {
      return null;
    }

    return(
      <>
      <form className={styles.comments} onSubmit={this.saveComment}>
        <TextField
          name="username"
          className={styles.field}
          placeholder="Введите имя"
          value={this.state.username}
          onChange={this.onTextHandler}
        />
        <textarea
          className={styles.textarea}
          name="text"
          placeholder="Напишите свой комментарий"
          value={this.state.text}
          onChange={this.onTextHandler}
        />

        <div className={styles.buttons}>
          <Button variant="contained" color="primary" type="submit">
            Сохранить
          </Button>
          <Button variant="contained" color="secondary" >
            Очистить
          </Button>
        </div>

      </form>
  
      <ul>
        {comments.map(({ username, text, id }) => (
          <li key={id}>
            <p>{username}</p>
            <p>{text}</p>
          </li>
        ))}
      </ul>
      </>
    )
  }
}

export { Comments }
