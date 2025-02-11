import appLogoLarge from '../../assets/img/logo-devlinks-large.svg';
import appLogoSmall from '../../assets/img/logo-devlinks-small.svg';
import './logo.css';

const Logo = () => {
    return (
        <>
            <div className="logoMainContainer">
                <img className='logoImageLarge' src={appLogoLarge} alt='app logo' />
                <img className='logoImageSmall' src={appLogoSmall} alt='app logo' />
            </div>
        </>
    );
}
 
export default Logo;