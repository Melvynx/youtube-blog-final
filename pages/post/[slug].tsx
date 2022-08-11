import { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../../src/components/layout';
import { MDXComponent } from '../../src/components/MDXComponent';
import { getPostBySlug, getPostsSlugs, PostSlugParams } from '../../src/lib/post';
import { Post } from '../../src/type/post';

export const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <Layout>
      <Link href="/">
        <a className="text-blue-500 underline">Home</a>
      </Link>
      <h1 className="text-4xl text-center">{post.frontmatter.title}</h1>
      <hr />
      <article className="prose mt-4 bg-neutral-100 p-2 shadow-sm">
        <MDXComponent code={post.code} />
      </article>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const slugs = getPostsSlugs();

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: PostSlugParams) => {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
  };
};
