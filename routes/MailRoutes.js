const MailController = require("../controllers/MailController");
const userAuthentication = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/postmail", userAuthentication.auth, MailController.postMail);

router.get("/getInbox", userAuthentication.auth, MailController.getInbox);

router.get(
  "/getSentMessage",
  userAuthentication.auth,
  MailController.getSentMail
);

router.delete(
  "/deleteSentMail/:id",
  userAuthentication.auth,
  MailController.deleteSentMail
);

router.delete(
  "/deleteInboxMail/:id",
  userAuthentication.auth,
  MailController.deleteInboxMail
);

// Reading
router.patch(
  "/readInboxMail/:id",
  userAuthentication.auth,
  MailController.readInboxMail
);
module.exports = router;
