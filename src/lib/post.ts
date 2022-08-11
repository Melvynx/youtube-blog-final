import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypePrism from 'rehype-prism-plus';
import { Post, PostMeta } from '../type/post';

const postsDirectory = path.join(process.cwd(), 'content');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.includes('.mdx'));

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<PostMeta, 'id'>),
    };
  });

  return allPostsData;
};

export type PostSlugParams = {
  params: {
    slug: string;
  };
};

export const getPostsSlugs = (): PostSlugParams[] =>
  getSortedPostsData().map((p) => ({
    params: {
      slug: p.id,
    },
  }));

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

      return options;
    },
  });

  return {
    id: slug,
    code,
    frontmatter: frontmatter as PostMeta,
  };
};
