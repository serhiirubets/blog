import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_POST } from "./PostPageQuery";
import { MainLayout, Loader } from "../../Components/";

class PostPage extends Component {
  render() {
    const {
      match: { params }
    } = this.props;
    return (
      <div>
        <MainLayout />
        <div className="container">
          <Query query={GET_POST} variables={{ id: params.id }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Loader />
              }

              if (error) {
                return <p>Error Post page</p>;
              }
              
              const { id, imageUrl, text, title } = data.getPost;
              return (
                <article>
                  <h2>{title}</h2>
                  <img src={`http://localhost:4444/img/${imageUrl}`} alt={title} />
                  <p dangerouslySetInnerHTML={{__html: text}} />
                </article>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export { PostPage };
