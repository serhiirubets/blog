import React, { Component } from "react";
import { Query } from "react-apollo";
import Button from '@material-ui/core/Button';
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

          
            <Query
              query={GET_POSTS}
              fetchPolicy="cache-and-network"
              variables={{
                category: this.props.match.params.category,
                offset: 0,
                limit: 2
              }}>
              {({ loading, error, data, fetchMore }) => {
                if (loading) {
                  return <Loader />;
                }

                if (error) {
                  return "Error BlogPage.js";
                }

                if (!data.getPosts) {
                  return null;
                }

                return (
                  <>
                    <div className={styles.posts}>
                      {
                        data.getPosts.map(post => {
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
                        })
                      }
                    </div>
                    <p className={styles.loadMoreButton}>
                      <Button
                        onClick={() => {
                          fetchMore({
                            variables: {
                              offset: data.getPosts.length
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (!fetchMoreResult) return prev;
                              return Object.assign({}, prev, {
                                getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
                              });
                            }
                          })
                        }}
                        variant="contained"
                        color="primary">
                        Load more
                      </Button>
                    </p>
                  </>
                )
              }}
            </Query>
        </section>
      </MainLayout>
    );
  }
}

export { BlogPage };
