import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import { SIGNIN_USER } from "./LoginPageMutation";
import Button from "@material-ui/core/Button";
import styles from "./LoginPage.scss";

const initState = {
  email: "",
  password: ""
};

export class LoginPage extends Component {
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

  handleReset = () => {
    this.setState({ ...initState });
  };

  handleSave = async (signInUser) => {
    const { data: { signinUser: { token } } } = await signInUser();

    if (token) {
      localStorage.setItem('token', token);
      // this.props.history.push('/');
    }

  }

  render() {
    const { handleChange, handleReset } = this;
    const { email, password } = this.state;

    return (
      <Mutation mutation={SIGNIN_USER} variables={{
        email,
        password
      }}>
        {(signInUser) => {
          return (
            <form className={styles.form} onSubmit={(e) => {
              e.preventDefault()
              this.handleSave(signInUser)}
            }>
              <Typography component="h2" variant="h4">
                Email
              </Typography>
              <TextField
                name="email"
                value={email}
                onChange={handleChange}
                margin="normal"
                className={styles.input}
              />

              <Typography component="h2" variant="h4">
                Password
              </Typography>
              <TextField
                name="password"
                value={password}
                onChange={handleChange}
                margin="normal"
                className={styles.input}
                type="password"
              />

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
        }}
      </Mutation>
    );
  }
}
