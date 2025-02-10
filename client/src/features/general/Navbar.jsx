import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PreviewNavbar from "./PreviewNabar";
import Logo from "./Logo";
import linksIcon from '../../assets/img/icon-link.svg';
import profileIcon from '../../assets/img/icon-profile-details-header.svg';
import previewIcon from '../../assets/img/icon-preview-header.svg';
import './navbar.css';

const Navbar = () => {
    const location = useLocation();
    const user = useSelector(state => state.user.user);
    const path = location.pathname;
    
    return (
        <>
            {
                path.includes('view')
                ?
                <PreviewNavbar />
                :
                <div className="navbarMainContainer">
                    <div className="navbarLeftcontainer">
                        <Logo />
                    </div>
                    <div className="navbarCentercontainer">
                        <Link to={'/links'}>
                            <img className="navbarItemIcon" src={linksIcon} alt="links icon" />
                            <span className="navbarItemName">Links</span>
                        </Link>
                        <Link to={'/user'}>
                            <img className="navbarItemIcon" src={profileIcon} alt="links icon" />
                            <span className="navbarItemName">Profile Details</span>
                        </Link>
                    </div>
                    <div className="navbarRightcontainer">
                        <Link to={`/view/${user.hashId}`}>
                            <img className="navbarItemIcon" src={previewIcon} alt="links icon" />
                            <span className="navbarItemName">Preview</span>
                        </Link>
                    </div>
                </div>
            }
            
        </>
    );
}
 
export default Navbar;