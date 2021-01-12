import React from 'react';
import { Link } from 'react-router-dom';
import './productStyle.css'

const ProductItem = ({product}) => {



    return (
        <div className="col-md-6 float-md-left">
            <Link to={{pathname: `/products/${product.id}`, product: product}}>
                <div className="productLink">
                    <img
                        style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}}
                        className="img-fluid"
                        src={`data:image/png;base64,${product.photo}`} alt="zdjecie"/>
                    <h4>{product.name}</h4>
                    <table>
                        <tr>
                            <td>Koszt/doba:</td>
                            <td>{Math.floor(product.price / 6)} PLN</td>

                        </tr>
                        <tr>
                            <td>Koszt/godzina:</td>
                            <td>{product.price} PLN</td>

                        </tr>
                        <tr>
                            <td>Długość:</td>
                            <td>{product.lenght} [cm]</td>

                        </tr>
                        <tr>
                            <td>Płeć:</td>
                            <td>{product.gender ? "M" : "K"}</td>
                        </tr>
                    </table>


                </div>
            </Link>
        </div>
    );
}

export default ProductItem;