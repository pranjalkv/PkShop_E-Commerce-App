import Sideopt from "./Sideopt";
import Datadis from "../Datadis";

function Cloth({propApi})
{
    return(
        <section id="cloth-sec" >
        <Sideopt propApi={propApi}></Sideopt>
         <div className="api-products">
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default Cloth;