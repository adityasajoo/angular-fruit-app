import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ModelService
} from "../../services/model.service";
import {Router} from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public connection = false;
  private result = {};
  model : string;
  files = [];

  constructor(private modelService: ModelService,private router: Router) {
  }

  ngOnInit(): void {

    this.modelService.checkConnection().subscribe(res => {
      if (res.status == "success") {
        this.connection = true;
        //this.modelService.setResult(res);
      }
    })
  }

  onFileChange(event){
    this.files = event.target.files;
    console.log(event);
  }

  
  onSubmit(){
    if(!this.model || this.files.length===0){
      alert("Both must be specified");
      return;
    }
    console.log("You submitted : ",this.files[0]);
    console.log("You submitted : ",this.model);
    const body = {
      file : this.files[0],
      model : this.model
    }

    this.modelService.loading.next(true);
    this.modelService.predict(body).subscribe(result=>{
      this.modelService.result.next(result.data);
      this.modelService.loading.next(false);
    })

    this.router.navigateByUrl("/result");


  }

}

