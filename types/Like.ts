import { Post } from './Post'
import { User } from './User';

export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
    user?: User;
    post?: Post;
}