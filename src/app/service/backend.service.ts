import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, retry, tap } from 'rxjs';
import { backendUrl } from '../config';
import { CreatePostDTO, Post } from './posts.service';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private client = inject(HttpClient);

    getAllPosts() {
        return this.client
            .get<Post[]>(`${backendUrl}/api/v1/get-all-posts`)
        .pipe(
            retry({ count: 1, delay: 500 }),
            catchError(error => { throw error })
        );
    }

    submitPost(post: CreatePostDTO) {
        return this.client
            .post<{ imageUrl: string }>(
                `${backendUrl}/api/v1/create-post`,
                BackendService.toFormData(post)
            )
        .pipe(
            retry({ count: 1, delay: 500 }),
            catchError(error => { throw error })
        )
    }

    private static toFormData(object: { [key: string]: string | File }) {
        const formData = new FormData();

        let key: keyof typeof object
        for (key in object) {
            formData.append(key, object[key])
        }

        return formData;
    }

}
