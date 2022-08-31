import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
    // Variable
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    // Method


    useEffect(() => {
        dbServiece.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(nweetArray)
            setNweets(nweetArray)
            console.log(nweets)
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
                {nweets.map((n) => (
                    <div key={n.id}>
                        <h4>{n.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Home;
