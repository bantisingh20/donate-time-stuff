import { Component } from '@angular/core';
import { MasterPageComponent } from "../../Common/master-page/master-page.component";

@Component({
  selector: 'app-user-role',
  imports: [MasterPageComponent],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent {
  formConfig = {
    title: "Users List",
    view: "table", // or "form"
    columns: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Country", key: "country" }
    ],
    data: [
      { name: "John Doe", email: "john@example.com", country: "India" },
      { name: "Jane Smith", email: "jane@example.com", country: "USA" }
    ],
    onCancel: () => {
      console.log("Back pressed");
    },
    submitButtonText: "Submit",
    cancelButtonText: "Back"
  };
  
}
