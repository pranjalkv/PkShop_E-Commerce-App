import Sideopt from "./Sideopt";
import Datadis from "../Datadis";

function Cloth({propApi})
{
    return(
        <section id="cloth-sec" >
        <Sideopt propApi={propApi}></Sideopt>
         <div style={{marginLeft:"20%",marginTop:"65px"}}>
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default Cloth;