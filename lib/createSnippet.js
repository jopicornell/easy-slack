const Slack = require('slack-node');

module.exports = (channels, title, content) => new Promise((reject, resolve) => {
  const slack = new Slack(process.env.slack_token);
  slack.api('files.upload', {
    content,
    title,
    channels,
    filename: title,
  }, (err, res) => {
    if (err) {
      return reject(err);
    }
    return resolve(res);
  });
});
