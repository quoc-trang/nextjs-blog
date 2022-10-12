import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typing";

interface Props {
  posts: [Post];
}

function Posts({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-7xl p-5 md:p-0 md:mt-10 gap-5 ">
      {posts.map((post) => (
        <li key={post._id}>
          <div className="overflow-hidden rounded-lg">
            <Link href={`/post/${post.slug.current}`} key={post._id}>
              <img
                className="rounded-lg cursor-pointer hover:scale-110 transition duration-300"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
            </Link>
          </div>
          <div className="flex justify-between mt-2">
            <div className="">
              {post.title} by
              <span className="font-bold uppercase text-amber-900">
                {" "}
                {post.author.name}
              </span>
              <p className="text-xs">{post.description}</p>
            </div>
            <div className="w-10 h-10 rounded-[100%] overflow-hidden flex items-center">
              <img
                className="w-full scale-150"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
