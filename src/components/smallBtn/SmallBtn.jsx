import React from "react";
import "./smallBtn.css";

const SmallBtn = ({ handler, Icon, text, danger }) => {
    return (
        <>
            <button onClick={() => handler()} className={danger ? "smallBtn danger" : "smallBtn"}>
                <Icon />
                {text}
            </button>
        </>
    );
};

export default SmallBtn;
