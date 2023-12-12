import React, { useState, useRef } from "react";
import classes from "./MailBox.module.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const Mailbox = () => {
  const email = useRef();
  const subject = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const updateEditorState = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const content = editorState.getCurrentContent().getPlainText();

  const sendMessageHandler = () => {
    const emailInput = email.current.value;
    const subjectInput = subject.current.value;

    const obj = {
      email: emailInput,
      subject: subjectInput,
      message: content,
      sender: localStorage.getItem("email"),
    };
    postMail(obj);
  };

  const postMail = async (obj) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:4000/message/postmail",
        obj,
        {
          headers: { Authorization: token },
        }
      );

      console.log("postmail", res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={classes.outside}>
        <div className={classes.subject}>
          <input
            type="text"
            placeholder="Enter sender email"
            required
            ref={email}
          ></input>
          <input
            type="text"
            placeholder="Enter subject"
            required
            ref={subject}
          ></input>
        </div>
        <div className={classes.container}>
          <Editor
            editorState={editorState}
            onEditorStateChange={updateEditorState}
          />
        </div>
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </>
  );
};

export default Mailbox;
