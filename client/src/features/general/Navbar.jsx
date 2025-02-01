import { Link } from "react-router-dom";
import Logo from "./Logo";
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <div className="navbarMainContainer">
                <div className="navbarLeftcontainer">
                    <Logo />
                </div>
                <div className="navbarCentercontainer">
                    <Link to={'/links'}>Links</Link>
                    <Link to={'/user'}>Profile Details</Link>
                </div>
                <div className="navbarRightcontainer">
                    <Link>Preview</Link>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;