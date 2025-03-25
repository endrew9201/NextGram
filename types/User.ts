import { Like } from "./Like";
import { Post } from "./Post";

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    likes?: Like[];
    comments?: Comment[];
    posts?: Post[]
}