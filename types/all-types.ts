export type Post = {
  id: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
};

export type PostResponse = {
  posts: Post[];
  nextCursor?: string | null;
};
