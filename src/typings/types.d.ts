interface GlobalState {
  searchTerm: string;
  feeds: FeedList;
}

type FeedList = Feed[];

interface FeedData {
  id?: string;
  title?: string;
  description?: string;
  image?: {
    url: string;
  };
  link?: string;
  items: FeedItem[];
}

type FeedStatus = "loading" | "ready";

interface Feed extends FeedData {
  url: string;
  status: FeedStatus;
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
