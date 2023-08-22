import Sideopt from "./Sideopt";
import Datadis from "../Datadis";
function All({propApi})
{
    return(
      <section id="all-sec">
        <Sideopt></Sideopt>
         <div style={{marginLeft:"20%",marginTop:"65px"}}>
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default All;