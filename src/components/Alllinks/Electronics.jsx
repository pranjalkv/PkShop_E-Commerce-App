import Sideopt from "./Sideopt";
import Datadis from "../Datadis";
function Electronics({propApi})
{
    return(
      <section id="elec-sec">
        <Sideopt></Sideopt>
         <div className="api-products">
        <Datadis propApi={propApi}></Datadis>
        </div>
        </section>
    )
}
export default Electronics;