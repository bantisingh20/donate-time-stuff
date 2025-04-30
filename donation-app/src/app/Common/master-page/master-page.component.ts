import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
  
@Component({
  selector: 'app-master-page',
  standalone :true,
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
  imports:[CommonModule,FormsModule]
})
export class MasterPageComponent  implements OnInit  {
  formConfig: any = {};
  viewMode: 'table' | 'form' = 'table';
  formMode: 'add' | 'edit' = 'add';
  currentRoute: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of rows per page
  totalPages: number = 0;
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  paginatedData: any[] = [];
  Math: any;

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) {
     
  }

  ngOnInit(): void {
    const pathSegments = this.router.url.split('/'); 
    this.currentRoute = pathSegments[pathSegments.length - 1];
    this.loadConfigForRoute();
  }

  loadConfigForRoute() {
    // if (this.currentRoute === 'user-role') {
    //   this.loadUserRoleForm();
    // } 
    // else if(this.currentRoute ==='donation-category'){
    //   this.loaddonationCategoryForm();
    // }
    // else if(this.currentRoute ==='donation-types'){
    //   this.loaddonationtypeForm();
    // }
    // else {
    //   console.log(`Configuration for ${this.currentRoute} not found.`);
    // }

    //console.log(this.currentRoute)
    this.http.get(`${environment.apiUrl}/form-config/master/${this.currentRoute }`).subscribe(config => {
      console.log('Dynamic form config:', config);

      const typedConfig = config as { 
        form: {
          formName: string; 
          routePath: string; 
          submitButtonText: string;
          submitbuttonapi: string; 
          cancelButtonText: string;
          listcolumn :string;
        };
        fields: any[];
        listData :any[];
      };
      // Populate the formConfig object with the appropriate properties
      this.formConfig = {
        title: typedConfig.form.formName,  // Corrected: accessing title directly
        routePath: typedConfig.form.routePath,  // Corrected: accessing routePath directly
        fields: typedConfig.fields || [],  // Safely assign fields if available
        submitButtonText: typedConfig.form.submitButtonText,  // Corrected: accessing submitButtonText directly
        cancelButtonText: typedConfig.form.cancelButtonText,  
        columns : typedConfig.form.listcolumn ? JSON.parse(typedConfig.form.listcolumn) : [], //typedConfig.form.listcolumn ? JSON.parse(typedConfig.form.listcolumn) : []
        data :typedConfig.listData,
      };

      this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
    this.updatePaginatedData();

      console.log(this.formConfig);
    });

    
  }

  loadUserRoleForm() {
    this.formConfig = {
      title: 'User Role Management',
      fields: [
        { type: 'text', label: 'Role Name', key: 'roleName', value: '' },
        { type: 'text', label: 'Description', key: 'description', value: '' }
      ],
      columns: [
        { label: 'Sr. No.', key: 'srNo' },
        { label: 'Role Name', key: 'roleName' },
        { label: 'Description', key: 'description' }
      ],
      data: [
        { srNo: 1, roleName: 'Admin', description: 'Full access' },
        { srNo: 2, roleName: 'Editor', description: 'Can edit content' },
        { srNo: 3, roleName: 'Viewer', description: 'Read-only access' },
        { srNo: 4, roleName: 'Guest', description: 'Limited access' },
        { srNo: 5, roleName: 'Manager', description: 'Can manage users' },
        { srNo: 6, roleName: 'Super Admin', description: 'Full access to everything' }
      ],
      submitButtonText: 'Save',
      cancelButtonText: 'Back',
      onCancel: () => {
        this.router.navigate(['/']);
      }
    };

    this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  loaddonationCategoryForm() {
    this.formConfig = {
      title: 'Donation Category',
      fields: [
        { type: 'text', label: 'Category Name', key: 'donationcategory', value: '',placeholder:'Enter Category Name' },
        { type: 'text', label: 'Description', key: 'description', value: '' ,placeholder:'Enter Description'}
      ],
      columns: [
        { label: 'Sr. No.', key: 'srNo' },
        { label: 'Donation Category', key: 'donationcategory' },
        { label: 'Description', key: 'description' }
      ],
      data: [
        { srNo: 1, donationcategory: 'Admin', description: 'Full access' },
        { srNo: 2, donationcategory: 'Editor', description: 'Can edit content' },
        { srNo: 3, donationcategory: 'Viewer', description: 'Read-only access' },
        { srNo: 4, donationcategory: 'Guest', description: 'Limited access' },
        { srNo: 5, donationcategory: 'Manager', description: 'Can manage users' },
        { srNo: 6, donationcategory: 'Super Admin', description: 'Full access to everything' }
      ],
      submitButtonText: 'Save',
      cancelButtonText: 'Back',
      onCancel: () => {
        this.router.navigate(['/']);
      }
    };

    this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  loaddonationtypeForm() {
    this.formConfig = {
      title: 'Donation Type',
      fields: [
        { type: 'text', label: 'Donation Type Name', key: 'donationtypename', value: '',placeholder:'Enter Donation Type Name' },
        { type: 'text', label: 'Description', key: 'description', value: '' ,placeholder:'Enter Description'}
      ],
      columns: [
        { label: 'Sr. No.', key: 'srNo' },
        { label: 'Donation Type', key: 'donationtypename' }, 
        { label: 'Description', key: 'description' }
      ],
      data: [
        { srNo: 1, donationtypename: 'Admin', description: 'Full access' },
        { srNo: 2, donationtypename: 'Editor', description: 'Can edit content' },
        { srNo: 3, donationtypename: 'Viewer', description: 'Read-only access' },
        { srNo: 4, donationtypename: 'Guest', description: 'Limited access' },
        { srNo: 5, donationtypename: 'Manager', description: 'Can manage users' },
        { srNo: 6, donationtypename: 'Super Admin', description: 'Full access to everything' }
      ],
      submitButtonText: 'Save',
      cancelButtonText: 'Back',
      onCancel: () => {
        this.router.navigate(['/']);
      }
    };

    console.log(this.formConfig);
    this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  // Sorting function
  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    // this.formConfig.data.sort((a, b) => {
    //   if (a[column] < b[column]) {
    //     return this.sortDirection === 'asc' ? -1 : 1;
    //   }
    //   if (a[column] > b[column]) {
    //     return this.sortDirection === 'asc' ? 1 : -1;
    //   }
    //   return 0;
    // });

    this.updatePaginatedData();
  }

  // Pagination functions
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.formConfig.data.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  switchToAddForm() {
    this.formMode = 'add';
    this.viewMode = 'form';
    this.resetFormValues();
  }

  onEdit(row: any) {
    this.formMode = 'edit';
    this.viewMode = 'form';
    this.formConfig.fields.forEach((field: any) => {
      field.value = row[field.key];
    });
  }

  onSubmit() {
    const formData: any = {};
    this.formConfig.fields.forEach((field: any) => {
      console.log(field.value)
      formData[field.key] = field.value;
    });

    console.log(formData);
    if (this.formMode === 'add') {
      formData.srNo = this.formConfig.data.length + 1;
      this.formConfig.data.push(formData);
    } else if (this.formMode === 'edit') {
      const editRow = this.formConfig.data.find((row: any) => row.srNo === formData.srNo);
      Object.assign(editRow, formData);
    }

    this.viewMode = 'table';
    this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  onDelete(row: any) {
    const index = this.formConfig.data.indexOf(row);
    if (index > -1) {
      this.formConfig.data.splice(index, 1);
      this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
      this.updatePaginatedData();
    }
  }

  onCancel() {
    this.viewMode = 'table';
  }

  resetFormValues() {
    this.formConfig.fields.forEach((field: any) => {
      field.value = '';
    });
  }
}
