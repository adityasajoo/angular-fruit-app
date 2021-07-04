import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModelService
} from "../../services/model.service";
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  public result;
  public isLoading;

  constructor(private modelService: ModelService, private router: Router) {
    modelService.loading.subscribe(val => val === null ? this.router.navigateByUrl("/") : this.isLoading = val)
    modelService.result.subscribe(val => this.result = val)
  }

  ngOnInit(): void {
    console.log("RES ", "Welcome !!");

    //copied
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    });
  }



}
