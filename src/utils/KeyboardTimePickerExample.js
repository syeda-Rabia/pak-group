import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export function KeyboardTimePickerExample(props) {
  const [selectedTime, handleTimeChange] = useState(props.value);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        placeholder="00:00 AM"
        mask="__:__ _M"
        value={selectedTime}
        onChange={(time) => {
          handleTimeChange(time);
          props.showTime(time);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export function KeyboardDatePickerExample({ value, showDate }) {
  const [selectedDate, handleDateChange] = useState(value);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // variant="inline"
        // inputVariant=""
        placeholder="10/10/2018"
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
          showDate(date);
        }}
        format="yyyy/MM/dd"
      />
    </MuiPickersUtilsProvider>
  );
}
