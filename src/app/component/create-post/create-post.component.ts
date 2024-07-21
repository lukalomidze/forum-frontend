import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../service/posts.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-post.component.html',
    styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
    private postsService = inject(PostsService)
    private formBuilder = inject(FormBuilder);

    failed = signal(false);

    postForm = this.formBuilder.nonNullable.group({
        author: ['', [Validators.required]],
        content: ['', [Validators.required]]
    });
    image: File | null = null;

    changeFile(event: Event) {
        this.image = (event.target as HTMLInputElement).files![0];
    }

    onSubmit() {
        this.failed.set(false);

        this.postsService
            .createPost(
                this.image == null
                ? this.postForm.getRawValue()
                : {
                    ...this.postForm.getRawValue(),
                    image: this.image!
                }
            )
        .subscribe(
            failed => this.failed.set(failed)
        );

        this.postForm.reset();
    }
}
