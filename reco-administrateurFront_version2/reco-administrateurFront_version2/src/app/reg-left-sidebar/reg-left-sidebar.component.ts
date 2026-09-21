import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-reg-left-sidebar',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './reg-left-sidebar.component.html',
  styleUrl: './reg-left-sidebar.component.css'
})
export class RegLeftSidebarComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSidebar();
      }
    });
  }

  updateSidebar(): void {
    const currentUrl = this.router.url;
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      const link = item.querySelector('.sidebar-link');
      if (link && link.getAttribute('routerLink') === currentUrl) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}
