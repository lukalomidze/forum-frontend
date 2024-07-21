import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';

export type Post = {
    author: string,
    content: string,
    imageUrl: string,
    creationTime: string
}

export type CreatePostDTO = {
    author: string,
    content: string,
    image?: File
}

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private backend = inject(BackendService)

    private posts = new BehaviorSubject<Post[]>([]);

    constructor() {
        this.backend.getAllPosts().subscribe({
            next: posts => this.posts.next([...posts]),
            error: (error: HttpErrorResponse) => {
                this.posts.error(error);
            }
        });
    }

    getPosts() {
        return this.posts.asObservable();
    }

    createPost(dto: CreatePostDTO) {
        let failed = new BehaviorSubject(false);

        // creationTime is implemented this way to avoid js automatically
        // syncing the Date object to current time as on the backend times
        // are stored as UTC
        this.backend.submitPost(dto).subscribe({
            next: ({ imageUrl }) => this.posts.next([
                { ...dto, imageUrl, creationTime: new Date().toISOString().slice(0, 19) },
                ...this.posts.getValue()
            ]),
            error: () => failed.next(true)
        });

        return failed;
    }
}
