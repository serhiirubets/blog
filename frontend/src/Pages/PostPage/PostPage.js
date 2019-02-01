import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_POST } from "./PostPageQuery";
import { Link } from "react-router-dom";
import { withUser } from "../../helpers";
import { MainLayout, Loader } from "../../Components/";
import Button from "@material-ui/core/Button";
import { toDateString } from "../../services";
import styles from "./PostPage.scss";

@withUser
class PostPage extends Component {
  render() {
    const {
      match: { params }
    } = this.props;
    return (
      <div>
        <MainLayout />
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
                    <Button
                      component={Link}
                      to={`/post/edit/${id}`}
                      variant="contained"
                      color="primary"
                      className={styles.editButton}
                    >
                      Edit
                    </Button>
                  )}
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.date}>{toDateString(createdAt)}</p>
                  <div className={styles.content}>
                    <div className={styles.picture}>
                      <img
                        src={`http://localhost:4444/img/${imageUrl}`}
                        alt={title}
                      />
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
      </div>
    );
  }
}

export { PostPage };
