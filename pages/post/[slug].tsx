import { GetStaticProps } from "next";
import Image from "next/image";
import PortableText from "react-portable-text";
import FormHandler from "../../components/FormHandler";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-52 md:h-96 w-screen relative">
        <Image
          src={urlFor(post.mainImage).url()!}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="px-10 md:max-w-4xl">
        <div className=" mt-2 ">
          <div className="">
            {post.title} by
            <span className="font-bold uppercase text-amber-900  ">
              {" "}
              {post.author.name}
            </span>
            <p className="text-xs">{post.description}</p>
          </div>
          <div className="w-10 h-10 rounded-[100%] overflow-hidden flex items-center mt-2">
            <img
              className="w-full scale-150"
              src={urlFor(post.author.image).url()!}
              alt=""
            />
          </div>
        </div>
        <div className="mt-5  ">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover: underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <hr className=" my-20 bg-amber-900 w-full" />
        <div>
          <p className="font-bold w-full  text-amber-900 text-xs">
            Enjoyed this view?
          </p>
          <h1 className="font-bold w-full  text-2xl">Leave a comment below!</h1>
        </div>
        <FormHandler post={post} />
      </div>
      {/* Comment */}
      <div>
        <h3 className="text-4xl">Comments</h3>

        <hr className="pb-2" />

        {post.comments.map((cmt) => (
          <div key={cmt._id}>
            <p>
              <span className="text-yellow-500">{cmt.name}: </span>
              {cmt.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
     name,
     image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }
  `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
