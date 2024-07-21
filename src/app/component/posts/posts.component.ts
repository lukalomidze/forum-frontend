import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, ignoreElements, of, skip } from 'rxjs';
import { PostsService } from '../../service/posts.service';
import { PostComponent } from '../post/post.component';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule, PostComponent],
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
    private postsService = inject(PostsService);

    posts$ = this.postsService.getPosts();
    isError$ = this.posts$.pipe(
        ignoreElements(),
        catchError(err => of(true))
    );
    isLoading$ = new BehaviorSubject(true);

    ngOnInit() {
        this.posts$.pipe(skip(1)).subscribe({
            next: () => this.isLoading$.next(false),
            error: () => this.isLoading$.next(false)
        })
    }
}
