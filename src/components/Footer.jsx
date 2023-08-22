import "./Footer.css"
import {FaGithub ,FaLinkedin} from "react-icons/fa"

function Footer()
{
    return(
        <>
        <footer id="footer">
        <div >
        <div className="footer-links">
            <a href="https://github.com/pranjalkv" target="_blank"><FaGithub size="1.5em"/></a>
            <a href="https://twitter.com/kvpranjal" target="_blank"><img className="footer-img" src="/shop/twi.png" alt="" /></a>
            <a href="https://www.linkedin.com/in/pranjalkv/" target="_blank"><FaLinkedin size="1.5em"/></a>
            
        </div>
        <div>
            <p>© Copyright 2023, pranjalkv.com</p>
        </div>
        </div>
    </footer>
        </>
    )
}
export default Footer;