import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [userprofile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext) //eslint-disable-line
    const { userid } = useParams()

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setProfile(result)
            })
    }, []) //eslint-disable-line
    return (
        <>
        {userprofile ? 
                <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
                                alt="profiletest"
                            />
                        </div>
                        <div>
                            <h4>{userprofile.user.name}</h4>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{userprofile.posts.length} Posts</h6>
                                <h6>40 Followers</h6>
                                <h6>40 Following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userprofile.posts.map(item => {
                                return (
                                    <img key={item._id} className="item" alt={item.title} src={item.photo} />
                                )
                            })
                        }
                    </div>
                </div>
        
        : <h2>Loading...</h2>}
        </>
    )
}

export default UserProfile