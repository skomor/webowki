import React from 'react';
//import { ProductsContext } from '../../contexts/ProductsContext';
import styles from './productsGrid.scss';
import {connect} from "react-redux";
import {productActions} from "../../_actions/product_action";
import ProductItem from "./ProductItem";

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
            {/*    <div className={styles.p__grid}>

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
                </div> lista z main page*/}
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
               {/* {products.items &&
                <img src={products.items[1].photo} alt=""> </img>}*/}
             {/*   <div className={styles.p__footer}>

                </div>*/}
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