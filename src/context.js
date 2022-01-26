import { createContext, useContext, useState } from "react";
import data from "./data.json";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
    const [comments, setComments] = useState(data.comments);

    const deleteComment = (rid, cid) => {
        if (cid) {
            setComments(comments =>
                comments.map(comment => {
                    if (comment.id !== cid) return comment;
                    comment.replies = comment.replies.filter(reply => reply.id !== rid);
                    return comment;
                })
            );
        } else {
            setComments(comments => comments.filter(comment => comment.id !== rid));
        }
    };

    const updateComment = (tempText, rid, cid) => {
        if (cid) {
            setComments(comments => {
                return comments.map(comment => {
                    if (comment.id !== cid) return comment;
                    comment.replies = comment.replies.map(reply => {
                        if (reply.id !== rid) return reply;
                        reply.content = tempText;
                        return reply;
                    });
                    return comment;
                });
            });
        } else {
            setComments(comments =>
                comments.map(comment => {
                    if (comment.id !== rid) return comment;
                    comment.content = tempText;
                    return comment;
                })
            );
        }
    };

    const reply = (msg, replyingTo, uname) => {
        setComments(comments =>
            comments.map(val => {
                if (val.id !== replyingTo) return val;
                val.replies = [
                    ...val.replies,
                    {
                        id: val.replies.at(-1)?.id + 1 || 0,
                        content: msg.startsWith("@") ? msg.split(" ").splice(1).join(" ") : msg,
                        createdAt: new Date(),
                        score: 0,
                        user: { ...data.currentUser },
                        replies: [],
                        replyingTo: uname,
                    },
                ];
                return val;
            })
        );
    };

    return <AppContext.Provider value={{ comments, setComments, deleteComment, updateComment, reply }}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { ContextProvider, useGlobalContext };
