import { useSelector } from "react-redux";
import classes from "./Sent.module.css";
import MailDetailsCard from "./MailDetailsCard";
import { useState } from "react";
import axios from "axios";
import { mailAction } from "../../store/mail";
import { useDispatch } from "react-redux";

const Sent = () => {
  const sentData = useSelector((state) => state.mail.sent);
  console.log(sentData.map((e) => console.log(e, "1")));
  const [selectedMail, setSelectedMail] = useState(null);
  const dispatch = useDispatch();

  const sentDataHandler = (data) => {
    setSelectedMail(data); //single mail
  };

  const deleteSentData = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:4000/message/deleteSentMail/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log("deleteSentMessage", res.data.data);
      dispatch(mailAction.sent(res.data.data)); //updated mail sent to store
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
            <th>To</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sentData &&
            sentData.map((e) => (
              <tr key={e.id}>
                <td onClick={() => sentDataHandler(e)} className={classes.td}>
                  {e.email}
                </td>
                <td>{e.subject}</td>
                <td>{e.message}</td>
                <td>
                  <button onClick={() => deleteSentData(e.id)}>x</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedMail && <MailDetailsCard data={selectedMail} />}
    </div>
  );
};

export default Sent;
