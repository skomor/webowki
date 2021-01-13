import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {productActions} from "../_actions/product_action";


import {Calendar, DateRangePicker} from 'react-date-range';


import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from "@material-ui/core/Radio";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Button} from "reactstrap/es";
import {cartActions} from "../_actions/cart_actions";
import '../Pages/SingleProductPage.css';
const marks = [
    {
        value: 9,
        label: '9.00',
    },
    {
        value: 12,
        label: '12.00',
    },
    {
        value: 15,
        label: '15.00',
    },
    {
        value: 18,
        label: '18.00',
    },
];

class SingleProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyOrHourly: 'd',
            selectedDay: new Date(),
            selectedHour: [9, 12],
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            },
            checkoutItem: {
                productId: "",
                dailyOrHourly: 'd',
                startDate: new Date(),
                endDate: new Date(),
            },
            productIndex: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelectedHour = this.handleChangeSelectedHour.bind(this);
        this.handleSelectForDatePicker = this.handleSelectForDatePicker.bind(this);
        this.handleSelectForCalendar = this.handleSelectForCalendar.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.addHours = this.addHours.bind(this);
    }

    componentDidMount() {
        if (!this.props.products.items)
            this.props.dispatch(productActions.getAll());
    }

    handleSelectForDatePicker(ranges) {
        console.log(ranges);
        this.setState({
            selectionRange: {
                startDate: ranges.selection.startDate,
                endDate: ranges.selection.endDate,
                key: 'selection'
            },
            selectedDay: null
        });
    }

    handleSelectForCalendar(date) {
        console.log(date);
        this.setState({
            selectedDay: date,
            selectionRange: null
        })
    }

    addHours(date,h) {
        return date + (h * 60 * 60 * 1000);
    }

    onAddButtonClick ()  {

        const {id} = this.props.match.params;


        /*    if (this.state.dailyOrHourly === "d")
                this.setState({
                    checkoutItem: {
                        productId: id,
                        dailyOrHourly: this.state.dailyOrHourly,
                        startDate: new Date(this.state.selectionRange.startDate.setHours(0,0,0)),
                        endDate: new Date(this.state.selectionRange.endDate.setHours(0,0,0)),
                    }
                });
            else
            {
                this.setState({
                    checkoutItem: {
                        productId: id,
                        dailyOrHourly: this.state.dailyOrHourly,
                        startDate: new Date(this.state.selectedDay.setHours(this.state.selectedHour[0],0,0)),
                        endDate: new Date(this.state.selectedDay.setHours(this.state.selectedHour[1],0,0)),
                    }
                });
            }*/
        var toLocalStorage ='';
        if (this.state.dailyOrHourly === "d")
            toLocalStorage ={
                productId: id,
                dailyOrHourly: this.state.dailyOrHourly,
                startDate: new Date(this.state.selectionRange.startDate.setHours(0,0,0)),
                endDate: new Date(this.state.selectionRange.endDate.setHours(0,0,0)),

            }
        else
        {
            toLocalStorage={

                productId: id,
                dailyOrHourly: this.state.dailyOrHourly,
                startDate: new Date(this.state.selectedDay.setHours(this.state.selectedHour[0],0,0)),
                endDate: new Date(this.state.selectedDay.setHours(this.state.selectedHour[1],0,0)),

            }
        }
        this.props.dispatch(cartActions.addItem(toLocalStorage));


    }



    handleChange = (event) => {
        this.setState({
            dailyOrHourly: event.target.value,
        });
    };


    handleChangeSelectedHour = (event, newValue) => {
        this.setState({
            selectedHour: newValue,

        });

    };

    render() {
        const {products} = this.props;
        const {id} = this.props.match.params;
        var selectedProductIndex = null;
        if (products.items)
            for (var i = 0; i < products.items.length; i++) {
                if (products.items[i].id == id) {
                    selectedProductIndex = i;

                }
            }

        const {dailyOrHourly, selectedDay, selectedHour} = this.state;
        const {selectionRange} = this.state;

        return (
            <div>
                {products.loading && <em>Loading products...</em>}
                {products.items && selectedProductIndex !== null &&
                <div>
                    <div class="content">
                        <h3>{products.items[selectedProductIndex].name}</h3>
                        <hr/>
                        <img
                            style={{display: "block", margin: "0 auto 10px", maxHeight: "200px" }}
                            className="img-fluid"
                            src={`data:image/png;base64,${products.items[selectedProductIndex].photo}`} alt="zdjecie"/>
                        <br/>
                        <h4>Dane produktu</h4>
                        <hr/>
                        <table id="specifications">
                            <tr>
                                <td>Producent:</td>
                                <td>{products.items[selectedProductIndex].brand}</td>
                            </tr>


                            <tr>
                                <td>Długość:</td>
                                <td>{products.items[selectedProductIndex].lenght} [cm]</td>
                            </tr>
                            <tr>
                                <td>Cena rynkowa:</td>
                                <td>{products.items[selectedProductIndex].retailprice} [zł]</td>
                            </tr>
                            <tr>
                                <td>Płeć użytkownika:</td>
                                <td>{products.items[selectedProductIndex].gender? "M" : "K"}</td>
                            </tr>
                            <tr>
                                <td>Koszt/doba:</td>
                                <td>{Math.floor(products.price*3)} PLN</td>

                            </tr>
                            <tr>
                                <td>Koszt/godzina:</td>
                                <td>{products.items[selectedProductIndex].price} PLN</td>

                            </tr>
                        </table>
                        <br/>
                        <h4>Opis</h4>
                        <hr/>
                        <p>{products.items[selectedProductIndex].description} </p>

                        <br/><br/>

                        <h4>Terminarz wypożyczenia</h4>
                        <hr/>
                        <div class="centerDiv">
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={dailyOrHourly}
                                            onChange={this.handleChange}>
                                    <FormControlLabel value={"d"} control={<Radio/>} label="Dziennie"/>
                                    <FormControlLabel value={"h"} control={<Radio/>} label="Na Godziny"/>
                                </RadioGroup>
                            </FormControl>
                            {
                                dailyOrHourly === "d" ?
                                    <div>
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            onChange={this.handleSelectForDatePicker}
                                            minDate={new Date()}
                                        />
                                        <Button onClick={this.onAddButtonClick}>OK</Button>
                                    </div>
                                    : <Calendar
                                        date={selectedDay}
                                        onChange={this.handleSelectForCalendar}
                                        minDate={new Date()}

                                    />}
                            {
                                dailyOrHourly === "h" && !Array.isArray(selectedDay) ?
                                    <div>
                                        <Typography id="range-slider" gutterBottom>
                                            Wybierz godzinę
                                        </Typography>
                                        <Slider
                                            value={selectedHour}
                                            onChange={this.handleChangeSelectedHour}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            min={9}
                                            max={18}
                                            // getAriaValueText={valuetext}
                                            marks={marks}
                                        />
                                        <Button onClick={this.onAddButtonClick}>OK</Button>
                                    </div> : ""}
                        </div>
                    </div>


                </div>}
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {products} = state;
    return {

        products
    };
}

export default withRouter(connect(mapStateToProps)(SingleProductPage));