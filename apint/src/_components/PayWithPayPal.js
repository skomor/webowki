import React, { useState, useEffect, useRef } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {PriceCalculator} from "../_helpersAndConstants/price.calculator";
import CalendarAdder from "../_components/CalendarAdder"

function PayWithPayPal (props) {
    const { cartItems, total ,products} = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Wypozyczalnia nart',
                            amount: {
                                currency_code: 'PLN',
                                value: 1.00,
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log('ORDER', order);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            })
            .render(paypalRef.current);
    }, [cartItems]);

    if (paidFor) {
        return (
            <div class="content">
                <div>

                    Dziękuję za złożenie rezerwacji!
                    Jeśli chcesz dodać wydarzenie rezerwacji do kalendarza, możesz to zrobić tutaj
                </div>

                <br/>
                <CalendarAdder startTime={cartItems[0].startDate} endTime={cartItems[0].endDate}/>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Wystąpił błąd podczas procesu zapłaty. Spróbuj ponownie
            </div>
        )
    }
    const getProd=(item)=>{
        const {products} = props;
        for (let i = 0; i < products.items.length; i++) {
            if (products.items[i].id == item.productId)
                return products.items[i];
        }
    }
    return (
        <div class="content">
            <h3>Podsumowanie zamówienia</h3>
            <hr/>
            <br/>
            <ListGroup>
                {cartItems.map((item, index) =>


                    <ListGroupItem key={ item.productId}>
                        {getProd(item).name} - PLN.
                        {PriceCalculator.calculatePrice(getProd(item).price, item.dailyOrHourly, item.startDate,item.endDate)}
                    </ListGroupItem>)
                }
            </ListGroup>
            <br/>
            <div><h5>Do zapłaty: {total} ZŁ</h5></div>
            <br/>
            <div ref={paypalRef} />
        </div>
    )
}

export default PayWithPayPal