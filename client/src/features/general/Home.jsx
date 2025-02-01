import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate();

    const loggedIn = useSelector(state => state.user.loggedIn);

    useEffect(() => {
        if (loggedIn) {
            navigate('/user');
            return;
        };
    }, [])


    return (
        <>  <div className="homeContainer">
                <h2 className="homeTitle">Welcome to DevLinks</h2>
                <p className="homeText">If you are new here, you can register and create your profile immediately, it is easy, it is fast and it is free.</p>
                <Link to={'/user/register'} className="homeLink">Create Account</Link>
                <p className="homeText">If you already have an account, you can log into it right away.</p>
                <Link to={'/user/login'} className="homeLink">Login to My Account</Link>
            </div>
        </>
    );
}
 
export default Home;