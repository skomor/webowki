import React from  "react";

class AboutPage extends  React.Component {

    render() {
        return(
            <div className="col-sm-12 content">
                <h3>O nas</h3>
                <hr/>
                <br/>
                <p className="justify">Firma "Wypożyczalnia sprzętu narciarskiego Jane AHONENE" istnieje na rynku od
                    2020 roku.
                    Jesteśmy młodymi, pełnymi ambicji ludźmi, którzy chcą służyć swoją wiedzą na temat sprzętu innym.
                    Dzięki temu potrafimy doskonale dobrać sprzęt do indywidualnych potrzeb i wymagań każdego klienta.
                </p>
                <p className="justify">Głównym przedmiotem działalności naszej firmy jest wypożyczalnia oraz serwis
                    sprzętu narciarskiego i snowboardowego.
                    Wypożyczalnia posiada kilkadziesiąt kompletów sprzętu renomowanych marek, znakomicie przygotowanych
                    do jazdy.
                    Z pewnością każdy znajdzie coś dla siebie! Serwis sprzętu narciarskiego i snowboardowego wykonujemy
                    maszynowo oraz ręcznie, gwarantujemy znakomite wykonanie, niskie ceny oraz krótkie terminy
                    realizacji usług.
                </p>
                <br/>
                <h5>Kontakt</h5>
                <hr/>
                <p>Adres: ul. Gen Sylwestra Kaliskiego 21 01-476</p>
                <p>Telefon: 777-999-888</p>
                <p>e-mail: wypozyczalnia@janeahonene.pl</p>
                <br/>
                <h5>Godziny otwarcia:</h5>
                <hr/>
                <p>poniedziałek-piątek: 12:00-18:00</p>
                <p>poniedziałek-piątek: 12:00-15:00</p>
                <br/>
                {/* <h4>Jak do nas trafić</h4> */}

                {/* <div id="googleMap" style="width:100%;height:400px;"></div> */}

                {/* <script>
                function myMap() {
                var mapProp= {
                center:new google.maps.LatLng(51.508742,-0.120850),
                zoom:5,
                };
                var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
                }
                </script>

                <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script> */}

            </div>
        )
    }

}
export default AboutPage