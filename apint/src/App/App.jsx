import React from 'react';
import {Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpersAndConstants/history';
import {alertActions} from '../_actions/alerts_actions';
import MainPage from '../Pages/MainPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import {PrivateRoute} from "../_components/PrivateRoute";
import {Layout} from "../_components/Layout";
import {Redirect} from "react-router";
import PricesPage from "../Pages/PricesPage";
import AboutPage from "../Pages/AboutPage";
import StorePage from "../Pages/StorePage/StorePage";
import SingleProductPage from "../Pages/SingleProductPage";
import CartPage from "../Pages/CartPage/CartPage";
import StartPage from "../Pages/StartPage";


class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <Router history={history}>
                <Layout>
                    <div class="container">
                        <div class="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                                <div>
                                    <Redirect from='' to='/Home' exact />

                                    <PrivateRoute path="/Home" component={(MainPage)}/>
                                    <Route path="/login" component={(LoginPage)}/>
                                    <Route path="/register" component={(RegisterPage)}/>
                                    <Route path="/cennik" component={PricesPage}/>
                                    <Route path="/about" component={AboutPage}/>
                                    <Route exact  path="/products" component={StorePage}/>
                                    <Route exact  path="/cart" component={CartPage}/>
                                    <Route exact  path="/start" component={StartPage}/>
                                    <PrivateRoute path="/products/:id" component={() => <SingleProductPage />}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </Router>


        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
