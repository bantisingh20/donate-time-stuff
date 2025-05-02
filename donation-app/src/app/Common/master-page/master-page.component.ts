import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MasterService } from '../../services/master.service';
  
@Component({
  selector: 'app-master-page',
  standalone :true,
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})


export class MasterPageComponent  implements OnInit  {
  formConfig: any = {};
  form!: FormGroup;
  viewMode: 'table' | 'form' = 'table';
  formMode: 'add' | 'edit' = 'add';
  currentRoute: string = '';
 
  currentPage: number = 1;
  itemsPerPage: number = 5;  
  totalPages: number = 0;
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  paginatedData: any[] = [];
  Math: any;

  constructor( private masterService: MasterService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router,private http: HttpClient) {
     
  }

  ngOnInit(): void {
    const pathSegments = this.router.url.split('/'); 
    this.currentRoute = pathSegments[pathSegments.length - 1];
    this.loadConfigForRoute();
   
  }

  loadConfigForRoute() {
    
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
        submitbuttonapi:typedConfig.form.submitbuttonapi,  
        columns : typedConfig.form.listcolumn ? JSON.parse(typedConfig.form.listcolumn) : [], //typedConfig.form.listcolumn ? JSON.parse(typedConfig.form.listcolumn) : []
        data :typedConfig.listData,
      };

      const group: any = {};

     

      this.formConfig.fields.forEach((field: FormField) => {       
         group[field.fieldKey] = field.required ? [null, Validators.required] : [null];
         console.log(field)
      });
      this.form = this.fb.group(group);

      console.log('build form  form config:', this.form);

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
    if (this.form.invalid) {      
      this.form.markAllAsTouched();
      return;
    }

    

    
    
    if (this.form.valid) {
      if (this.formMode === 'edit') {
        // Update data if editing
        this.masterService.UpdateMaster(this.form.value).subscribe(() => {
          this.form.reset();
          // this.viewMode = 'table';
          // this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
          // this.updatePaginatedData();
        });
      } else {
       
        this.masterService.SaveMaster(this.form.value).subscribe(() => {
          this.form.reset();
          // this.viewMode = 'table';
          // this.totalPages = Math.ceil(this.formConfig.data.length / this.itemsPerPage);
          // this.updatePaginatedData();
          this.form.reset();
        });
      }
    }
 
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


interface FormField {
  fieldKey: string;
  label: string;
  type: string; // '1', 'text', 'email', 'dropdown', 'checkbox', etc.
  placeholder?: string;
  required:boolean,
  options?: { label: string; value: string }[];
}