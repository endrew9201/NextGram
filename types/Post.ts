
import { Like } from './Like';
import { Comment } from './Comment';
import { User } from './User';

export interface Post {
    id: string;
    imageUrl: string;
    caption?: string | null | undefined;
    userId: string | null;
    user: User;
    likes?: Like[] | [];
    comments?: Comment[] | [];
    createdAt: Date;
    updatedAt: Date;
}