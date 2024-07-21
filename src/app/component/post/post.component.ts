import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../service/posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
    @Input() post!: Post;

    getDateDifference(date: string) {
        const targetDate = new Date(date);
        const now = new Date();

        const differenceMins = Math.floor(
            (now.getTime() - targetDate.getTime()) / 60000 + now.getTimezoneOffset()
        );

        return differenceMins >= 60
            ? `${Math.floor(differenceMins / 60)}h`
        : `${differenceMins}m`;
    }
}
