import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import './navbar.css';

const Navbar = () => {
    const location = useLocation();
    const user = useSelector(state => state.user.user);
    
    // console.log(location.pathname);
    
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
                    <Link to={`/view/${user.hashId}`}>Preview</Link>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;