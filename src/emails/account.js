const SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SEND_IN_BLUE_API_KEY;

const welcomeMsg = (username, email) => {
  const mail = new SibApiV3Sdk.TransactionalEmailsApi();
  const msg = {
    subject: `Welcome ${username} !!`,
    sender: {
      email: "alasadnurriyad3@gmail.com",
      name: "Task Manager Admin",
    },
    replyTo: {
      email: "alasadnurriyad3@gmail.com",
      name: "Task Manager",
    },
    to: [
      {
        name: username,
        email: email,
      },
    ],
    htmlContent:
      "<html><body><h3>Hi {{params.name}} Welcome to Task Manager APP</h3></body></html>",
    params: {
      name: username,
    },
  };
  mail.sendTransacEmail(msg);
};

const deleteMsg = (username, email) => {
  const mail = new SibApiV3Sdk.TransactionalEmailsApi();
  const msg = {
    subject: `GoodBye ${username} !!`,
    sender: {
      email: "alasadnurriyad3@gmail.com",
      name: "Task Manager Admin",
    },
    replyTo: {
      email: "alasadnurriyad3@gmail.com",
      name: "Task Manager",
    },
    to: [
      {
        name: username,
        email: email,
      },
    ],
    htmlContent:
      "<html><body><h3>Good bye {{params.name}}, See you soon !! </h3></body></html>",
    params: {
      name: username,
    },
  };
  mail.sendTransacEmail(msg);
};

module.exports = {
  deleteMsg,
  welcomeMsg,
};
