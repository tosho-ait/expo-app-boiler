import React from "react";
import InputStringCenteredNB from "@/components/input/InputStringCenteredNB";


const InputDateDisplay = ({note, setNote, readOnly}) => {

    return (
        <InputStringCenteredNB
            label="Note"
            value={note}
            onChange={setNote}
            readOnly={readOnly}
        />
    );
};

export default InputDateDisplay;