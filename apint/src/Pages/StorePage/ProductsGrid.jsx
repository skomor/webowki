import React from 'react';
//import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './productsGrid.scss';
import {connect} from "react-redux";
import {productActions} from "../../_actions/product_action";
import ProductItem from "./ProductItem";

class ProductsGrid extends React.Component{

    componentDidMount() {
        this.props.dispatch(productActions.getAll());

    }

    render() {
        const {products} = this.props;
        return (
            <div>

                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.loading && <em>Loading products...</em>}
                {products.items &&
                <div className={styles.p__grid}>

                    {
                        products.items.map(product => (
                            <ProductItem key={product.id} product={product}/>
                        ))
                    }


                </div>}

            </div>
        );
    }
}
function mapStateToProps(state) {
    const {products} = state;
    return {
        products
    };
}
export default connect(mapStateToProps)(ProductsGrid);