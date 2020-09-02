import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import AssignmentsAPI from "../utils/API-assignments";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  state = {
    due: [],
  };

  convertDate = (date) => {
    let newDate = moment(date).add(1, 'days');
    return moment.utc(newDate).toDate();
  };

  componentDidMount() {
    AssignmentsAPI.getAssignments().then(res => {
      const events = res.data.map((date) => ({
        title: date.name,
        start: this.convertDate(date.due_date),
        end: this.convertDate(date.due_date),
        allDay: true,
        
      }));
      console.log(events)
      this.setState({
        due: events
      });
    });
  }

  render() {
    const { due } = this.state;

    return (
      <div className="hero-image">
        <div className="container pt-3 pb-3">
          <div className="calendar col-lg-12 col-md-12 col-sm-12 bg-white pt-3 pb-3">
            <Calendar
              defaultDate={moment().toDate()}
              defaultView="month"
              events={due}
              localizer={localizer}
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyCalendar;
