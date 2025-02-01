import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getLinks } from './state/slice.js';

const LinkList = () => {
    const dispatch = useDispatch();

    const links = useSelector(state => state.links.links);

    useEffect(() => {
        dispatch(getLinks());
    }, []);

    useEffect(() => {
        console.log(links);
    }, [links]);

    return (
        <>
            <div className="linkListMainContainer">
                <div className="linkListHeaderContainer">
                    <h2 className="linkListHeader">Customize your links</h2>
                    <p className="linkListDescription">Add/edit/remove links below and then share all your profiles with the world!</p>
                </div>
            </div>
        </>
    );
}
 
export default LinkList;