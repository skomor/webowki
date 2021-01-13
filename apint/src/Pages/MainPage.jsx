import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions/user_actions';
import {cartActions} from "../_actions/cart_actions";
import {productActions} from "../_actions/product_action";
import {PriceCalculator} from "../_helpersAndConstants/price.calculator";
import {ListGroup, ListGroupItem} from "react-bootstrap";


class MainPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(productActions.getAll());
        const {user} = this.props;
        this.props.dispatch(cartActions.getRentedByUserId(user.id));

    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }


    getProd = (rentedItem) => {
        const {products} = this.props;
        if (products.items)
            for (let i = 0; i < products.items.length; i++) {
                if (products.items[i].id == rentedItem.productId)
                    return products.items[i];
            }
    }

    render() {
        const {user, users, CartReducer, products} = this.props;
        console.log(CartReducer.rentedItems);
        return (
            <div className="col-sm-12 content">

                <ListGroup>
                    { products.items && CartReducer.rentedItems && CartReducer.rentedItems.map((item, index) =>

                        new Date(item.startTime) > new Date() &&
                        <ListGroupItem key={item.productId}>
                            {this.getProd(item).name} - PLN.
                            {PriceCalculator.calculatePrice1(this.getProd(item).price,  item.startTime, item.endTime)}
                        </ListGroupItem>)
                    }
                </ListGroup>
                {user ? <div>
                        <h1>Hi {user.firstName}!</h1>
                        <p>Jesteś adminem</p>
                        <h3>Zarejestrowani ludzie:</h3>
                        {users.loading && <em>Loading users...</em>}
                        {CartReducer.rentedItems && <em>CartReducer.rentedItems</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&
                        <ul>
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ?
                                            <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}
                        </ul>
                        }
                        <p>
                            <Link to="/login">
                                <div id="logOutBtn">Wyloguj</div>
                            </Link>
                        </p>
                    </div>
                    :
                    <div>OK</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication, CartReducer, products} = state;
    const {user} = authentication;
    return {
        CartReducer,
        user,
        users,
        products
    };
}

export default connect(mapStateToProps)(MainPage);