import { useSelector } from "react-redux";
import nextIcon from '../../assets/img/icon-arrow-right.svg';

const MobileView = () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    const user = useSelector(state => state.user.user);
    const links = useSelector(state => state.links.currentLinks);

    return (
        <>
            <div className="mobileViewMainContainer">
                <div className="mobileViewUserContainer">
                    <img src={`${BASE_URL}${user.profilePicture}`} alt="user picture" className="mobileMenuProfilePicture" />
                    <p className="mobileViewUserName">{user.firstName} {user.lastName}</p>
                    <p className="mobileViewUserEmail">{user.publicEmail}</p>
                </div>
                <div className="mobileViewLinksContainer">
                    {
                        links.map(item => {
                            return (
                                <div className="mobileViewLinkItem" key={item.display_order}>
                                    <img src="" alt="link icon" className="mobileViewLinkIcon" />
                                    <span className="mobileViewLinkItemName">{item.title}</span>
                                    <button className="mobilViewLinkItemNextButton">
                                        <img src={nextIcon} alt="link icon" className="mobileViewNextIcon" />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}
 
export default MobileView;