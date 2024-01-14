import { z } from "zod";


// Tipado para el registro de usuario
export const RegisterLoginSchema = z.object(
    {
        username: z.string(),
        password: z.string(),
        role: z.string()
    }
);

type RegisterLoginType = z.infer<typeof RegisterLoginSchema>;

export interface InRegisterLoginInterface extends RegisterLoginType { };

//
export interface OutRegisterLoginInterface extends Omit<InRegisterLoginInterface,'password'>{};

export interface DataRegisterLoginInterface extends InRegisterLoginInterface{
    id:number
};
