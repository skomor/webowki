import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {productActions} from "../../_actions/product_action";


class CartItem extends React.Component {
    componentDidMount() {
        if (!this.props.products.items)
            this.props.dispatch(productActions.getAll());
    }

    render() {

        const product = this.props.product;
        const {products} = this.props
        var currProduct = null
        if (products.items !== undefined)
            for (let i = 0; i < products.items.length; i++) {
                if (products.items[i].id == product.productId)
                    currProduct = products.items[i];
            }
        return (
            <div className="row no-gutters py-2">
                <div className="col-sm-2 p-2">
                    {currProduct &&
                    <img
                        alt={currProduct.name}
                        style={{margin: "0 auto", maxHeight: "50px"}}
                        src={`data:image/png;base64,${currProduct.photo}`} alt="zjecie" className="img-fluid d-block"/>}
                </div>


                {currProduct &&
                <div className="col-sm-4 p-2">
                    <h5 className="mb-1">{currProduct.name}</h5>
                    <p className="mb-1">Price: {(currProduct.price)} </p>
                    <p className="mb-1">StartTime: {(product.startDate)} </p>
                    <p className="mb-1">EndTime: {(currProduct.endDate)} </p>

                </div>
                }
                {/*   <div className="col-sm-2 p-2 text-center ">
                <p className="mb-0">Qty: {product.quantity}</p>
            </div>*/}
                {/*   <div className="col-sm-4 p-2 text-right">
                <button
                    onClick={() => increase(product)}
                    className="btn btn-primary btn-sm mr-2 mb-1">
                    <PlusCircleIcon width={"20px"}/>
                </button>

               {
                    product.quantity > 1 &&
                    <button
                        onClick={() => decrease(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </button>
                }

                {
                    product.quantity === 1 &&
                    <button
                        onClick={() => removeProduct(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </button>
                }

            </div>*/}
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

export default withRouter(connect(mapStateToProps)(CartItem));