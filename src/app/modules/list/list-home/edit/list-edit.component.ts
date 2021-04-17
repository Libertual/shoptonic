import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from '../../list.model';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html'
})
export class ListEditComponent implements OnInit {
  loading = false;
  submitted = false;
  isAddMode: boolean;
  form: FormGroup;
  list: List;

  constructor(
    private listService: ListService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ListEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.list = data.list || new List();
    this.isAddMode = data.isAddMode;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      income:[true]
    });

    if (this.list._id) {
      this.f.name.setValue(this.list.name);
      this.f.description.setValue(this.list.description);
      this.f.income.setValue(this.list.income);
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  public onSubmit() {
    this.list.name = this.f.name.value;
    this.list.description = this.f.description.value;
    this.list.income = this.f.income.value;

    this.listService.addList(this.list).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  public close() {
    this.dialogRef.close();
  }
}
