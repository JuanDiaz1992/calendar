import imgEmtpty from "../img/24802861.png"
import "../styles/EmtyReminder.css"

function EmptyReminder(){
    return(
        <>
            <div className="container_img_p">
                <img className="img_empty" src={imgEmtpty} alt="" />
                <p>No reminders registered so far</p>
            </div>

        </>
    )
}

export default EmptyReminder