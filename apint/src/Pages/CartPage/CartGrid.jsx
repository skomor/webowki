import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CartItem from "./CartItem";

class CartGrid extends React.Component {

render() {

    const {CartReducer, checkout} = this.props;

    return (
        <div >
            <div className="card card-body border-0">

                {
                    CartReducer.checkoutItems.map(product =>  <CartItem key={product.checkoutItem.id} product={product.checkoutItem}/>)
                }

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
export default withRouter(connect(mapStateToProps)(CartGrid));