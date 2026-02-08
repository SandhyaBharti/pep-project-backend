import { Router } from "express";
import { updateUser, getAllUsers, getUser, login, register, deleteUSer } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/register", register);   // registering a user means creating a user so we use post method.
userRouter.post("/login", login);
userRouter.patch("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUSer);

export default userRouter;