import { z } from "zod";


export const UpdateReviewSchema = z.object(
    {
        score: z.number().min(1).max(5),
        title: z.string(),
        description: z.string(),
    }
);


type UpdateReviewType = z.infer<typeof UpdateReviewSchema>;

export interface InUpdateReviewInterface extends UpdateReviewType{};
