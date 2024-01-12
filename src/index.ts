import express from "express";
import { authRouter } from "./users/routers/auth.router";
import { userRouter } from "./users/routers/user.router";

const app = express();
const port = 5500;
app.use(express.json());
app.use(authRouter)
app.use("/users", userRouter)
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
