import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

import { Link } from "react-router-dom";

import styles from "./Post.scss";

const localUrl = 'http://localhost:4444/img/';
const defaultUrl = 'http://localhost:4444/img/fruir.jpg'

const Post = ({ imageUrl, title, category, date, id }) => (
  <Card className={styles.post}>
    <Link to={`/post/${id}`} className={styles.link}>
      <div>
        <img src={ imageUrl ? `${localUrl}${imageUrl}` : defaultUrl } alt={title} />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <div className={styles.footer}>
          <p className={styles.category}>{category}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </Link>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export { Post };
