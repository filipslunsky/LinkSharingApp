import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PreviewNavbar from "./PreviewNavbar";
import Logo from "./Logo";
import linksIcon from '../../assets/img/icon-link.svg';
import profileIcon from '../../assets/img/icon-profile-details-header.svg';
import previewIcon from '../../assets/img/icon-preview-header.svg';
import profileIconColor from '../../assets/img/icon-profile-details-header-color.svg';
import linksIconColor from '../../assets/img/icon-links-header-color.svg';
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
                    <div className="navbarLeftContainer">
                        <Logo />
                    </div>
                    <div className="navbarCenterContainer">
                        <Link className={path.includes('links') ? "navbarCenterLinkActive" : "navbarCenterLink"} to={'/links'}>
                            <img className="navbarItemIcon" src={path.includes('links') ? linksIconColor : linksIcon} alt="links icon" />
                            <span className="navbarItemName">Links</span>
                        </Link>
                        <Link className={path.includes('user') ? "navbarCenterLinkActive" : "navbarCenterLink"} to={'/user'}>
                            <img className="navbarItemIcon" src={path.includes('user') ? profileIconColor : profileIcon} alt="links icon" />
                            <span className="navbarItemName">Profile Details</span>
                        </Link>
                    </div>
                    <div className="navbarRightContainer">
                        <Link className="navbarRightLink" to={`/view/${user.hashId}`}>
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