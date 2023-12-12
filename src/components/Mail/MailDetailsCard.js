// MailDetailsCard.js
import React from "react";
import classes from "./Sent.module.css"; // Import your CSS module

const MailDetailsCard = ({ data }) => {
  return (
    <div className={classes.card}>
      <h2>{data.subject}</h2>
      <div className={classes.details}>
        <p className={classes.label}>
          <strong>To:</strong>
        </p>
        <p className={classes.value}>{data.email}</p>
      </div>
      <div className={classes.details}>
        <p className={classes.label}>
          <strong>Message:</strong>
        </p>
        <p className={classes.value}>{data.message}</p>
      </div>
    </div>
  );
};

export default MailDetailsCard;
