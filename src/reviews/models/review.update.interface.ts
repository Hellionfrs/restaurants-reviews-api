import { z } from "zod";


export const UpdateReviewSchema = z.object(
    {
        score: z.number().min(1).max(5).optional(),
        title: z.string().optional(),
        description: z.string().optional(),
    }
);


type UpdateReviewType = z.infer<typeof UpdateReviewSchema>;

export interface InUpdateReviewInterface extends UpdateReviewType{};
