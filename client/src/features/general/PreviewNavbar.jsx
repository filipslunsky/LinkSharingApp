// import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setStatusMessage } from "../links/state/slice.js";
import './previewNavbar.css';

const PreviewNavbar = () => {
    const dispatch = useDispatch();

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;
    const user = useSelector(state => state.user.user);
    // const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${BASE_URL}/share/${user.hashId}`);
            // setCopied(true);
            // setTimeout(() => setCopied(false), 2000);
            dispatch(setStatusMessage({ text: "Copied to the clipboard.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    return (
        <>
            <div className="previewNavbarBackContainer">
                <div className="previewNavbarMainContainer">
                    <Link className="previewNavbarLink" to={'/links'}>Back to Editor</Link>
                    <button className="previewNavbarButton" onClick={handleCopy}>Share Link</button>
                </div>
            </div>
            
        </>
    );
}
 
export default PreviewNavbar;