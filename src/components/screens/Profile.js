import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Profile = () => {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext) //eslint-disable-line
    console.log(state)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
                        alt="profiletest"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"Loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>  
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" alt={item.title} src={item.photo} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile