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
       // this.props.dispatch(cartActions.checkout(checkoutItems));

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
                <header className="text-center mt-5">
                    <h1>Koszyk</h1>
                    
                </header>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            CartReducer.checkoutItems.length > 0 ?
                                <CartGrid/> :
                                <div className="p-3 text-center text-muted">
                                    Twój koszyk jest pusty
                                </div>
                        }

                        {CartReducer.checkoutItems &&
                        <div className="p-3 text-center text-success">
                            
                        <Link to="/" className="btn btn-outline-success btn-sm">Kontynuuj zakupy</Link>
                    </div>
                        }

                    </div>
                    {
                        CartReducer.checkoutItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">

                                <p className="mb-1">Całość</p>
                                <h3 className="m-0 txt-right">{total} ZŁ</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2"
                                            onClick={() => {this.handleCheckout(CartReducer.checkoutItems)}}>ZAPŁAĆ
                                    </button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm"
                                            onClick={this.clearCart}>WYCZYŚĆ
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