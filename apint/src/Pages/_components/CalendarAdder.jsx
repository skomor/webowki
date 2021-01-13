import AddToCalendar from 'react-add-to-calendar';
import React from "react";


class CalendarAdder extends React.Component {


    static displayName = 'Example';
    state = {
        event: {
            title: 'Wypożyczenie sprzętu narciarskiego',
            description: 'Wypożycznie sprzętu',
            location: 'Akademik Wojskowy nr5, Warszawa, Mazowieckie ',
            startTime: this.props.startTime,
            endTime: this.props.startTime
        }
    };

    render() {
        return <AddToCalendar buttonLabel="Dodaj do kalendarza"  event={this.state.event}/>;
    };
}
export default CalendarAdder;
