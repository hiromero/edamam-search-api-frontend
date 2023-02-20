import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";
import Header from "./Header";
import RecipeLists from "./RecipeLists";
import Tabs from "./trash/Tabs";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/login');
    }

    return (
        <section className="main">
            <Header />
            <RecipeLists />
            <span className="badge">
                <button onClick={signOut}>Sign Out</button>
            </span>
        </section>
    )
}
//joel@fligno.com

export default Home
