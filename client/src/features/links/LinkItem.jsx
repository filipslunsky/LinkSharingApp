import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateLink, deleteLink } from './state/slice.js';
import dragNDropIcon from '../../assets/img/icon-drag-and-drop.svg';
import './linkItem.css';

const LinkItem = ({display_order, title, url, index}) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    const urlRef = useRef();
    const platformRef = useRef();

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: display_order });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    };

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
            <div className={`linkItemMainContainer ${isDragging ? 'dragging' : ''}`} ref={setNodeRef} {...attributes} style={style}>
                <div className="linkItemHeaderContainer">
                    <div className="linkItemHeaderLeftContainer">
                        <img className='linkItemDragNDropImage' src={dragNDropIcon} alt="drag and drop" {...listeners}/>
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