import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts } from "@/utils/utils";
import ListPosts from "@/components/ListPosts";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  posts: Array<Post>;
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Johan Saldes</title>
        <meta name="description" content="Feeling good in my neighbourhood" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <ListPosts posts={posts} />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps = () => {
  const posts = getPosts(0).reverse();

  return {
    props: {
      posts,
    },
  };
};
