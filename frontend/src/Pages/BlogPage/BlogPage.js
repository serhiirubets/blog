import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import { MainLayout, Post } from "../../Components";

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
            <Post name="Первая статья" category={['спорт', 'здоровье']} date="24.12.2017" id="dsaf" />
          </div>
        </section>
      </MainLayout>
    );
  }
}

export { BlogPage };
