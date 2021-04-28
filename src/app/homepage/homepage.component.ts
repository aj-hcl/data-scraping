import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit } from '@angular/core';
import { GetUrlService } from '../services/get-url.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public url: string;
  public backendTags = new Array<string>();
  public checkboxList = new Array<string>();
  public checkboxesChecked = new Array<string>();
  public userMessage: string;
  //table data
  public data = new Array<string>();
  public headers = new Array<string>();
  public tagName = new Array<string>();
  public tagData = new Array<string>();
  public tagKey = new Array<string>();


  constructor(private getURLService: GetUrlService) {

  }

  ngOnInit(): void {
    this.hideTable();
    this.hideButton();
  }

  public submitUrl() {
    this.checkboxList, this.checkboxesChecked = [];
    var input = ((document.getElementById("input") as HTMLInputElement).value);
    this.url = input;
    this.checkboxesChecked.push(this.url);
    this.userMessage = ("The URL entered was: " + input);
    this.hideTable();

    this.getURLService.getUrl(input).subscribe((result) => {
      this.backendTags = result;
      this.createCheckboxes();
    });
  }

  // go through array being received from backend and push to checkboxList array in order to display on UI
  public createCheckboxes() {
    for (var i = 0; i < this.backendTags.length; i++) {
      this.checkboxList.push(JSON.stringify(this.backendTags[i]).replace(/"/g, "'"));
    }
    var button = document.getElementById("submitChecks");
    button.style.display = "block";
  }

  // append checked checkboxes to array that can be sent to the backend
  public append(event, checked) {
    if (event.target.checked == true) {
      this.checkboxesChecked.push(checked);
    }
    else {
      const index = this.checkboxesChecked.indexOf(checked);
      this.checkboxesChecked.splice(index, 1);
    }
  }

  public submitCheckboxes() {
    if (this.checkboxesChecked.length > 1) {
      this.getURLService.sendCheckboxes(this.checkboxesChecked).subscribe((result) => {
        this.userMessage = ("Message from database: " + result.message);
      });
    }
    else {
      this.userMessage = "Error: Please check at least one checkbox.";
    }
    this.checkboxesChecked = [];
    this.checkboxesChecked.push(this.url);
  }

  public getTable() {
    this.checkboxList = [];
    var input = ((document.getElementById("urlInput") as HTMLInputElement).value);
    this.url = input;
    this.userMessage = ("The URL entered was: " + input);

    this.getURLService.generateTable(input).subscribe((result) => {
      this.data = result.tags;
      var table = document.getElementById("tagTable");
      table.style.display = "table";
      this.hideButton();
    });
  }

  public hideTable() {
    var table = document.getElementById("tagTable");
    table.style.display = "none";
  }

  public hideButton() {
    var button = document.getElementById("submitChecks");
    button.style.display = "none";
  }
}