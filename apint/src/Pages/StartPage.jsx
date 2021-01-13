import React from "react";
import '../Pages/SingleProductPage.css';
import stok3 from '../images/stok3.jpg';
import stok from '../images/stok.jpg';
import stok2 from '../images/stok2.jpg';
class StartPage extends React.Component {

    render() {
        return (
            <div class="col-sm-12 content">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={stok3} alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={stok} alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={stok3} alt="Third slide"/>
                        </div>
                    </div>
                </div>
                {/* <img class="d-block w-100 img-fluid" src={stok3} alt="First slide"/> */}
                <hr/>
                <h1 class="centerText">Witamy na stronie naszej wypożyczalni!</h1>
                <br/>
                <h3>Serdecznie zapraszamy do zapoznania się z naszą ofertą.</h3>


            </div>

        )
    }

}
export default StartPage