// import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './previewNavbar.css';

const PreviewNavbar = () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}`;
    const user = useSelector(state => state.user.user);
    // const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${BASE_URL}/share/${user.hashId}`);
            // setCopied(true);
            // setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    return (
        <>
            <div className="previewNavbarBackContainer">
                <div className="previewNavbarMainContainer">
                    <Link className="previewNavbarLink" to={'/links'}>Back to Editor</Link>
                    <button className="previewNavbarButton" onClick={handleCopy}>Share</button>
                </div>
            </div>
            
        </>
    );
}
 
export default PreviewNavbar;