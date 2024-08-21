const post = require("../schemas/post");
const mongoose = require("mongoose");

const addPost = async (req, res) => {
    try {
        const { title, post_text, author  } = req.body;

        const oldPost = await post.findOne({ title });
        if (oldPost) {
            return res
                .status(400)
                .send({ message: "This post is already exst." });
        }
        const newPost = await post.create({ title, post_text, author });
        console.log(newPost);

        res.status(200).send({ message: "New post edded.", newPost });
    } catch (error) {
        console.log(`Error occured:\n${error}`);
        res.status(500).send({ error: "Internal server error." });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await post.find();
        res.send(posts);
    } catch (error) {
        console.log(`Error occured:\n${error}`);
        res.status(500).send({ error: "Internal server error." });
    }
};

const getpostById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect object id.");
        }
        // const post = await post.findById(req.params.id);
        const post1 = await post.findOne({ _id: req.params.id });

        if (!post1) {
            return res.status(400).send("post not found.");
        }

        res.send(post1);
    } catch (error) {
        console.log(`Error occured:\n${error}`);
        res.status(500).send({ error: "Internal server error." });
    }
};

const updateById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect object id.");
        }

        const { title, post_text, author } = req.body;
        const updated_post = await post.findByIdAndUpdate(
            req.params.id,
            {
                title, 
                post_text, 
                author
            },
            { new: true }
        );

        if (!updated_post) {
            return res.status(404).send({ message: "post incorrect!" });
        }

        res.status(200).send({
            updated_post,
        });
    } catch (error) {
        console.log("Error occured:\n", error);
    }
};

const deletepostById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect object id.");
        }

        const deleted_post = await post.findByIdAndDelete(req.params.id);
        if (!deleted_post) {
            res.status(404).send({ errormessege: "post not found" });
        }

        res.status(200).send({
            statusCode: 200,
            message: "post deleted succusfully",
            data: deleted_post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internaml server error." });
    }
};

module.exports = {
    addPost,
    getPosts,
    getpostById,
    updateById,
    deletepostById
};
