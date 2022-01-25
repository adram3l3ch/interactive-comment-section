import React, { useState } from "react";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import "./upvote.css";

export const Upvote = ({ count }) => {
    const [state, setState] = useState(count);
    return (
        <div className="upvote">
            <button onClick={() => setState(state + 1)}>
                <Plus />
            </button>
            <h3>{state}</h3>
            <button onClick={() => setState(state - 1)}>
                <Minus />
            </button>
        </div>
    );
};
