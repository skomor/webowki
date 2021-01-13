import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions/user_actions';
import {cartActions} from "../_actions/cart_actions";
import {productActions} from "../_actions/product_action";
import {PriceCalculator} from "../_helpersAndConstants/price.calculator";
import '../Pages/SingleProductPage.css';


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


                {user ? <div>
                        <h1>Witaj {user.firstName}!</h1>
                        <hr/>

                        {/* <p>Zapraszamy do skorzystania z naszych usług.</p> */}
                        <Link to="/login">
                            <div id="logOutBtn">Wyloguj</div>
                        </Link>

                        <h3>Wynajęte produkty:</h3>
                        {users.loading && <em>Loading users...</em>}
                        {/* {CartReducer.rentedItems && <em>CartReducer.rentedItems</em>} */}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {/* {users.items &&
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
                        } */}


                        {products.items && CartReducer.rentedItems && CartReducer.rentedItems.map((item, index) =>

                            new Date(item.startTime) > new Date() &&
                            <div key={item.productId}>
                                <div className="col-sm-12 p-2 cartObject2">
                                    <div className="col-sm-2 p-2">

                                        <img

                                            style={{margin: "0 auto", maxHeight: "50px"}}
                                            src={`data:image/png;base64,${this.getProd(item).photo}`} alt="zjecie"
                                            className="img-fluid d-block"/>
                                    </div>
                                    <div className="col-sm-10 p-2">
                                        <h5 className="mb-1">{this.getProd(item).name}</h5>
                                        <p className="mb-1">Zapłacono: {PriceCalculator.calculatePrice1(this.getProd(item).price, item.startTime, item.endTime)} </p>
                                        <p className="mb-1">Rozpoczęcie
                                            wynajmu: {new Date(item.startTime).toLocaleString()} </p>
                                        <p className="mb-1">Zakończenie
                                            wynajmu: {new Date(item.endTime).toLocaleString()} </p>

                                    </div>
                                </div>
                                {/* {this.getProd(item).name} - Zapłacono:
                             {PriceCalculator.calculatePrice1(this.getProd(item).price,  item.startTime, item.endTime)} ZŁ */}
                            </div>)
                        }


                        <br/>

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