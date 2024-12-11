const express = require('express');
const path = require('path');
const connect = require('./db'); // Database connection file

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    try {
        const db = await connect();
        const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray();
        res.render('index', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error loading posts');
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const db = await connect();
        const post = await db.collection('posts').findOne({ _id: new require('mongodb').ObjectId(req.params.id) });
        if (post) {
            res.render('post', { post });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Error loading post');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});