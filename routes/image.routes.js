import { Router } from "express";
import { getAllImages, generateImages } from "../controllers/image.controller.js";

const imageRouter = Router();

imageRouter.get("/", getAllImages);

imageRouter.post("/", generateImages);


export default imageRouter;
