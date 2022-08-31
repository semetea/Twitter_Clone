import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react"

const Home = () => {
    // Variable
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    // Method
    const getNweets = async () => {
        const dbNweets = await dbServiece.collection("nweets").get();
        dbNweets.forEach(document => console.log(document.data))
        console.log(dbNweets)
    }

    useEffect(() => {
        getNweets();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbServiece.collection("nweets").add({
            nweet,
            createdAt: Date.now()
        })
        setNweet("");
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setNweet(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    )
};
export default Home;
