import React from 'react';

import CartGrid from './CartGrid';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {PriceCalculator} from "../../_helpersAndConstants/price.calculator";
import {cartActions} from "../../_actions/cart_actions";
import PayWithPayPal from "../../_components/PayWithPayPal";


class CartPage extends React.Component {

    state = {
        total: 0.00,
        checkoutList: [],
        isCheckout: false
    }



    handleCheckout = (checkoutItems) => {
        this.setState({isCheckout: true})
        const {userId} = this.props;
        this.props.dispatch(cartActions.checkout(checkoutItems));

    }
    clearCart = () => {
        this.props.dispatch(cartActions.clear());

    }

    render() {
        const {CartReducer} = this.props;
        const {products} = this.props;
        const {isCheckout} = this.state

        var total = PriceCalculator.calculateSumPrice(CartReducer.checkoutItems, products)
        if (isCheckout) {
            return (
                <PayWithPayPal
                    total={total}
                    cartItems={CartReducer.checkoutItems}
                    products={products}
                />
            )
        }

        return (
            <div className={"content"}>
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            CartReducer.checkoutItems.length > 0 ?
                                <CartGrid/> :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                                </div>
                        }

                        {CartReducer.checkoutItems &&
                        <div className="p-3 text-center text-success">
                            <p>Checkout successfull</p>
                            <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                        </div>
                        }

                    </div>
                    {
                        CartReducer.checkoutItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">

                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{total}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2"
                                            onClick={() => {this.handleCheckout(CartReducer.checkoutItems)}}>CHECKOUT
                                    </button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm"
                                            onClick={this.clearCart}>CLEAR
                                    </button>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {products, CartReducer, checkout} = state;
    return {
        CartReducer,
        products,
        checkout
    };
}

export default withRouter(connect(mapStateToProps)(CartPage));