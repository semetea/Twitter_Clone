import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Modal from "components/Modal";

const Auth = () => {
  const [modalClick, setModlaClick] = useState(false);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  const onModalClick = () => {
    setModlaClick(true);
  };

  return (
    <>
      <div className="flex">
        <div className="w-3/5 bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')] justify-center items-center w-full h-full flex">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="max-h-300px fill-white"
            width="20vw"
            height="85vh"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>

        <div className="w-2/5">
          <div className="my-44">
            <div className="flex flex-col">
              <div className="h-1/10">
                <FontAwesomeIcon
                  icon={faTwitter}
                  color={"#04AAFF"}
                  size="3x"
                  style={{ marginBottom: 30 }}
                />
              </div>
              <div className="h-3/10 my-5 font-bold text-center">
                <span className="text-4xl">Happening now</span>
              </div>
              <div className="h-1/10 my-5 ">
                <span className="font-bold text-2xl">Join Twitter today.</span>
              </div>
              <div>
                <div>
                  <div>
                    <button
                      onClick={onSocialClick}
                      name="google"
                      className="border rounded-2xl border-gray-400 w-full text-xl font-semibold"
                    >
                      Continue with Google <FontAwesomeIcon icon={faGoogle} />
                    </button>
                  </div>
                  <div>
                    <button onClick={onSocialClick} name="github">
                      Continue with Github <FontAwesomeIcon icon={faGithub} />
                    </button>
                  </div>
                  <div className="flex flex-row">
                    <div className="justify-center">
                      <div className="h-px bg-gray-300"></div>
                    </div>
                    <div>
                      <span>or</span>
                    </div>
                    <div className="justify-center">
                      <div className="h-px bg-gray-300"></div>
                    </div>
                  </div>
                  <div>
                    <button onClick={onModalClick}>
                      Sign up with phone or email
                    </button>
                  </div>
                </div>
                {modalClick && <Modal closeModal={setModlaClick} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
