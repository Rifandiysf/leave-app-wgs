import express from "express";

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/', getUser);
