import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPublicInfo } from "../user/state/slice";
import StatusMessage from "./StatusMessage";
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
import './preview.css';

const Preview = () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;
    const { hashId } = useParams();
    const dispatch = useDispatch();

    const publicUser = useSelector(state => state.user.publicUser);
    const publicLinks = useSelector(state => state.user.publicLinks);
    const publicInfoStatus = useSelector(state => state.user.publicInfoStatus);
    const statusMessage = useSelector(state => state.links.statusMessage);

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

    useEffect(() => {
        dispatch(getPublicInfo(hashId));
    }, [dispatch]);

    // useEffect(() => {
    //     console.log(publicUser);
    //     console.log(publicLinks);
    // }, [publicInfoStatus]);

    if (publicInfoStatus !== 'success') {
        return (
            <h2 className="previewLoading">Loading...</h2>
        )
    }

    return (
        <>
            {statusMessage.visible && <StatusMessage text={statusMessage.text} style={statusMessage.style} />}
            <div className="previewMainContainer">
                <div className="previewUserContainer">
                    <img src={`${BASE_URL}${publicUser.profilePicture}`} alt="user picture" className="previewProfilePicture" />
                    <p className="previewUserName">{publicUser.firstName} {publicUser.lastName}</p>
                    <p className="previewUserEmail">{publicUser.publicEmail}</p>
                </div>
                <div className="previewLinksContainer">
                    {
                        publicLinks.map(item => {
                            return (
                                <div className={`previewLinkItem ${item.title}`} key={item.display_order}>
                                    <div className="previewLinkLeftContainer">
                                        <img src={icons[item.title] || PortfolioWeb} alt="link icon" className="previewLinkIcon" />
                                        <span className="previewLinkItemName">{item.title}</span>
                                    </div>
                                    <a className="previewLinkItemNextUrl" href={`https://${item.url}`} target="_blank">
                                        <img src={nextIcon} alt="link icon" className="previewNextIcon" />
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
 
export default Preview;