import { useState, useEffect, FC } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import initFirebase from "src/auth/initFirebase";

initFirebase();

const firebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
};

const FirebaseAuth: FC = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <div className="mt-16">
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
      <style>
        {`
          .mdl-card {
            background-color: #e8dbc9;
          }
          .progressbar {
            background-color: #D9C3A8 !important;
        }
        
        .mdl-button--raised.mdl-button--colored {
            background-color: #D9C3A8 !important;
            color: black;
        }
        
        .mdl-button.mdl-js-button.mdl-button--primary {
            color: #D9C3A8 !important;
        }
        
        .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
          background-color: black !important;
      }
        
        a.firebaseui-link {
            color: black !important;
        }
        
        .progressbar {
            background-color: black !important;
        }
        
        .bufferbar {
            background-image: none !important;
            background-color: #D9C3A8
        }
        
        .auxbar {
            background-image: none !important;
            background-color: #D9C3A8 !important;
        }
        `}
      </style>
    </div>
  );
};

export default FirebaseAuth;
