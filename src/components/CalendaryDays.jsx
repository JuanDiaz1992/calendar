import "../styles/CalendaryDays.css";
import React, { useState, useEffect } from "react";
import rigth from "../img/right.svg";
import left from "../img/left.svg";
import center from "../img/center.svg";
import point from "../img/point-reminder.svg";
import { useSelector } from "react-redux";

function CalendaryDays(props) {
  const calendar2023 = {
    January: {
      days: 31,
      firstDayOfWeek: "Sunday",
    },
    February: {
      days: 28, // 2023 is not a leap year
      firstDayOfWeek: "Wednesday",
    },
    March: {
      days: 31,
      firstDayOfWeek: "Wednesday",
    },
    April: {
      days: 30,
      firstDayOfWeek: "Saturday",
    },
    May: {
      days: 31,
      firstDayOfWeek: "Monday",
    },
    June: {
      days: 30,
      firstDayOfWeek: "Thursday",
    },
    July: {
      days: 31,
      firstDayOfWeek: "Saturday",
    },
    August: {
      days: 31,
      firstDayOfWeek: "Tuesday",
    },
    September: {
      days: 30,
      firstDayOfWeek: "Friday",
    },
    October: {
      days: 31,
      firstDayOfWeek: "Sunday",
    },
    November: {
      days: 30,
      firstDayOfWeek: "Wednesday",
    },
    December: {
      days: 31,
      firstDayOfWeek: "Friday",
    },
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [numberMonth, setNumberMont] = useState(currentMonth); //brings the month by array position
  const [selectedMonth, setMonth] = useState(months[numberMonth]); //select the month in the array depending on the variable numberMonth
  const [selectedDay, setSelectedDay] = useState({
    numberDay: day,
    numberMonth: numberMonth,
  });
  const selectedMonthInfo = calendar2023[selectedMonth];
  const { days, firstDayOfWeek } = selectedMonthInfo;
  const firstDayIndex = daysOfWeek.indexOf(firstDayOfWeek);
  const reminders = useSelector((state) => state.reminders.objects);

  const selectMonth = (select) => {
    if (select === "+" && numberMonth < 11) {
      setNumberMont(numberMonth + 1);
      setMonth(months[numberMonth + 1]);
    } else if (select === "-" && numberMonth > 0) {
      setNumberMont(numberMonth - 1);
      setMonth(months[numberMonth - 1]);
    } else if (select === "*") {
      setNumberMont(currentMonth);
      setMonth(months[currentMonth]);
    }
  };

  const selectDay = (day) => {
    if (day !== null && day.numberDay >= 0) {
      day.yearFull = year;
      day.number = daysOfWeek.indexOf(day.dayOfWeek);
      setSelectedDay(day);
      props.setDate(day);
      props.setChangeDate(true);
    }
  };

  useEffect(() => {
    const generateDaysOfMonth = () => {
      const numberMounth = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const dateSelecter = year + "-" + numberMounth[numberMonth];
      const remindersDaySelected = reminders.filter((reminder) =>
        reminder.date.startsWith(dateSelecter)
      );

      const newDays = [{}];
      for (let i = 0; i < firstDayIndex; i++) {
        newDays.push(null);
      }
      for (let i = 1; i <= days; i++) {
        const day = i;
        const dayOfWeek = daysOfWeek[(i + firstDayIndex) % 7];
        let doeshavereminder = remindersDaySelected.some((dayWhitReminder) =>
          dayWhitReminder.date.slice(-2) === (day <=9? "0" + day : day.toString() ) 
        );
        newDays.push({
          numberDay: day,
          dayOfWeek,
          numberMonth,
          doeshavereminder,
        });
      }
      setDaysOfMonth(newDays);
    };
    generateDaysOfMonth();

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [days, firstDayIndex, selectedMonth, selectedDay, props.changeDate]);

  return (
    <div className="calendary_container">
      <div className="calendary_container--header">
        <h1>{year}</h1>
        <h2>{selectedMonth[0].toUpperCase() + selectedMonth.substring(1)}</h2>
      </div>
      <div>
        <div className="buttons_navigate--container">
          <img
            className="button_navigate"
            src={left}
            onClick={() => selectMonth("-")}
            alt="left"
          />
          <img
            className="button_navigate"
            src={center}
            onClick={() => selectMonth("*")}
            alt="center"
          />
          <img
            className="button_navigate"
            src={rigth}
            onClick={() => selectMonth("+")}
            alt="rigth"
          />
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div className="day" key={index}>
              {day.substring(0, 3)}
            </div>
          ))}
        </div>
        <div className="days">
          {daysOfMonth.map((day, index) => (
            <div
              onClick={!day ? () => selectDay(null) : () => selectDay(day)}
              key={index}
              className={
                !day
                  ? ""
                  : day.numberDay === selectedDay.numberDay &&
                    day.numberMonth === selectedDay.numberMonth
                  ? "day days_select"
                  : "day"
              }
            >
              {day ? day.numberDay : ""}
              {!day ? (
                <></>
              ) : day.doeshavereminder ? (
                <img src={point} alt="point" className="notification_pot" />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="rights">© 2022 Codelitt Inc All rights reserved</p>
    </div>
  );
}

export default CalendaryDays;
