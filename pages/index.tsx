import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typing";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="flex flex-col items-center">
        <Banner />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author -> {
    name,
    image
    },
    description,
    mainImage,
    slug,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
