import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dragNDropIcon from '../../assets/img/icon-drag-and-drop.svg';
import { updateLink, deleteLink } from './state/slice.js';

const LinkItem = ({display_order, title, url, index}) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    const urlRef = useRef();
    const platformRef = useRef();

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
            <div className="linkItemMainContainer">
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
                            <option value="Portfolio Web">Portfolio Web</option>
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