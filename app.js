// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Dummy blog data
const blogPosts = [
    {
        id: 1,
        title: 'Understanding Docker Basics',
        date: '2024-12-01',
        content: 'Docker is a containerization platform that allows developers to package applications...'
    },
    {
        id: 2,
        title: 'Kubernetes for Beginners',
        date: '2024-12-02',
        content: 'Kubernetes is an open-source orchestration tool for managing containerized applications...'
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: blogPosts });
});

app.get('/post/:id', (req, res) => {
    const post = blogPosts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
