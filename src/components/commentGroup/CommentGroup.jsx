import React, { useState } from "react";
import Comment from "../comment/Comment";
import Reply from "../reply/Reply";
import "./commentGroup.css";

const CommentGroup = ({ comment }) => {
    const [replying, setReplying] = useState(false);
    const [mention, setMention] = useState(null);

    return (
        <section className="commentGroup">
            <h2 style={{ position: "absolute", left: "-99999999px" }}>comment group</h2>
            <Comment
                comment={comment}
                setReplying={setReplying}
                setMention={setMention}
            />
            {(comment.replies.length || replying) && (
                <div className="replies">
                    <div className="line" />
                    <section className="replies__main">
                        <h2 style={{ position: "absolute", left: "-99999999px" }}>
                            reply group
                        </h2>

                        {comment.replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replyingTo={comment.id}
                                setReplying={setReplying}
                                setMention={setMention}
                            />
                        ))}
                        {replying && <Reply cid={comment.id} mention={mention} />}
                    </section>
                </div>
            )}
        </section>
    );
};

export default CommentGroup;
