import { Post, User } from "@prisma/client/edge";

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    post?: Post;
}