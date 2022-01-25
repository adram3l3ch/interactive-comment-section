import React from "react";
import "./modal.css";

const Modal = ({ handler, setState }) => {
    return (
        <div className="modal">
            <div className="box">
                <h2>Delete Comment</h2>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                <div className="btns">
                    <button onClick={() => setState(false)}>No, Cancel</button>
                    <button onClick={handler}>Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
