import Sideopt from "./Sideopt";
import Datadis from "../Datadis";
function All({propApi})
{
    return(
      <section id="all-sec">
        <Sideopt></Sideopt>
         <div className="api-products">
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default All;