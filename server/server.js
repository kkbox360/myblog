const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const generatePosts = () => {
  const posts = [];
  const startDate = new Date('2023-01-01');

  for (let i = 1; i <= 100; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i - 1);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const newPost = {
      id: i,
      title: `Sample Post ${i}`,
      date: `${year}-${month}-${day}`,
      summary: `This is a sample post number ${i}.`,
      imagePath: `/image.jpeg`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit... ${i}`,
    };
    posts.push(newPost);
  }

  return posts;
};

const posts = generatePosts();

app.use(cors());

app.get('/api/posts', (req, res) => {
  res.json({ posts });
});

app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ post });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
