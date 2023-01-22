import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  posts: Array<Post>;
}

function ListPosts({ posts }: Props) {
  const router = useRouter();
  return (
    <div>
      {posts.map((post) => (
        <div className="post" key={post.slug}>
          <h2 className="title">{post.data.title}</h2>
          <p className="exerpt">{post.data.excerpt}</p>
          <div className="container">
            <em className="published">Published on: {post.data.publishedOn}</em>
            <button
              className="readmore"
              onClick={() =>
                router.push({
                  pathname: "/post/[slug]",
                  query: { slug: encodeURIComponent(post.slug) },
                })
              }
            >
              Read more
            </button>
          </div>
        </div>
      ))}
      <style jsx>{`
        .post {
          margin: 1em auto;
          width: 80%;
          background-color: #0e0e0e;
          padding: 2em;
        }
        .title,
        .exerpt {
          margin: 0 0 1em 0;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .published {
          font-size: 0.8em;
        }
        .readmore {
          background: darkmagenta;
          padding: 1em;
          border: none;
        }
        @media (min-width: 600px) {
          .post {
            width: 40%;
          }
          .container {
            align-items: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

export default ListPosts;
