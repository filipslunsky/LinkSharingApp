import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getLinks, updateLinks, resetCurrentLinks } from './state/slice.js';
import LinkItem from './LinkItem.jsx';

const LinkList = () => {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.currentLinks);
    const linksStatus = useSelector(state => state.links.linksStatus);
    const updateLinksStatus = useSelector(state => state.links.updateLinksStatus);

    useEffect(() => {
        dispatch(getLinks());
    }, []);

    useEffect(() => {
        console.log(links);
    }, [links]);

    const handleSave = () => {
        dispatch(updateLinks(links));
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
                    <button className="linkListAddButton">+ Add new link</button>
                </div>
                {
                    links.map(item => {
                        return (
                            <LinkItem
                            key={item.link_id}
                            display_order={item.display_order}
                            link_id={item.link_id}
                            url={item.url}
                            title={item.title}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}
 
export default LinkList;