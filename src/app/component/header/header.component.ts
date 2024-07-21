import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    template: `
        <header>
            <h1>Daily Forum</h1>
        </header>
    `,
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
