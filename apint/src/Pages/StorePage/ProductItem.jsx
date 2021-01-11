import React from 'react';
import { Link } from 'react-router-dom';


const ProductItem = ({product}) => {



    return (
        <div className="card card-body">
            <img
               style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}}
                 className="img-fluid"
                 src={`data:image/png;base64,${product.photo}`} alt="zjecie"/>
            <p>{product.name}</p>
            <h4 className="text-left">Cena za dobę: {product.price}</h4>
            <h4 className="text-left">dł: {product.lenght}</h4>
            <h6 className="text-left">płeć: {product.gender ? "m" : "k"  }</h6>

            <h4 className="text-left">Cena za godzinę: {Math.floor(product.price/6)}</h4>
            <div className="text-right">
                <Link  to={{pathname:`/products/${product.id}`, product: product}} className="btn btn-link btn-sm mr-2"  >Wypożycz</Link>

               {/* {
                    isInCart(product) &&
                    <button
                        onClick={() => increase(product)}
                        className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(product) &&
                    <button
                        onClick={() => addProduct(product)}
                        className="btn btn-primary btn-sm">Add to cart</button>
                }*/}

            </div>
        </div>
    );
}

export default ProductItem;