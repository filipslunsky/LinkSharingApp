import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSortable } from "@dnd-kit/sortable";
import { updateLink, deleteLink } from './state/slice.js';
import dragNDropIcon from '../../assets/img/icon-drag-and-drop.svg';
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
import './linkItem.css';

const LinkItem = ({display_order, title, url, index}) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    const urlRef = useRef();
    const platformRef = useRef();

    const { attributes, listeners, setNodeRef } = useSortable({ id: display_order });

    const handleUpdateLink = () => {
        const updatedLink = {
            ...links[index],
            title: platformRef.current.value,
            url: urlRef.current.value,
        };
        dispatch(updateLink({index, updatedLink}));
    };

    const handleDeleteLink = () => {
        dispatch(deleteLink({index}));
    };

    return (
        <>
            <div className="linkItemMainContainer" ref={setNodeRef} {...attributes} {...listeners}>
                <div className="linkItemHeaderContainer">
                    <div className="linkItemHeaderLeftContainer">
                        <img className='linkItemDragNDropImage' src={dragNDropIcon} alt="drag and drop" />
                        <span className="linkItemTitle">Link #{display_order}</span>
                    </div>
                    <button className='linkItemRemoveButton' onClick={handleDeleteLink}>Remove</button>
                </div>
                <div className="linkItemBodyContainer">
                    <div className="linkItemInputContainer">
                        <span className="linkItemInputLable">Platform</span>
                        <select
                        defaultValue={title}
                        ref={platformRef}
                        name="platform"
                        className="linkItemInputField"
                        onChange={handleUpdateLink}
                        >
                            <option value="">select platform</option>
                            <option value="Facebook">Facebook</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="YouTube">YouTube</option>
                            <option value="PortfolioWeb">Portfolio Web</option>
                        </select>
                    </div>
                    <div className="linkItemInputContainer">
                        <span className="linkItemInputLable">Link</span>
                        <input
                        name='url'
                        defaultValue={url}
                        ref={urlRef}
                        type="text"
                        className="linkItemInputField"
                        onChange={handleUpdateLink}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default LinkItem;