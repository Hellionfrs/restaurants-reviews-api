import express from "express";
import { authRouter } from "./users/routers/auth.router";
import { userRouter } from "./users/routers/user.router";
import restaurantsRouter from "./restaurants/routers/restaurant.router";
import errorHandler from "./middlewares/error";
import reviewRestaurantRouter from "./reviews/routers/review.router";

const app = express();
const port = 5500;
app.use(express.json());

app.use(authRouter);
app.use("/", reviewRestaurantRouter);
app.use("/users", userRouter);
app.use("/restaurants", restaurantsRouter);


app.use(errorHandler);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
