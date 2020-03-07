interface GlobalState {
  searchTerm: string;
  feeds: FeedList;
}

type FeedList = Feed[];

interface Feed {
  id: string;
  url: string;
  data?: FeedData;
  status: FeedStatus;
}

type FeedStatus = "loading" | "ready";

interface FeedData {
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
