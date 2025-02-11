import { useSelector } from "react-redux";
import nextIcon from '../../assets/img/icon-arrow-right.svg';
import CodePen from '../../assets/img/icon-codepen.svg';
import CodeWars from '../../assets/img/icon-codewars.svg';
import DevTo from '../../assets/img/icon-devto.svg';
import Facebook from '../../assets/img/icon-facebook.svg';
import FreeCodeMap from '../../assets/img/icon-freecodecamp.svg';
import GitHub from '../../assets/img/icon-github.svg';
import GitLab from '../../assets/img/icon-gitlab.svg';
import HashNode from '../../assets/img/icon-hashnode.svg';
import LinkedIn from '../../assets/img/icon-linkedin.svg';
import StackOverflow from '../../assets/img/icon-stack-overflow.svg';
import Twitch from '../../assets/img/icon-twitch.svg';
import Twitter from '../../assets/img/icon-twitter.svg';
import YouTube from '../../assets/img/icon-youtube.svg';
import PortfolioWeb from '../../assets/img/icon-profile-details-header.svg';
import mobileBackground from '../../assets/img/illustration-phone-mockup.svg';
import './mobileView.css';

const MobileView = () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    const user = useSelector(state => state.user.user);
    const links = useSelector(state => state.links.currentLinks);
    
    const icons = {
        "CodePen": CodePen,
        "CodeWars": CodeWars,
        "DevTo": DevTo,
        "Facebook": Facebook,
        "FreeCodeCamp": FreeCodeMap,
        "GitHub": GitHub,
        "GitLab": GitLab,
        "HashNode": HashNode,
        "LinkedIn": LinkedIn,
        "StackOverflow": StackOverflow,
        "Twitch": Twitch,
        "Twitter": Twitter,
        "YouTube": YouTube,
        "Portfolio": PortfolioWeb
    };

    return (
        <>
            <div className="mobileViewMainContainer">
                <img src={mobileBackground} alt="mobile background" className="mobileViewBackgroundImage" />
                <div className="mobileViewUserContainer">
                    <img src={`${BASE_URL}${user.profilePicture}`} alt="user picture" className="mobileViewProfilePicture" />
                    <p className="mobileViewUserName">{user.firstName} {user.lastName}</p>
                    <p className="mobileViewUserEmail">{user.publicEmail}</p>
                </div>
                <div className="mobileViewLinksContainer">
                    {
                        links.slice(0, 5).map(item => {
                            return (
                                <div className={`mobileViewLinkItem ${item.title}`} key={item.display_order}>
                                    <img src={icons[item.title] || PortfolioWeb} alt="link icon" className="mobileViewLinkIcon" />
                                    <span className="mobileViewLinkItemName">{item.title}</span>
                                    <a className="mobileViewLinkItemNextUrl" href={`https://${item.url}`} target="_blank">
                                        <img src={nextIcon} alt="link icon" className="mobileViewNextIcon" />
                                    </a>
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