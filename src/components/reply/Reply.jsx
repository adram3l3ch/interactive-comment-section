import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import data from "../../data.json";
import "./reply.css";

const Reply = ({ cid, mention }) => {
    const [msg, setMsg] = useState("");
    const { setComments, reply } = useGlobalContext();
    const inputRef = useRef();

    useEffect(() => {
        if (cid) setMsg(`@${mention} `);
        inputRef.current.focus();
    }, [cid, mention]);

    const send = () => {
        if (msg) {
            if (cid) reply(msg, cid, mention);
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
            <img src={require("../../images/avatars/index")[data.currentUser.username]} alt="avatar" />
            <textarea placeholder="Add a comment..." value={msg} onChange={e => setMsg(e.target.value)} ref={inputRef} />
            <button onClick={send}>{cid ? "Reply" : "Send"}</button>
        </footer>
    );
};

export default Reply;
