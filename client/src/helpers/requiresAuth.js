import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types'
import {withRouter} from 'react-router-dom'
export default function(ComposedComponent) {

    class Authenticate extends Component {

        static contextTypes = {
            router: Proptypes.object
        };

        checkAndRedirect(props) {
            if (!this.props.UserReducer.isAuthenticated) {
                this.props.history.push('/login')
            }
        }
        componentWillMount() {
            this.checkAndRedirect(this.props);
        }

        componentWillUpdate(nextProps) {
            this.checkAndRedirect(nextProps);
        }

        render() {
            if (!this.props.UserReducer.isAuthenticated) {
                return null;
            } else {
                return (
                        <ComposedComponent {...this.props}/>
                );
            }

        }
    }

    return withRouter(
        connect( store => { return {
            UserReducer: store.UserReducer
    } })(Authenticate));
}
