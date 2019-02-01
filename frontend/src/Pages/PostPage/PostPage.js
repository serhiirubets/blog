import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_POST } from "./PostPageQuery";
import { Link } from 'react-router-dom';
import { MainLayout, Loader } from "../../Components/";
import { toDateString } from '../../services'
import styles from './PostPage.scss';

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
                return <Loader />
              }

              if (error) {
                return <p>Error Post page</p>;
              }
              
              const { imageUrl, text, title, category, createdAt } = data.getPost;
  
              return (
                <article>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.date}>{toDateString(createdAt)}</p>
                  <div className={styles.content}>
                    <div className={styles.picture}><img src={`http://localhost:4444/img/${imageUrl}`} alt={title} /></div>
                    <div dangerouslySetInnerHTML={{__html: text}} className={styles.text} /> 
                  </div>
                  <h2 className={styles.categoryTitle}>Category</h2>
                  <ul className={styles.tags}>
                    {
                      category.split(',').map(tag => (
                        <li key={tag} className={styles.tag}>
                          <Link to={`/blog/${tag}`}>{tag}</Link>
                        </li>
                      ))
                    }
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
