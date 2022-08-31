import Nweet from "components/Nweet";
import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
    // Variable
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    // Method


    useEffect(() => {
        dbServiece.collection("nweets").onSnapshot(snapshot => {    // snapshot
            const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setNweets(nweetArray)
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbServiece.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("");
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setNweet(value);
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
};
export default Home;
