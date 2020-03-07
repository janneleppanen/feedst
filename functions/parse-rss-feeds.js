const md5 = require("md5");
let Parser = require("rss-parser");
let parser = new Parser();

exports.handler = async event => {
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

  rssData.id = md5(rssData.link);
  rssData.items = rssData.items.map(feedItem => ({
    ...feedItem,
    id: md5(`${rssData.link}-${feedItem.link}`)
  }));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rssData)
  };
};
