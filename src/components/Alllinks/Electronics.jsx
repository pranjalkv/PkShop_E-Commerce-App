import Sideopt from "./Sideopt";
import Datadis from "../Datadis";
function Electronics({propApi})
{
    return(
      <section id="elec-sec">
        <Sideopt></Sideopt>
         <div style={{marginLeft:"20%",marginTop:"65px"}}>
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default Electronics;