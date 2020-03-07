interface GlobalState {
  searchTerm: string;
  feeds: FeedStateList;
}

type FeedStateList = FeedState[];

interface FeedState {
  id: string;
  url: string;
  data?: Feed;
  status: FeedStatus;
}

type FeedStatus = "loading" | "ready";

interface Feed {
  title: string;
  description: string;
  image?: {
    url: string;
  };
  link: string;
  items: FeedItem[];
}

interface FeedItem {
  id: string;
  title: string;
  contentSnippet: string;
  content?: string;
  "content:encoded"?: string;
  link: string;
  pubDate: string;
  isoDate: string;
}
