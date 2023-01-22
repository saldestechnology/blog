import Head from "next/head";
import { getPost, getPosts } from "@/utils/utils";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  meta: {
    title: string;
    publishedOn: string;
    excerpt: string;
  };
  source: MDXRemoteSerializeResult;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function Slug({
  meta = { title: "", publishedOn: "", excerpt: "" },
  source,
}: Props) {
  const title = `Johan Saldes - ${meta?.title}`;
  const router = useRouter();
  if (!source) return null;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Johan Saldes" />
        <meta name="description" content={meta?.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container">
        <MDXRemote
          {...source}
          components={{
            h1: (props) => <h1 {...props} />,
            p: (props) => <p className="paragraph" {...props} />,
          }}
        />
        <hr className="hr" />
        <div className="footer">
          <em className="published">Published on: {meta?.publishedOn}</em>
          <button className="back" onClick={() => router.push("/")}>
            Back
          </button>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          margin: 1em auto;
          width: 90%;
          background-color: #0e0e0e;
          padding: 2em;
        }
        h1,
        .paragraph,
        .hr {
          margin: 0 0 1em 0;
        }
        .paragraph {
          font-size: 1.2em;
        }
        .hr {
          border: 1px solid darkmagenta;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .published {
          font-size: 0.8em;
        }
        .back {
          background: darkmagenta;
          padding: 1em;
          border: none;
        }
        @media (min-width: 600px) {
          .container {
            width: 40%;
          }
          .paragraph {
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  );
}

export const getStaticPaths = async () => {
  const posts = getPosts(0);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  let { slug } = ctx.params!;
  const post = getPost(slug as string)[0] as Post;
  const source = await serialize(post.content);

  return {
    props: {
      meta: post.data,
      source,
    },
  };
};
