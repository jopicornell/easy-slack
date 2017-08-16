 const Slack = require('slack-node');

module.exports = (channel, options) => new Promise((resolve, reject) => {
  const slack = new Slack();
  options.channel = channel;
  slack.setWebhook(process.env.slack_webhook);
  slack.webhook(options, (err, response) => {
    if (err) {
      return reject(err);
    }
    return resolve(response);
  });
});
