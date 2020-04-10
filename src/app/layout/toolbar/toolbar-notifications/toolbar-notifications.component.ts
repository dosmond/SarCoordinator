import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../@sar/shared/list.animation';

@Component({
  selector: 'sar-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

  notifications: any[];
  isOpen: boolean;

  constructor() {
  }

  ngOnInit() {
    this.notifications = [];
  }

  markAsRead(notification) {
    notification.read = true;
  }

  dismiss(notification, event) {
    event.stopPropagation();
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  markAllAsRead() {
    this.notifications.forEach(notification => notification.read = true);
  }
}
