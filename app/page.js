'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { getPostsByPage } from '../libs/posts';

const limit = 10;

const Home = ({}) => {
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPostsByPage(page, limit);
      setPosts(fetchedPosts.props.posts);
      setAllPages(Math.ceil(fetchedPosts.props.allPostCounts / limit));
    }
    fetchPosts();
  }, [page]);

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {[...Array(allPages)].map((_, index) => (
          <a
            key={index}
            onClick={() => {
              setPage(index);
            }}
            style={{ 'font-size': '2rem' }}
          >
            {index + 1}
            {index + 1 == allPages ? '' : '|'}
          </a>
        ))}
      </div>
      {posts.length ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Date: {post.date}</p>
            <Image src={post.imagePath} alt='image' height={200} width={300} />
            <p>{post.summary}</p>
            <Link href={`/posts/${post.id}`}>Read more</Link>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Home;
