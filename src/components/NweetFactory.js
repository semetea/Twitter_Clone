import { dbServiece, storageService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbServiece.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  useEffect(() => {
    console.log(userObj);
  }, []);

  return (
    <form onSubmit={onSubmit} className="border p-5 flex flex-col">
      <div className="mb-5">
        <span className="text-sm">Home</span>
      </div>
      <div className="flex my-3">
        <div className="w-1/5">
          <span>{userObj.displayName}</span>
        </div>
        <div className="w-4/5">
          <input
            className="p-3 w-full"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <label htmlFor="attach-file" className="cursor-pointer">
            <FontAwesomeIcon icon={faImage} className="fa-2x" />
            <input
              id="attach-file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="w-0"
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="rounded-2xl bg-sky-400 p-1 hover:bg-sky-700"
          >
            <span className="text-white">Send</span>
          </button>
        </div>
      </div>

      {attachment && (
        <div className="mt-3">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div
            className="mt-3 grid justify-items-end"
            onClick={onClearAttachment}
          >
            <button className="rounded-xl p-1 bg-red-300 hover:bg-red-600">
              Remove
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
