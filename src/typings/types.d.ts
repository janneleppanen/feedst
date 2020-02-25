interface GlobalState {
  searchTerm: string;
  feeds: FeedList;
}

type FeedList = FeedState[];

interface FeedState {
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
  title: string;
  contentSnippet: string;
  content: string;
  link: string;
  pubDate: string;
  isoDate: string;
}
