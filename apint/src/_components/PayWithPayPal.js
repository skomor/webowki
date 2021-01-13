import React, { useState, useEffect, useRef } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {PriceCalculator} from "../_helpersAndConstants/price.calculator";
import CalendarAdder from "../_components/CalendarAdder"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {cartActions} from "../_actions/cart_actions";
import {cartService} from "../_services/cart.service";

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
                    props.dispatch(cartActions.clear());

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
        var date=props.CartReducer.date;
        return (
            <div class="content">
                <div>

                    Dziękuję za złożenie rezerwacji!
                    Jeśli chcesz dodać wydarzenie rezerwacji do kalendarza, możesz to zrobić tutaj
                </div>

                <br/>
                <CalendarAdder startTime={date} endTime={date}/>
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
function mapStateToProps(state) {
    const {CartReducer, } = state;
    return {
        CartReducer,

    };
}

export default connect( mapStateToProps)(PayWithPayPal)