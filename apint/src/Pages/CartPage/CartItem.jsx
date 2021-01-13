import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {productActions} from "../../_actions/product_action";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {cartActions} from "../../_actions/cart_actions";
import IconButton from "@material-ui/core/IconButton";
import {PriceCalculator} from "../../_helpersAndConstants/price.calculator";
import './cartStyle.css';


class CartItem extends React.Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this)
    }

    componentDidMount() {
        if (!this.props.products.items)
            this.props.dispatch(productActions.getAll());
    }

    remove(product) {
        this.props.dispatch(cartActions.delete(product));
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
            <div className="row no-gutters py-2 cartObject">
                <div className="col-sm-2 p-2">
                    {currProduct &&
                    <img
                        alt={currProduct.name}
                        style={{margin: "0 auto", maxHeight: "50px"}}
                        src={`data:image/png;base64,${currProduct.photo}`} alt="zjecie" className="img-fluid d-block"/>}
                </div>


                {currProduct &&
                <div className="col-sm-10 p-2">
                    <h5 className="mb-1">{currProduct.name}</h5>
                    <p className="mb-1">Cena: {PriceCalculator.calculatePrice(currProduct.price,product.dailyOrHourly,new Date(product.startDate),new Date(product.endDate) )} </p>
                    <p className="mb-1">Rozpoczęcie wynajmu: {new Date(product.startDate).toLocaleString()} </p>
                    <p className="mb-1">Zakończenie wynajmu: {new Date(product.endDate).toLocaleString()} </p>

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
                {
                    currProduct &&
                    <IconButton aria-label="delete" onClick={() => this.remove(product)}>
                        <DeleteForeverIcon width={"20px"}/>
                    </IconButton>

                }
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