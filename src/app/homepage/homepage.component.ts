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
  public backendData = new Array<string>();
  public checkboxList = new Array<string>();
  public checkboxesChecked = new Array<string>();
  public errorMessage: string;
  public backendMessage: string;
  public checkUrl: string;
  public savedData = new Array<string>();

  constructor(private getURLService: GetUrlService) {

  }

  ngOnInit(): void {

  }

  public submitUrl() {
    this.checkboxesChecked = [];
    var input = ((document.getElementById("input") as HTMLInputElement).value);
    this.url = input;
    this.checkboxesChecked.push(this.url);

    this.getURLService.getUrl(input).subscribe((result) => {
      this.backendData = result;
      this.createCheckboxes();
    });
  }

  // go through array being received from backend and push to checkboxList array in order to display on UI
  public createCheckboxes() {
    for (var i = 0; i < this.backendData.length; i++) {
      this.checkboxList.push(JSON.stringify(this.backendData[i]).replace(/"/g, "'"));
    }
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
    console.log(this.checkboxesChecked);
  }

  public submitCheckboxes() {
    var checks;
    checks = this.checkboxesChecked;
    if (checks.length > 1) {
      this.getURLService.sendChecked(checks).subscribe((result) => {
        console.log(result.message);
        this.backendMessage = ("Message from database: " + result.message);
        this.checkboxesChecked = [];
        this.checkboxesChecked.push(this.url);
      });
    }
    else {
      this.errorMessage = "Error: Please check at least one checkbox.";
      this.checkboxesChecked = [];
      this.checkboxesChecked.push(this.url);
    }
  }

  public checkSaved() {
    var input = ((document.getElementById("urlInput") as HTMLInputElement).value);
    this.checkUrl = input;

    this.getURLService.getSaved(input).subscribe((result) => {
      this.savedData = result;
      this.backendMessage = ("Message from database: " + result.message);
      console.log(result);
    });
  }
}
