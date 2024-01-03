export async function getAllPosts() {
  const res = await fetch('http://localhost:3001/api/posts');
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
    },
  };
}

export async function getPostsByPage(page = 0, limit = 10) {
  const res = await fetch('http://localhost:3001/api/posts');
  const data = await res.json();

  return {
    props: {
      posts: data.posts.slice(page * limit, page * limit + limit),
      allPostCounts: data.posts.length,
      page,
    },
  };
}

export async function getPostById(id) {
  const res = await fetch(`http://localhost:3001/api/posts/${id}`);
  const data = await res.json();

  return {
    props: {
      post: data.post,
    },
  };
}
