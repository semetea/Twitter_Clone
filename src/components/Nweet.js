import { dbServiece, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbServiece.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.ref(nweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbServiece.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div className="">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={newNweet}
              type="text"
              placeholder="Edit your nweet"
              required
              onChange={onChange}
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <div className="border p-5 flex justify-between">
            <div>
              <h4>{nweetObj.text}</h4>
            </div>
            <div>
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            </div>
            {isOwner && (
              <div>
                <span onClick={toggleEditing} className="mx-1">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <span onClick={onDeleteClick} className="mx-1">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Nweet;
