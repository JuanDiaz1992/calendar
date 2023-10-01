import ListViewReminder from "./componenstViewReminder/ListViewReminder";
import "../styles/componenstViewReminder/ListViewReminder.css";


function ViewReminders({activeReminder, switchMenu}){
    let list = activeReminder
    list.sort(function (a,b){
        if (a.time > b.time) {
            return 1;
          }
          if (a.time < b.time) {
            return -1;
          }
          return 0;})
    return(
        <>
            <div className="cards_container">
                {list.map((reminder,index)=>(
                    <ListViewReminder key={index} reminder={reminder} switchMenu={switchMenu} />
                ))}
            </div>

        </>
    )
}
export default ViewReminders