import Nweet from "components/Nweet";
import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
    // Variable
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState()

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

    const onFileChange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: {result} } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment(null)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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
