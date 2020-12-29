import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export function KeyboardTimePickerExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        label="Time to Call"
        placeholder="08:00 AM"
        mask="__:__ _M"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
}
export function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        placeholder="2018/10/10"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        format="yyyy/MM/dd"
      />
    </MuiPickersUtilsProvider>
  );
}
