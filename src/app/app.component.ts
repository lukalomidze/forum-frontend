import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from "./component/create-post/create-post.component";
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { PostComponent } from './component/post/post.component';
import { PostsComponent } from "./component/posts/posts.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, PostsComponent, PostComponent, FooterComponent, CreatePostComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'forum-frontend';
}
