import React from "react";
import InputStringCenteredNB from "@/components/input/InputStringCenteredNB";
import { useT } from "@/i18n";


const InputDateDisplay = ({note, setNote, readOnly}) => {

    const { t } = useT();

    return (
        <InputStringCenteredNB
            label={t("todoEdit.noteField")}
            value={note}
            onChange={setNote}
            readOnly={readOnly}
        />
    );
};

export default InputDateDisplay;
