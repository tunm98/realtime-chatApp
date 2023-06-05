import { db } from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { GetStaticProps, GetStaticPropsContext } from "next";

// export async function getStaticProps(context: any) {
//   try {
//     console.log("Posts: 3424");
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await res.json();
//     console.log("Posts:", posts);

//     return {
//       props: { posts },
//     };
//   } catch (error) {
//     console.error("Error getting posts:", error);
//     return {
//       props: { posts: [] }, // Return empty array as posts
//     };
//   }
// }

export interface Post {
  id: number;
  title: string;
}
export interface PageProps {
  posts: Post[];
}
export default async function Home({ posts }: PageProps) {
  return (
    <>
      <Link href="/dashboard">
        <Button className="mt-[20px] ml-[20px]" variant="default" size="lg">
          Go to Dashboard
        </Button>
      </Link>
      <Link href="/login">
        <Button className="mt-[20px] ml-[20px]" variant="default" size="lg">
          Go to Login
        </Button>
      </Link>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post?.title}</li>
        ))}
      </ul>
    </>
  );
}

// export const getStaticProps: GetStaticProps<PageProps> = async () =>
//   // context: GetStaticPropsContext
//   {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await res.json();
//     return {
//       props: {
//         posts: posts.map((post: any) => {
//           id: post.id;
//           title: post.title;
//         }),
//       },
//     };
//   };
