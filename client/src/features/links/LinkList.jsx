import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getLinks, updateLinks, resetCurrentLinks, addNewLink } from './state/slice.js';
import LinkItem from './LinkItem.jsx';

const LinkList = () => {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.currentLinks);
    const linksStatus = useSelector(state => state.links.linksStatus);
    const user = useSelector(state => state.user.user);
    const updateLinksStatus = useSelector(state => state.links.updateLinksStatus);

    useEffect(() => {
        dispatch(getLinks());
    }, [updateLinksStatus]);

    useEffect(() => {
        console.log(links);
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

    if (linksStatus === 'loading') {
        return (
            <div className="statusMessage">Loading...</div>
        );
    };
    
    if (linksStatus === 'failed') {
        return (
            <div className="statusMessage">Ooops, somethin went wrong, please try again later...</div>
        );
    };
    
    return (
        <>
            <div className="linkListMainContainer">
                <div className="linkListHeaderContainer">
                    <h2 className="linkListHeader">Customize your links</h2>
                    <p className="linkListDescription">Add/edit/remove links below and then share all your profiles with the world!</p>
                    <button className="linkListAddButton" onClick={handleAddNew}>+ Add new link</button>
                </div>
                <div className="linkListItemsContainter">
                    {
                        links.map((item, index) => {
                            return (
                                <LinkItem
                                key={index}
                                display_order={item.display_order}
                                url={item.url}
                                title={item.title}
                                index={index}
                                />
                            )
                        })
                    }
                </div>
                <div className="linkListControlsContainer">
                    <button className="linkListCancelButton" onClick={handleCancel}>Cancel</button>
                    <button className="linkListSaveButton" onClick={handleSave}>Save</button>
                </div>
            </div>
        </>
    );
}
 
export default LinkList;