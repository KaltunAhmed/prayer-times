import React, { useState } from "react"
import { Input } from "./input";
import { Results } from "./results";
import styled from "styled-components";

const FormIcon = styled.div`
    font-size:2rem;    
`;
const Search = () => {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState("");

    return (
        <div>
            {/* <FormIcon>🏙️</FormIcon> */}
            <Input value={value} setValue={setValue} />
            {/* <Results results={["testing", "custom dropdown"]} setSelected={setSelected} /> */}
        </div>
    )
}

export default Search;