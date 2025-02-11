import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getLinks, updateLinks, resetCurrentLinks, addNewLink, updateLinksOrder, setStatusMessage, resetUpdateLinksStatus } from './state/slice.js';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LinkItem from './LinkItem.jsx';
import StatusMessage from './StatusMessage.jsx';
import MobileView from '../general/MobileView.jsx';
import './linkList.css';

const LinkList = () => {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.currentLinks);
    const linksStatus = useSelector(state => state.links.linksStatus);
    const user = useSelector(state => state.user.user);
    const updateLinksStatus = useSelector(state => state.links.updateLinksStatus);
    const statusMessage = useSelector(state => state.links.statusMessage);

    const [orderedLinks, setOrderedLinks] = useState([]);

    useEffect(() => {
        dispatch(getLinks());
    }, [updateLinksStatus]);

    useEffect(() => {
        setOrderedLinks([...links]);
    }, [links]);

    const handleAddNew = () => {
        const newLink = {
            display_order: links.length + 1,
            title: '',
            url: '',
            user_id: user.userId,
        };
        dispatch(addNewLink(newLink));
    };

    const handleSave = () => {
        dispatch(updateLinks({links}));
    };

    const handleCancel = () => {
        dispatch(resetCurrentLinks());
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = orderedLinks.findIndex((link) => link.display_order === active.id);
        const newIndex = orderedLinks.findIndex((link) => link.display_order === over.id);
        const newOrder = arrayMove(orderedLinks, oldIndex, newIndex);

        dispatch(updateLinksOrder(newOrder));
        setOrderedLinks([...newOrder]);
    };

    useEffect(()=> {
            if (updateLinksStatus === 'success') {
                dispatch(setStatusMessage({ text: "Links saved successfully!", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateLinksStatus());
            } else if (updateLinksStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to save links. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateLinksStatus());
            }
        }, [updateLinksStatus]);

    if (linksStatus === 'loading') {
        return (
            <div className="statusMessage">Loading...</div>
        );
    };
    
    if (linksStatus === 'failed') {
        return (
            <div className="statusMessage">Ooops, something went wrong, please try again later...</div>
        );
    };
    
    return (
        <>
            {statusMessage.visible && <StatusMessage text={statusMessage.text} style={statusMessage.style} />}
            <div className="editLinksAndUserContainerLinks">
                <MobileView />
                <div className="linkListMainContainer">
                    <div className="linkListHeaderContainer">
                        <h2 className="linkListHeader">Customize your links</h2>
                        <p className="linkListDescription">Add/edit/remove links below and then share all your profiles with the world!</p>
                        <button className="linkListAddButton" onClick={handleAddNew}>+ Add new link</button>
                    </div>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={orderedLinks.map(link => link.display_order)} strategy={verticalListSortingStrategy}>
                            <div className="linkListItemsContainer">
                                {orderedLinks.map((item, index) => (
                                    <LinkItem
                                        key={item.display_order}
                                        id={item.display_order}
                                        display_order={item.display_order}
                                        url={item.url}
                                        title={item.title}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                    <div className="linkListSpacer"></div>
                    <div className="linkListControlsContainer">
                        <button className="linkListCancelButton" onClick={handleCancel}>Cancel</button>
                        <button className="linkListSaveButton" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default LinkList;