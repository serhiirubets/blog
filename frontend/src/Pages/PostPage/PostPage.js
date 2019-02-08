import React, { Component } from "react";
import { Query, compose, withApollo } from "react-apollo";
import { Redirect } from 'react-router-dom';
import { GET_POST } from "./PostPageQuery";
import { Link } from "react-router-dom";
import { withUser } from "../../helpers";
import { GET_POSTS } from '../BlogPage/BlogPageQuery';
import { MainLayout, Loader } from "../../Components/";
import { Comments } from './Comments';
import Button from "@material-ui/core/Button";
import { DELETE_POST, LIKE_POST, UNLIKE_POST } from "./PostPageMutation";
import { toDateString, checkForLike, checkForDislike, setLike, setDislike } from "../../services";
import styles from "./PostPage.scss";
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt'

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

  handleLike = () => {
  
    const { id } = this.props.match.params;
    if (checkForLike(id)) {
      return;
    }
    setLike(id);
    this.props.client.mutate({
      mutation: LIKE_POST,
      variables: {
        id,
      },
      update: (cache, { data: { addTodo } }) => {
        const { getPost } = cache.readQuery({
          query: GET_POST,
          variables: {
            id
          }
        });

        cache.writeQuery({
          query: GET_POST,
          data: {
            getPost: {
              ...getPost,
              likes: getPost.likes + 1
            }
          }
        })
      }
    });
  }

  handleUnlike = () => {
    const { id } = this.props.match.params;
    if (checkForDislike(id)) {
      return;
    }
    setDislike(id)
    this.props.client.mutate({
      mutation: UNLIKE_POST,
      variables: { id },
      update: (cache, { data: { addTodo } }) => {
        const { getPost } = cache.readQuery({
          query: GET_POST,
          variables: { id }
        });

        cache.writeQuery({
          query: GET_POST,
          data: {
            getPost: {
              ...getPost,
              likes: getPost.likes - 1
            }
          }
        })
      }
    });
  }

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
                createdAt,
                likes,
                comments
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

                  <p className={styles.likeButtons}>
                      <Button onClick={this.handleUnlike}>
                        <ThumbDownAlt />
                      </Button>
                      {likes}
                      <Button onClick={this.handleLike}>
                        <ThumbUpAlt />
                      </Button>
                  </p>

                  <Comments comments={comments} />
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
