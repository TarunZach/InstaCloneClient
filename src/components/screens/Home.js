import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    console.log(state)
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    // const deleteComment = (postid) => {
    //     fetch(`/deletecomment/${postid}`, {
    //         method: "delete",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             const newData = data.filter(item => {
    //                 return item._id !== result._id
    //             })
    //             setData(newData)
    //         })
    // }

    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <div className="card-header">
                                <h5 className="username"><Link to={item.postedBy._id !== state.user._id?"/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link></h5>
                                {
                                    item.postedBy._id === state.user._id
                                    &&
                                    <i
                                        style={{
                                            float: "right",
                                            cursor: "grab"
                                        }}
                                        className="material-icons delete-icon"
                                        onClick={() => deletePost(item._id)}
                                    >
                                        delete
                                    </i>
                                }
                            </div>

                            <div className="card-image">
                                <img alt="homephotos"
                                    src={item.photo}
                                />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state.user._id)
                                    ?
                                    <i

                                        className="material-icons"
                                        onClick={() => { unlikePost(item._id) }}
                                        style={{
                                            color: "red",
                                            cursor: "grab"
                                        }}
                                    >
                                        favorite
                                    </i>
                                    :

                                    <i
                                        style={{ cursor: "grab" }}
                                        className="material-icons"
                                        onClick={() => { likePost(item._id) }}
                                    >
                                        favorite_border
                                    </i>
                                }

                                <h6>{item.likes.length} Likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                {/* {
                                    item.postedBy._id === state.user._id
                                    &&
                                    <i
                                        style={{
                                            float: "right",
                                            cursor: "grab"
                                        }}
                                        className="material-icons delete-icon"
                                        onClick={() => deleteComment(item._id)}
                                    >
                                        delete
                                    </i>
                                } */}
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="Add a Comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home