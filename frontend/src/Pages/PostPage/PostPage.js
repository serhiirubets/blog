import React, { Component } from 'react';

class PostPage extends Component {
  render() {
    return (
      <div>Post id: {this.props.match.params.id}</div>
    )
  }
}

export { PostPage };
