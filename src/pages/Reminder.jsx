import EmptyReminder from "../components/EmptyReminder";
import CalendaryDays from "../components/CalendaryDays";
import AddReminder from "../components/AddReminder";
import EditReminder from "../components/EditReminder";
import ViewReminder from "../components/ViewReminders";
import logo from "../img/Logo.svg"
import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react";
import "../styles/Reminder.css";

import { useSelector } from "react-redux";



function Reminder() {

  const [changeDate, setChangeDate] = useState(false);
  const [seeMEnuOption, setSeeMenuOption] = useState();
  const [numberOption, setNumberOption] = useState();
  const [dateSelected,setDateSelected] = useState("")

  /*This code block fetches the current date and adds it by default to the main view.*/
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const day = currentDate.getDate();
  const dayOfWeek = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const [date, setDate] = useState({
    number: dayOfWeek,
    numberMonth: currentMonth,
    numberDay: day,
    yearFull: year,
  });

  /*This function fetches the reminders with the selected date*/
  const reminders = useSelector((state) => state.reminders.objects);
  const getRemineders = () => {
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
    const dateSelecter =
      date.yearFull +
      "-" +
      numberMounth[date.numberMonth] +
      "-" +
      (date.numberDay<10? 0+date.numberDay.toString():date.numberDay);
    setDateSelected(dateSelecter)
    const remindersDaySelected = reminders.filter( (reminder) => reminder.date === dateSelecter);
    if (remindersDaySelected.length > 0) {
      switchMenu(3, remindersDaySelected);
    } else {
      switchMenu();
    }
  };

  useEffect(() => {
    getRemineders();
    setChangeDate(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeDate, date]);

  /*This switch controls what will be seen in the main view.*/
  const switchMenu = (option, remindersDaySelected,dataToModify) => {
    switch (option) {
      case 1:
        setSeeMenuOption(
          <AddReminder dateSelected={dateSelected} setChangeDate={setChangeDate} />
        );
        setNumberOption(1);
        break;
      case 2:
        setSeeMenuOption(
          <EditReminder switchMenu={switchMenu} setChangeDate={setChangeDate} dataToModify={dataToModify} activeReminder={remindersDaySelected}  />
        );
        setNumberOption(2);
        break;
      case 3:
        setSeeMenuOption(
          <ViewReminder activeReminder={remindersDaySelected} switchMenu={switchMenu} />
        );
        setNumberOption(3);
        break;
      default:
        setSeeMenuOption(<EmptyReminder />);
        setNumberOption(0);
        break;
    }
  };

  return (
    <>
      <section className="section_container">
        <img className="logo" src={logo} alt="logo" />
        <div className="section_container--div1">
          <div className="section_container--div1--button_container">
            <p>
              {numberOption === 1? "Add reminder - ": numberOption === 2? "Edit reminder - ":""}
              {daysOfWeek[date.number] +
                ", " +
                months[date.numberMonth] +
                ", " +
                date.numberDay +
                ", " +
                date.yearFull}
            </p>
            {numberOption === 1? <></>: numberOption === 2? <></> : <button onClick={() => switchMenu(1)}className="button_add_reminder">Add reminder</button>}
          </div>
          <div className="data_container">{seeMEnuOption}</div>
        </div>
        <div className="section_container--div2">
          <CalendaryDays setDate={setDate} setChangeDate={setChangeDate}  changeDate={changeDate}/>
        </div>
      </section>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
    </>
  );
}

export default Reminder;
