import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CKEditor from "react-ckeditor-component";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUpload from '@material-ui/icons/CloudUpload';

import styles from "./AddPostPage.scss";

class AddPostPage extends Component {
  state = {
    title: "",
    text: "",
    imageUrl: "",
    category: "",
  };

  handleChange = event => {
    const name = event.editor ? 'text' : event.target.name;
    const value = event.editor ? event.editor.getData() : event.target.value
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form className={styles.form}>
        <TextField
          name="title"
          placeholder="Name"
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
          className={styles.input}
        />

        <div className={styles.editor}>
          <CKEditor
            name="text"
            content={this.state.text}
            events={{
              change: this.handleChange
            }}
          />
        </div>

        <TextField
          name="category"
          placeholder="Category"
          value={this.state.category}
          onChange={this.handleChange}
          margin="normal"
          className={styles.input}
        />

        <div>
          <label htmlFor="file">
            <input type="file" id="file" className={styles.inputFile} name="imageUrl" />
            <Button variant="contained" color="primary" component="span">
              <CloudUpload />
              <span className={styles.uploadButtonText}>Upload file</span>
            </Button>
          </label>
        </div>

        <div className={styles.buttons}>
        <Button variant="contained" color="secondary">
            Reset
        </Button>

        <Button variant="contained" color="primary">
            Reset
        </Button>

        </div>
      </form>
    );
  }
}

export { AddPostPage };
