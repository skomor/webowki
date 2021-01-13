import React from  "react";
import '../Pages/SingleProductPage.css';

class PricesPage extends  React.Component {

    render() {
        return(
            < div class="content">
                <h2>Cennik</h2>
                <hr /><br />

                <table id="specifications">
                    <tr>
                        <th>&nbsp;</th>
                        <th>1 godzina</th>
                        <th>każda następna godzina</th>
                        <th>doba</th>
                    </tr>
                    <tr>
                        <td>narty</td>
                        <td>15 zł</td>
                        <td>5 zł</td>
                        <td>30 zł</td>
                    </tr>


                    <tr>
                        <td>snowboard</td>
                        <td>15 zł</td>
                        <td>5 zł</td>
                        <td>30 zł</td>
                    </tr>

                    <tr>
                        <td>buty</td>
                        <td>10 zł</td>
                        <td>5 zł</td>
                        <td>20 zł</td>
                    </tr>
                    <tr>
                        <td>kask</td>
                        <td>&nbsp;6 zł</td>
                        <td>2 zł</td>
                        <td>10 zł</td>
                    </tr>

                    <tr>
                        <td>kije</td>
                        <td>&nbsp;6 zł</td>
                        <td>2 zł</td>
                        <td>10 zł</td>
                    </tr>
                </table>
                <p>* do kasku są dodawane gogle GRATIS!</p>
            </div>
        )
    }

}
export default PricesPage