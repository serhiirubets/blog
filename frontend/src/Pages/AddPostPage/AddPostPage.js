import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CKEditor from "react-ckeditor-component";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import { withApollo, compose } from "react-apollo";
import { ADD_POST } from "./addPostMutation";
import { fileUpload } from "../../services";
import styles from "./AddPostPage.scss";

const initState = {
  title: "",
  text: "",
  imageUrl: "",
  category: "",
  src: "",
  fileUploadError: ""
};

@compose(
  withApollo
)
class AddPostPage extends Component {
  state = {
    ...initState
  };

  handleChange = event => {
    const name = event.editor ? "text" : event.target.name;
    const value = event.editor ? event.editor.getData() : event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFileChange = ({ target }) => {
    fileUpload(target)
      .then(src => {
        this.setState({
          [target.name]: target.value,
          src,
          fileUploadError: ""
        });
      })
      .catch(error => {
        this.setState({
          fileUploadError: error,
          src: ""
        });
      });
  };

  handleReset = () => {
    this.setState({ ...initState });
  };

  handleSave = (e) => {
    e.preventDefault();

    const {
      title,
      text,
      category,
      imageUrl,
    } = this.state;
    const { client } = this.props;

    client.mutate({
      mutation: ADD_POST,
      variables: {
        title,
        text,
        category,
        imageUrl
      }
    });
  }

  render() {
    const {
      title,
      text,
      category,
      src,
      fileUploadError
    } = this.state;
    const { handleChange, handleFileChange, handleReset } = this;
      return (
        <form className={styles.form} onSubmit={this.handleSave}>
          <Typography component="h2" variant="h4">
            Please add new post
          </Typography>
          <TextField
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
            margin="normal"
            className={styles.input}
          />

          <div className={styles.editor}>
            <CKEditor
              name="text"
              content={text}
              events={{
                change: handleChange
              }}
            />
          </div>

          <TextField
            name="category"
            placeholder="Category"
            value={category}
            onChange={handleChange}
            margin="normal"
            className={styles.input}
          />

          <div className={styles.file}>
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                className={styles.inputFile}
                name="imageUrl"
                onChange={handleFileChange}
              />
              <Button variant="contained" color="primary" component="span">
                <CloudUpload />
                <span className={styles.uploadButtonText}>Upload file</span>
              </Button>
            </label>
            {src && (
              <p className={styles.uploadedPicture}>
                <img src={src} alt="uploaded" />
              </p>
            )}
            {fileUploadError && (
              <p className={styles.error}>{fileUploadError}</p>
            )}
          </div>

          <div className={styles.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>

            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      );
  }
}

export { AddPostPage };
