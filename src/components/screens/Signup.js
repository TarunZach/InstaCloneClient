import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Name"
                />
                <input
                    type="text"
                    placeholder="Email"
                />
                <input
                    type="text"
                    placeholder="Password"
                />

                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Signup
                </button>

                <h6>
                    <Link to='/signin'>Already have an account?</Link>
                </h6>

            </div>
        </div>
    )
}

export default Signup