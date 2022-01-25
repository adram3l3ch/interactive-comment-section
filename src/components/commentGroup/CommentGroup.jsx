import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import Comment from "../comment/Comment";
import Reply from "../reply/Reply";
import "./commentGroup.css";
import data from "../../data.json";

const CommentGroup = ({ comment }) => {
    const [replying, setReplying] = useState(null);
    const { setComments } = useGlobalContext();
    const deleteReply = id => {
        setComments(data =>
            data.map(val => {
                if (val.id !== comment.id) return val;
                val.replies = val.replies.filter(reply => reply.id !== id);
                return val;
            })
        );
    };

    const deleteComment = id => {
        setComments(data => data.filter(val => val.id !== id));
    };

    const reply = (msg, replying) => {
        setComments(comments =>
            comments.map(val => {
                if (val.id !== comment.id) return val;
                val.replies = [
                    ...val.replies,
                    {
                        id: val.replies.at(-1)?.id + 1 || 0,
                        content: msg.startsWith("@") ? msg.split(" ").splice(1).join(" ") : msg,
                        createdAt: new Date(),
                        score: 0,
                        user: { ...data.currentUser },
                        replies: [],
                        replyingTo: replying,
                    },
                ];
                return val;
            })
        );
    };

    const update = (tempText, id) => {
        setComments(comments => {
            return comments.map(data => {
                if (data.id !== comment.id) return data;
                data.replies = data.replies.map(val => {
                    if (val.id !== id) return val;
                    val.content = tempText;
                    return val;
                });
                return data;
            });
        });
    };

    return (
        <article className="commentGroup">
            <Comment comment={comment} reply={setReplying} deleteCmnt={deleteComment} update={update} />
            {comment.replies.length || replying ? (
                <div className="replies">
                    <div className="line" />
                    <section className="replies__main">
                        {comment.replies.map(reply => (
                            <Comment comment={reply} reply={setReplying} deleteCmnt={deleteReply} update={update} replying key={reply.id} />
                        ))}
                        {replying && <Reply replying={replying} reply={reply} />}
                    </section>
                </div>
            ) : (
                ""
            )}
        </article>
    );
};

export default CommentGroup;
