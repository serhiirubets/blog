import React, { Component } from "react";
import { Query, compose, withApollo } from "react-apollo";
import { Redirect } from 'react-router-dom';
import { GET_POST } from "./PostPageQuery";
import { Link } from "react-router-dom";
import { withUser } from "../../helpers";
import { GET_POSTS } from '../BlogPage/BlogPageQuery';
import { MainLayout, Loader } from "../../Components/";
import Button from "@material-ui/core/Button";
import { DELETE_POST } from "./PostPageMutation";
import { toDateString } from "../../services";
import styles from "./PostPage.scss";
const defaultUrl = "http://localhost:4444/img/fruir.jpg";

@compose(
  withUser,
  withApollo
)
class PostPage extends Component {
  delete = () => {
    const confirm = window.confirm("Реально удалить?");

    if (confirm) {
      const { id } = this.props.match.params;
      this.props.client.mutate({
        mutation: DELETE_POST,
        variables: {
          id,
        },
        refetchQueries: [
          { query: GET_POSTS }
        ]
      }).then(() => {
        this.props.history.push('/blog');
      })
    }
  };

  render() {
    const {
      match: { params }
    } = this.props;

    return (
      <MainLayout>
        <div className={`${styles.container} container`}>
          <Query query={GET_POST} variables={{ id: params.id }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Loader />;
              }

              if (error) {
                return <p>Error Post page</p>;
              }

              if (!data.getPost) {
                return <Redirect to="/posts" />
              }

              const {
                id,
                imageUrl,
                text,
                title,
                category,
                createdAt
              } = data.getPost;
              const { currentUser } = this.props;

              const srcUrl = imageUrl
                ? `http://localhost:4444/img/${imageUrl}`
                : defaultUrl

              return (
                <article>
                  {currentUser && (
                    <div className={styles.buttons}>
                      <Button
                        component={Link}
                        to={`/post/edit/${id}`}
                        variant="contained"
                        color="primary"
                        className={styles.editButton}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.delete}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.date}>{toDateString(createdAt)}</p>
                  <div className={styles.content}>
                    <div className={styles.picture}>
                      <img src={srcUrl} alt={title} />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: text }}
                      className={styles.text}
                    />
                  </div>
                  <h2 className={styles.categoryTitle}>Category</h2>
                  <ul className={styles.tags}>
                    {category.split(",").map(tag => (
                      <li key={tag} className={styles.tag}>
                        <Link to={`/blog/${tag}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            }}
          </Query>
        </div>
      </MainLayout>
    );
  }
}

export { PostPage };
