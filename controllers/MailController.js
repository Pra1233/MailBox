const Mail = require("../models/MailModel");
const SentMail = require("../models/SentMail.Modal");

const postMail = async (req, res) => {
  const { email, subject, message, sender } = req.body;
  try {
    const response = await Mail.create({ email, subject, message, sender });
    await SentMail.create({ email, subject, message, sender });
    res.status(201).json({ success: true, message: response });
  } catch (e) {
    console.log(e);
  }
};

const getInbox = async (req, res) => {
  try {
    const response = await Mail.findAll({
      where: { email: req.user.email },
      order: [["read", "ASC"]],
    });

    const unReadEmail = response.filter((e) => e.read === false);
    res.status(200).json({ data: response, count: unReadEmail.length });
  } catch (e) {
    console.log(e);
  }
};
const deleteInboxMail = async (req, res) => {
  try {
    const deletedRecord = await Mail.destroy({ where: { id: req.params.id } });
    if (deletedRecord === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    const user = await Mail.findAll({ where: { email: req.user.email } });
    res
      .status(200)
      .json({ message: "Record deleted successfully", data: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSentMail = async (req, res) => {
  const senderEmail = req.user.email;
  try {
    const response = await SentMail.findAll({ where: { sender: senderEmail } });
    res.status(200).json({ data: response });
  } catch (e) {
    console.log(e);
  }
};

const deleteSentMail = async (req, res) => {
  try {
    const deletedRecord = await SentMail.destroy({
      where: { id: req.params.id },
    });

    const user = await SentMail.findAll({ where: { sender: req.user.email } }); //updated mail

    if (deletedRecord === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Record deleted successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const readInboxMail = async (req, res) => {
  try {
    const id = req.params.id;
    const mail = await Mail.findByPk(id);
    // console.log("mail", mail);
    if (!mail) {
      return res.status(404).json({ message: "Record not found" });
    }
    mail.read = true;

    await mail.save();

    const allMail = await Mail.findAll({
      where: { email: req.user.email },
      order: [["read", "ASC"]],
    });
    const unReadMail = allMail.filter((email) => email.read === false);

    return res.status(200).json({
      message: "Record updated successfully",
      updatedRecord: mail,
      count: unReadMail.length,
      allMail: allMail,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postMail,
  getInbox,
  getSentMail,
  deleteSentMail,
  deleteInboxMail,
  readInboxMail,
};
