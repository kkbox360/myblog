import Link from 'next/link';
import Image from 'next/image';

import { getAllPosts, getPostById } from '../../../libs/posts';

export default async function Post({ params }) {
  const { id } = params;
  const fetchedPost = await getPostById(id);
  const post = fetchedPost.props.post;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href={`/`}>Go back</Link>
      <h1>{post.title}</h1>
      <p>Date: {post.date}</p>
      <Image src={post.imagePath} alt='image' height={200} width={300} />
      <div>{post.content}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.props.posts.map((post) => ({
    id: post.id.toString(),
  }));
}
