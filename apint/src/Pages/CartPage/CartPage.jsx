import React from 'react';

import CartGrid from './CartGrid';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import {connect} from "react-redux";

class CartPage extends React.Component {

render() {
    const Sum = (cartItems, products) => {
        let sum = 0;
        for(let i = 0; i < products.length; i++){
            for (let j = 0; j < cartItems.length; j++) {
                if(products[i].id==cartItems[j].productId){
                    sum += products[i].price;

                }

            }

        };
        return sum;
    };
    const {CartReducer, checkout} = this.props;

    const {products} = this.props;
    return (
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            CartReducer.checkoutItems &&
                                <CartGrid/> /*:
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                                </div>*/
                        }

                       { CartReducer.checkoutItems &&
                        <div className="p-3 text-center text-success">
                            <p>Checkout successfull</p>
                            <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                        </div>
                        }
                    </div>
                  {/*{
                      checkoutItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">

                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{Sum(checkoutItems,products)}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }*/}

                </div>
            </div>
    );
}
}
function mapStateToProps(state) {
    const {products,CartReducer, checkout} = state;
    return {
        CartReducer,
        products,
        checkout
    };
}
export default withRouter(connect(mapStateToProps)(CartPage));