import { UserInfo } from 'firebase/app';
import { PageLayoutSimpleRoutingModule } from './../../pages/page-layouts/page-layout-simple/page-layout-simple-routing.module';
import { AuthProcessService } from 'src/app/pages/authentication/auth-service';
import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  sidenavUserVisible$ = this.themeService.config$.pipe(map(config => config.sidenavUserVisible));

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  userName : string
  userEmail: string

  items$: Observable<SidenavItem[]>;

  constructor(private router: Router,
              private sidenavService: SidenavService,
              private themeService: ThemeService,
              private afa: AuthProcessService) {
  }

  ngOnInit() {
    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) => this.sidenavService.sortRecursive(items, 'position'))
    );

    this.initUserInfo()
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {
  }

  initUserInfo(){
    let userInfo = this.afa.getUser()
    this.userName = userInfo.displayName
    this.userEmail = userInfo.email
  }

  logout(){
    this.afa.signOut();
    this.router.navigate(["/login"])
  }
}
