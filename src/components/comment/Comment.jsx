import React, { useState } from "react";
import { Upvote } from "../upvote/Upvote";
import { ReactComponent as Reply } from "../../images/icon-reply.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import { ReactComponent as Edit } from "../../images/icon-edit.svg";
import data from "../../data.json";
import SmallBtn from "../smallBtn/SmallBtn";
import { useGlobalContext } from "../../context";
import Modal from "../modal/Modal";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "./comment.css";

TimeAgo.addDefaultLocale(en);

const Comment = ({ comment, reply, deleteCmnt, update, replying }) => {
    const timeAgo = new TimeAgo("en-US");
    const name = comment.user.username;
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(comment.content);
    const [isGonnaDelete, setIsGonnaDelete] = useState(false);
    const { setComments } = useGlobalContext();

    const updateMain = () => {
        setComments(comments =>
            comments.map(data => {
                if (data.id !== comment.id) return data;
                data.content = tempText;
                return data;
            })
        );
        setIsEditing(false);
    };
    return (
        <article className="comment">
            {isGonnaDelete && (
                <Modal
                    handler={() => {
                        deleteCmnt(comment.id);
                        setIsGonnaDelete(false);
                    }}
                    setState={setIsGonnaDelete}
                />
            )}
            <Upvote count={comment.score} />
            <div className="comment__body">
                <header className="comment__header">
                    <img src={require("../../images/avatars/index")[name]} alt="avatar" className="avatar" />
                    <h2>
                        {name} {name === data.currentUser.username && <span>you</span>}
                    </h2>
                    <h3>{typeof comment.createdAt === "string" ? comment.createdAt : timeAgo.format(comment.createdAt)}</h3>
                    <div className="btns">
                        {name === data.currentUser.username ? (
                            <>
                                <SmallBtn handler={() => setIsGonnaDelete(true)} text="Delete" Icon={Delete} danger />
                                <SmallBtn handler={() => setIsEditing(true)} text="Edit" Icon={Edit} />
                            </>
                        ) : (
                            <SmallBtn handler={() => reply(comment.user.username)} text="Reply" Icon={Reply} />
                        )}
                    </div>
                </header>
                {isEditing ? (
                    <div className="update">
                        <textarea value={tempText} onChange={e => setTempText(e.target.value)} />
                        <button
                            onClick={() => {
                                if (replying) {
                                    update(tempText, comment.id);
                                    setIsEditing(false);
                                } else {
                                    updateMain();
                                }
                            }}
                        >
                            update
                        </button>
                    </div>
                ) : (
                    <p>
                        {comment.replyingTo && <span>{"@" + comment.replyingTo + " "}</span>}
                        {comment.content}
                    </p>
                )}
            </div>
        </article>
    );
};

export default Comment;
