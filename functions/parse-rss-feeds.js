let Parser = require("rss-parser");
let parser = new Parser();

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "No route found" })
    };
  }

  const parsedFeeds = {};
  const reqBody = JSON.parse(event.body);
  const feeds = reqBody.rssFeeds;

  for (feed of feeds) {
    parsedFeeds[feed] = await parser.parseURL(feed);
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parsedFeeds)
  };
};
