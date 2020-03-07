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

  const { rssUrl } = JSON.parse(event.body);
  const rssData = await parser.parseURL(rssUrl);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rssData)
  };
};
