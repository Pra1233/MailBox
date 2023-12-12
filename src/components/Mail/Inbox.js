import axios from "axios";
import classes from "./Sent.module.css";
import { mailAction } from "../../store/mail";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import InboxDetailsCard from "./InboxDetailCard";

const Inbox = () => {
  const dispatch = useDispatch();

  const inboxMail = useSelector((state) => state.mail.inbox);

  const [selectedMail, setSelectedMail] = useState(null);

  const sentDataHandler = async (data) => {
    setSelectedMail(data); //single selected mail
    readMailHandler(data.id);
  };

  const readMailHandler = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:4000/message/readInboxMail/${id}`,
        null,
        {
          headers: { Authorization: token },
        }
      );

      const countUnreadMail = res.data.count;
      const allMail = res.data.allMail;
      dispatch(mailAction.countUnreadMail(countUnreadMail));
      dispatch(mailAction.inbox(allMail));
      console.log(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteInboxData = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:4000/message/deleteInboxMail/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log("deleteSentMessage", res.data.data);
      dispatch(mailAction.inbox(res.data.data)); //updated mail sent to store
      if (selectedMail.id === id) setSelectedMail(null);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th></th>
            <th>Subject</th>
            <th>Message</th>
            <th>From</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inboxMail &&
            inboxMail.map((e) => (
              <tr key={e.id}>
                <td className={!e.read ? classes.notread : classes.read}></td>
                <td onClick={() => sentDataHandler(e)} className={classes.td}>
                  {e.subject}
                </td>
                <td>{e.message}</td>
                <td>{e.sender}</td>
                <td>
                  <button onClick={() => deleteInboxData(e.id)}>X</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedMail && <InboxDetailsCard data={selectedMail} />}
    </div>
  );
};

export default Inbox;
