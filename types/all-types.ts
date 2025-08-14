export type Post = {
  id: number;
  user: {
    name: string;
    avatarUrl?: string | null;
  };
  title: string;
  content: string;
  createdAt: string;
};

export type PostResponse = {
  posts: Post[]; 
  nextCursor?: string | null;
};
