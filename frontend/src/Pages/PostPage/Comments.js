import React, { Component } from "react";
import { withApollo, compose } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { ADD_POST_COMMENT } from "./PostPageMutation";
import { GET_POST } from './PostPageQuery';
import styles from "./Comments.scss";

const initState = {
  text: "",
  username: "",
  addCommentMode: false
}

@compose(withApollo)
class Comments extends Component {
  state = {
    ...initState
  };

  onTextHandler = e => {
    const { target } = e;
    this.setState({
      [target.name]: target.value
    });
  };

  saveComment = e => {
    e.preventDefault();
    this.props.client.mutate({
      mutation: ADD_POST_COMMENT,
      variables: {
        postId: this.props.commentId,
        text: this.state.text,
        username: this.state.username
      },
      update: (cache, { data: { addPostComment } } ) => {
        const { getPost } = cache.readQuery({
          query: GET_POST,
          variables: {
            id: this.props.commentId
          }
        });
    
        cache.writeQuery({
          query: GET_POST,
          data: {
            getPost: {
              ...getPost,
              comments: [
                ...getPost.comments,
                addPostComment,
              ]
            }
          }
        });

        this.setState({
          ...initState
        })
      }
    });
  };

  handleCommentMode = () => {
    this.setState(prev => ({
      addCommentMode: !prev.addCommentMode
    }));
  };

  render() {
    const { comments } = this.props;
    const { addCommentMode } = this.state;

    if (!comments) {
      return null;
    }

    return (
      <>
        <div onClick={this.handleCommentMode} className={styles.checkboxInner}>
          <p>Хотите добавить ваш комментарий? Клацайте сюда:</p>
          <p className={styles.checkbox} htmlFor="check">
            {addCommentMode && <i className="material-icons">check</i>}
          </p>
        </div>

        {addCommentMode && (
          <form className={styles.commentForm} onSubmit={this.saveComment}>
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
              <Button variant="contained" color="secondary">
                Очистить
              </Button>
            </div>
          </form>
        )}

        {comments && (
          <>
            <h2 className={styles.commentsTitle}>Комментарии пользователей:</h2>
            <ul className={styles.comments}>
              {comments.map(({ username, text, id }) => (
                <li key={id}>
                  <Paper>
                    <p>Name: {username}</p>
                    <p>Comment: {text}</p>
                  </Paper>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export { Comments };
