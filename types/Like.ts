import { Post, User } from "@prisma/client/edge"

export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
    user?: User;
    post?: Post;
}