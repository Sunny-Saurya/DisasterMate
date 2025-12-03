import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.get("/login", (req, res) => {
    res.send("Login Route");
});

app.get("/register", (req, res) => {
    res.send("Register Route");
});
dotenv.config();