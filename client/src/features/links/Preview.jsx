import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPublicInfo } from "../user/state/slice";
import nextIcon from '../../assets/img/icon-arrow-right.svg';

const Preview = () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;
    const { hashId } = useParams();
    const dispatch = useDispatch();

    const publicUser = useSelector(state => state.user.publicUser);
    const publicLinks = useSelector(state => state.user.publicLinks);
    const publicInfoStatus = useSelector(state => state.user.publicInfoStatus);

    useEffect(() => {
        dispatch(getPublicInfo(hashId));
    }, [dispatch]);

    useEffect(() => {
        console.log(publicUser);
        console.log(publicLinks);
    }, [publicInfoStatus]);

    if (publicInfoStatus !== 'success') {
        return (
            <h2 className="previewLoading">Loading...</h2>
        )
    }

    return (
        <>
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
                                <div className="previewLinkItem" key={item.display_order}>
                                    <img src="" alt="link icon" className="previewLinkIcon" />
                                    <span className="previewLinkItemName">{item.title}</span>
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