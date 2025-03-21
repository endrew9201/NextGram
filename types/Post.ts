import { Like, User } from "@prisma/client/edge";

export interface Post {
    id: string;
    imageUrl: string;
    caption?: string;
    userId: string | null;
    user: User;
    likes?: Like[] | [];
    comments?: Comment[] | [];
    createdAt: Date;
    updatedAt: Date;
}