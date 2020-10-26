import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'code-challenge';
  enrolleesList: any;
  enrolleeName: string = "";
  activationStatus: boolean;
  editEnrolleeObj: object;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getEnrollees();
  }

  getEnrollees() {
    this.commonService.getEnrollees().subscribe(dataList => {
      this.enrolleesList = dataList;
      this.enrolleesList.map((obj) => {
        obj.isEdit = false;
        return obj;
      })
      console.log(this.enrolleesList);
    })
  }

  getEnrolleeToEdit(id) {
    this.enrolleesList.forEach(function (enrollee) {
      if (enrollee.id === id) {
        enrollee.isEdit = true;
      }
      else {
        enrollee.isEdit = false;
      }
    });
  }

  cancelEdit(id) {
    this.enrolleesList.forEach(function (enrollee) {
      if (enrollee.id === id) {
        enrollee.isEdit = false;
      }
    });
  }
  checkCheckBoxvalue(event) {
    this.activationStatus = event.target.checked;
  }

  saveEdittedValue(enrollee) {
    if (!this.enrolleeName) {
      alert("Please give some Enrollee Name");
    }
    else {
      if (this.activationStatus == undefined) {
        this.editEnrolleeObj = {
          "active": enrollee.active,
          "name": this.enrolleeName,
          "dateOfBirth": enrollee.dateOfBirth
        }
      }
      else {
        this.editEnrolleeObj = {
          "active": this.activationStatus,
          "name": this.enrolleeName,
          "dateOfBirth": enrollee.dateOfBirth
        }
      }
      this.commonService.updateEnrolleeDetails(enrollee.id, this.editEnrolleeObj).subscribe(data => {
        if (data) {
          this.getEnrollees();
        }
      });
      this.enrolleeName = "";
    }
  }
}
