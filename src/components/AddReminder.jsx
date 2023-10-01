import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { agregarObjeto} from "../redux/userSlice"
import "../styles/AddReminder.css";
import { toast } from "react-hot-toast"

function AddReminder({setChangeDate, dateSelected}) {
  const [warnings,setWarnings] = useState(0)
  const [isFormOk,setIsFormOk] = useState(false)
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [date,setDate] = useState(dateSelected)
  const [time,setTime] = useState("")
  const [color,setColor] = useState("C8E6C9")
  const dispatch = useDispatch();



  const colors = [
    "C8E6C9",
    "F5DD29",
    "FFCC80",
    "EF9A9A",
    "CD8DE5",
    "5BA4CF",
    "29CCE5",
    "6DECA9",
    "FF8ED4",
    "BCAAA4"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaActual = new Date();
    try{
      if (isFormOk) {
        dispatch(agregarObjeto({
          "title":title,
          "description":description,
          "date":date,
          "time":time,
          "color":color,
          "id":`item_${fechaActual.getTime()}`,
        }))
        toast.success('Reminder registered successfully')
        setChangeDate(true)

      }else{

      }

    }
    catch(error){
      console.log(error)
    }
  };
  useEffect(()=>{
    if (description.length>=300) {
      setWarnings(2)
      setIsFormOk(false)
    }else if (title.length>=20) {
      setWarnings(1)
      setIsFormOk(false)
    }else if (time.length<5) {
      setIsFormOk(false)
      setWarnings(3)
    }
    else{
      setIsFormOk(true)
      setWarnings(0)
    }
  },[description,title,time])
  console.log(warnings)
  return (
    <>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className={"warninDefault "+(warnings===1? "warning":"noWarning")} >
            <p>In this field, you can only include 15 characters.</p>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          <div className={"warninDefault "+(warnings===2? "warning":"noWarning")} >
            <p>In this field, you can only include 300 characters.</p>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="form-group--date-tyme_container">

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                placeholder="MM/DD/YYYY"
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                placeholder="HH:MM"
                required
              />
            </div>
          </div>               

          <div className="form-group">
            <label>Color</label>
            <div className="form_button_colors_container">
                {colors.map((colorChoce,index)=>(
                  <button key={index} onClick={()=>{setColor(colorChoce)}} type="button" className={"button_select_color "+(colorChoce === color? "selected_button":"")}></button>
                ))}
                
            </div>
            
          </div>
          <hr />
          <div className="buttons">
            <button onClick={()=>{
                setChangeDate(true)
              }} type="button" className="button_cancel">Cancel</button>
            <button type={isFormOk?"submit":"button"} className={isFormOk?"submit":"button_cancel"}>Save</button>
          </div>
        </form>

    </>
  );
}

export default AddReminder;
