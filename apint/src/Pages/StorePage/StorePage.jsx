import React from 'react';
import {productActions} from "../../_actions/product_action";
import ProductsGrid from "./ProductsGrid";
import {connect} from "react-redux";

class StorePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(productActions.getAll());

    }

    render() {
        const {products} = this.props;
        return (

            <div>
                <div className="text-center mt-5">
                    <h1>Store</h1>
                    <p>This is the Store Page.</p>
                </div>

                <ProductsGrid />
            </div>
        );
    }

};

function mapStateToProps(state) {
    const {products} = state;
    return {
        products
    };
}

export default connect(mapStateToProps)(StorePage);