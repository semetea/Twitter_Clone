import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbServiece } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  // Variable
  const [nweets, setNweets] = useState([]);

  // Method

  useEffect(() => {
    dbServiece.collection("nweets").onSnapshot((snapshot) => {
      // snapshot
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
