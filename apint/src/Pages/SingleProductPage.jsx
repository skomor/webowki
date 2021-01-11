import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {productActions} from "../_actions/product_action";

class SingleProductPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (!this.props.products.items)
            this.props.dispatch(productActions.getAll());

    }

    render() {
        const {products} = this.props;
        const {id} = this.props.match.params;
        var selectedProductIndex = null;
        if (products.items)
            for (var i = 0; i < products.items.length; i++) {
                if (products.items[i].id == id)
                    selectedProductIndex = i;
            }


        return (
            <div>
                {products.loading && <em>Loading products...</em>}
                {products.items && selectedProductIndex !== null &&
                <div>SINGLE PRODUCT PAGE
                    <p>{products.items[selectedProductIndex].brand} </p>
                    <p>{products.items[selectedProductIndex].gender? "m" : "k"} </p>
                    <p>{products.items[selectedProductIndex].lenght} </p>
                    <p>{products.items[selectedProductIndex].price} </p>



                </div>}
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {products} = state;
    return {

        products
    };
}

export default withRouter(connect(mapStateToProps)(SingleProductPage));