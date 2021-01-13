import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CartItem from "./CartItem";
import {PriceCalculator} from "../../_helpersAndConstants/price.calculator";

class CartGrid extends React.Component {






    render() {
        const {CartReducer, products} = this.props;
        return (
            <div>
                <div>

                    {
                        CartReducer.checkoutItems.map(product => <CartItem key={product.id} product={product}/>)

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

export default withRouter(connect(mapStateToProps)(CartGrid));