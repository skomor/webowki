import React, {useContext, useEffect} from 'react';
import ProductItem from './ProductItem';
//import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './productsGrid.scss';
import {connect} from "react-redux";
import {productActions} from "../../_actions/product_action";

class ProductsGrid extends React.Component{

  //  const { products} = useContext(ProductsContext)
    componentDidMount() {
        this.props.dispatch(productActions.getAll());

    }

    render() {
        const {products} = this.props;
        return (
            <div>
                {/*{ products[1].id }*/}
                <div className={styles.p__grid}>

                    {products.loading && <em>Loading products...</em>}
                    {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                    {products.items &&
                    <ul>
                        {products.items.map(item =>
                            <li key={item.id}>
                                {item.name + ' ' + item.lenght}

                            </li>
                        )}
                    </ul>
                    }
                </div>
                <div className={styles.p__footer}>

                </div>
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