// src/app/private/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  recentOrders: any[] = [];
  unreadMessages: number = 0;
  
  constructor() {}
  
  ngOnInit() {
    // Simuler la récupération des données utilisateur
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://applisound-images.s3.eu-west-3.amazonaws.com/default-avatar.png'
    };
    
    // Simuler la récupération des commandes récentes
    this.recentOrders = [
      { id: 'ORD-2023-001', title: 'Custom Soundtrack', status: 'completed', date: '2023-05-15' },
      { id: 'ORD-2023-002', title: 'Voice Over Project', status: 'in-progress', date: '2023-05-20' },
      { id: 'ORD-2023-003', title: 'Jingle Creation', status: 'pending', date: '2023-05-25' }
    ];
    
    // Simuler le nombre de messages non lus
    this.unreadMessages = 3;
  }
}
