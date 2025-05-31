// src/app/private/components/header/header.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="dashboard-header">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search files, orders...">
      </div>
      
      <div class="header-actions">
        <button class="notification-btn">
          <i class="fas fa-bell"></i>
          <span class="badge" *ngIf="notifications > 0">{{notifications}}</span>
        </button>
        
        <div class="user-dropdown">
          <div class="user-info">
            <span class="user-name">{{user?.firstName}} {{user?.lastName}}</span>
            <div class="user-avatar">
              <img [src]="user?.avatar || 'assets/default-avatar.png'" alt="User avatar">
            </div>
          </div>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">
              <i class="fas fa-user"></i>
              <span>My Profile</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="fas fa-cog"></i>
              <span>Settings</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: white;
      border-bottom: 1px solid #eee;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .search-bar {
      position: relative;
      width: 300px;
      
      i {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }
      
      input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        
        &:focus {
          outline: none;
          border-color: #1a41c6;
        }
      }
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .notification-btn {
      position: relative;
      background: none;
      border: none;
      color: #666;
      font-size: 1.2rem;
      cursor: pointer;
      
      .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #ff4757;
        color: white;
        font-size: 0.7rem;
        font-weight: 600;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    .user-dropdown {
      position: relative;
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        
        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      
      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        width: 200px;
        z-index: 10;
        display: none;
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #333;
          text-decoration: none;
          transition: all 0.2s ease;
          
          &:hover {
            background-color: #f5f5f5;
          }
          
          i {
            width: 20px;
            text-align: center;
            color: #666;
          }
        }
      }
      
      &:hover .dropdown-menu {
        display: block;
      }
    }
    
    @media (max-width: 768px) {
      .dashboard-header {
        padding: 1rem;
      }
      
      .search-bar {
        width: 200px;
      }
      
      .user-info .user-name {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() user: any;
  @Input() unreadMessages: number = 0;
  
  notifications: number = 2;
}
