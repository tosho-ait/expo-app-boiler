import React from 'react';
import ErrorPanelText from "../panels/ErrorPanelText";
import { useT } from "@/i18n";


function ErrorPanelSignIn({error}) {

    const { t } = useT();

    if (error) {

        let message = t("errors.generic");

        if (error.errors?.at(0)?.longMessage) {
            message = error.errors?.at(0)?.longMessage;

        } else if (error.errors?.at(0)?.message) {
            message = error.errors?.at(0)?.message;
        }

        if (error.code === "network_error") {
            message = t("errors.network");
        }

        if (error.message) {
            message = error.message;
        }

        // Heuristic remap of Clerk's English error strings to localized variants.
        // Clerk doesn't ship i18n; we match on the English prefix and replace.
        if (message.startsWith("Enter password")) {
            message = t("errors.passwordRequired");
        }

        if (message.startsWith("Enter email")) {
            message = t("errors.emailRequired");
        }

        if (message.startsWith("Email address must be ")) {
            message = t("errors.emailInvalid");
        }

        if (message.startsWith("Enter code")) {
            message = t("errors.codeRequired");
        }

        if (message.startsWith("Incorrect code")) {
            message = t("errors.codeIncorrect");
        }

        if (message.startsWith("Password is incorrect")) {
            message = t("errors.passwordIncorrect");
        }

        return <ErrorPanelText key="1" error={message}/>

    }
    return null;
}

export default ErrorPanelSignIn;
