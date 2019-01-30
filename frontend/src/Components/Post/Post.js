import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

import { Link } from "react-router-dom";

import styles from "./Post.scss";

const Post = ({ imageUrl, name, category, date, id }) => (
  <Card className={styles.post}>
    <Link to={`/post/${id}`} className={styles.link}>
      <div>
        <img src="https://picsum.photos/400/200?image=0" alt={name} />
      </div>
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <div className={styles.footer}>
          <p className={styles.category}>{category.join(", ")}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </Link>
  </Card>
);

Post.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export { Post };
