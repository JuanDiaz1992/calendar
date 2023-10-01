import clock from "../../img/clock.svg";
import edit from "../../img/buttonEdit.svg";
function ListViewReminder({reminder, switchMenu}){
    return(
        <>

                <div className="card">
                    <div className="cards_line_container">
                        <div className={"cards_line " +(
                        reminder.color === "C8E6C9"? "color1":
                        reminder.color === "F5DD29"? "color2":
                        reminder.color === "FFCC80"? "color3":
                        reminder.color === "EF9A9A"? "color4":
                        reminder.color === "CD8DE5"? "color5":
                        reminder.color === "5BA4CF"? "color6":
                        reminder.color === "29CCE5"? "color7":
                        reminder.color === "6DECA9"? "color8":
                        reminder.color === "FF8ED4"? "color9":
                        reminder.color === "BCAAA4"? "color10":
                        "")
                        }></div>
                    </div>

                    <div className="cards_text">
                        <h5>{reminder.title}</h5>
                        <p>{reminder.description}</p>
                    </div>
                    <hr />
                    <div className="cards_time">
                        <img className="clock" src={clock} alt="clock" />
                        <p className="time">{reminder.time}</p>
                    </div>
                    <button onClick={()=>switchMenu(2,"",reminder)} className="button_edit_reminder"><img src={edit} alt="edit"/></button>
                </div>

        </>
    )
}

export default ListViewReminder