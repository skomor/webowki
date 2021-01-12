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
                <div className="text-center mb-5 bold">
                    <h1>Wypożyczalnia</h1>
                    <p>Dostępny sprzęt do wypożyczenia</p>
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