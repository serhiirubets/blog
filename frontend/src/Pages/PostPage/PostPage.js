import React, { Component } from "react";
import { Query, compose, withApollo } from "react-apollo";
import { GET_POST } from "./PostPageQuery";
import { Link } from "react-router-dom";
import { withUser } from "../../helpers";
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
      this.props.client.mutate({
        mutation: DELETE_POST,
        variables: {
          id: this.props.match.params.id
        }
      });
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

              const {
                id,
                imageUrl,
                text,
                title,
                category,
                createdAt
              } = data.getPost;
              const { currentUser } = this.props;

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
                      <img src={defaultUrl} alt={title} />
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
