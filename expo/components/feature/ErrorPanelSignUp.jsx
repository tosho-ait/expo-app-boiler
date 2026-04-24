import React from 'react';
import ErrorPanelText from "../panels/ErrorPanelText";


function ErrorPanelSignIn({error}) {

    if (error) {

        let message = "Something went wrong.";

        if (error.errors?.at(0)?.longMessage) {
            message = error.errors?.at(0)?.longMessage;

        } else if (error.errors?.at(0)?.message) {
            message = error.errors?.at(0)?.message;
        }

        if (error.code === "network_error") {
            message = "You need an internet connection to sign up.";
        }

        if (error.message) {
            message = error.message;
        }

        if (message.startsWith("Enter password")) {
            message = "Password is required.";
        }

        if (message.startsWith("Enter email")) {
            message = "Email is required.";
        }

        if (message.startsWith("Email address must be ")) {
            message = "Please enter a valid email address.";
        }

        if (message.startsWith("Enter code")) {
            message = "Verification code is required.";
        }

        if (message.startsWith("Incorrect code")) {
            message = "Incorrect verification code.";
        }

        if (message.startsWith("Password is incorrect")) {
            message = "Password is incorrect.";
        }

        return <ErrorPanelText key="1" error={message}/>

    }
    return null;
}

export default ErrorPanelSignIn;
