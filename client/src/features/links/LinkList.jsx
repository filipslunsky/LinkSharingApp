import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getLinks } from './state/slice.js';
import LinkItem from './LinkItem.jsx';

const LinkList = () => {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.links);
    const linksStatus = useSelector(state => state.links.linksStatus);

    useEffect(() => {
        dispatch(getLinks());
    }, []);

    useEffect(() => {
        console.log(links);
    }, [links]);

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