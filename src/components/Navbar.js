import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App'

const Navbar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext) // eslint-disable-line
    const renderlist = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                    <button className="btn #000000 black"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/signin')
                        }}
                    >
                        Logout
                    </button>
                </li>
            ]
        }
        else {
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderlist()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar