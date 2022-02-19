import React, { useState } from "react"
import { Input } from "./input";
import { Results } from "./results";

const Search = () => {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState("");

    return (
        <>
            <Input value={value} setValue={setValue}/>
            <Results results={["testing","custom dropdown"]} setSelected={setSelected}/>
        </>
    )
}

export default Search;