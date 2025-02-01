import dragNDropIcon from '../../assets/img/icon-drag-and-drop.svg';

const LinkItem = ({display_order, link_id, title, url}) => {
    return (
        <>
            <div className="linkItemMainContainer">
                <div className="linkItemHeaderContainer">
                    <div className="linkItemHeaderLeftContainer">
                        <img className='linkItemDragNDropImage' src={dragNDropIcon} alt="drag and drop" />
                        <span className="linkItemTitle">Link #{display_order}</span>
                    </div>
                    <button className='linkItemRemoveButton'>Remove</button>
                </div>
                <div className="linkItemBodyContainer">
                    <div className="linkItemInputContainer">
                        <span className="linkItemInputLable">Platform</span>
                        <select defaultValue={title} name="platform" className="linkItemInputField">
                            <option value="">select platform</option>
                            <option value="Facebook">Facebook</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="YouTube">YouTube</option>
                        </select>
                    </div>
                    <div className="linkItemInputContainer">
                        <span className="linkItemInputLable">Link</span>
                        <input name='url' defaultValue={url} type="text"className="linkItemInputField" />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default LinkItem;