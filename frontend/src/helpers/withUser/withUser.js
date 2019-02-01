import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Loader } from '../../Components';
import { GET_CURRENT_USER} from './getCurrentUserQuery';

export const withUser = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Query query={GET_CURRENT_USER}>
          {({loading, error, data}) => {
            if (loading) {
              return <Loader />
            }

            if (error) {
              return <p>error: withUser error</p>
            }
            return (
              <WrappedComponent {...this.props} currentUser={data.getCurrentUser} />
            )
          }}
        </Query>
      )
    }
  }
}