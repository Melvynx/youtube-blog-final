export type PostMeta = {
  id: string;
  title: string;
  description: string;
  author: string;
};

export type Post = {
  code: string;
  frontmatter: PostMeta;
  id: string;
};
