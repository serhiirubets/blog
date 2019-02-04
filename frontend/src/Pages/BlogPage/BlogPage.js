import React, { Component } from "react";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import { GET_POSTS } from "./BlogPageQuery";

import { MainLayout, Post, Loader } from "../../Components";

import styles from "./BlogPage.scss";

class BlogPage extends Component {
  render() {
    return (
      <MainLayout>
        <section className={`container ${styles.blog}`}>
          <Typography component="h2" variant="h4" className={styles.title}>
            Последние новости:
          </Typography>

          <div className={styles.posts}>
            <Query query={GET_POSTS}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <Loader />;
                }

                if (error) {
                  return "Error BlogPage.js";
                }

                if (!data.getPosts) {
                  return null;
                }

                return data.getPosts.map(post => {
                  const {
                    id,
                    text,
                    title,
                    createdAt,
                    category,
                    imageUrl
                  } = post;

                  return (
                    <Post
                      key={id}
                      id={id}
                      text={text}
                      title={title}
                      createdAt={createdAt}
                      category={category}
                      imageUrl={imageUrl}
                    />
                  );
                });
              }}
            </Query>
          </div>
        </section>
      </MainLayout>
    );
  }
}

export { BlogPage };
