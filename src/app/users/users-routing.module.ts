import { Routes } from "@angular/router";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'details', component: UserDetailsComponent
      }
    ]
  }
]
