import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import data from "../../data.json";
import "./reply.css";

const Reply = ({ replying, reply }) => {
    const [msg, setMsg] = useState("");
    const { setComments } = useGlobalContext();
    const inputRef = useRef();

    useEffect(() => {
        if (replying) setMsg(`@${replying} `);
        inputRef.current.focus();
    }, [replying]);

    const send = () => {
        if (msg) {
            if (replying) reply(msg, replying);
            else
                setComments(comments => [
                    ...comments,
                    {
                        id: comments.at(-1).id + 1,
                        content: msg,
                        createdAt: new Date(),
                        score: 0,
                        user: { ...data.currentUser },
                        replies: [],
                    },
                ]);
            setMsg("");
        }
    };
    return (
        <footer className="reply">
            <img src={require("../../images/avatars/index")[data.currentUser.username]} alt="" />
            <textarea placeholder="Add a comment..." value={msg} onChange={e => setMsg(e.target.value)} ref={inputRef} />
            <button onClick={send}>{replying ? "Reply" : "Send"}</button>
        </footer>
    );
};

export default Reply;
