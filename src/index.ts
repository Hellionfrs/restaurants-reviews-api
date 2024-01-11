import express from "express";
import { authRouter } from "./users/controllers/user-auth.controller";
import { allowedNodeEnvironmentFlags } from "process";

const app = express();
const port = 5500;
app.use(express.json());
app.use(authRouter)

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
