import './statusMessage.css';

const StatusMessage = ({text, style}) => {

    return (
        <>
        <div className="statusMessageMainContainer">
            <span className='statusMessageText'>{text}</span>
        </div>
        </>
    );
}
 
export default StatusMessage;