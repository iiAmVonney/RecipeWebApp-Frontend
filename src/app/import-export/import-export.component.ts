import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Papa } from 'ngx-papaparse';
import { RecipeService } from '../services/recipe.service';
import { TabViewComponent } from '../tab-view/tab-view.component';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {

  csv? :string;
  file:any;
  constructor(private tabs : TabViewComponent,private papa: Papa, private service : RecipeService) { }


  ImportCsv(){
    const picker = document.getElementById("picker");
//trigger filechange
    picker.click();
  }

  async fileChanged(e:any){
    this.file = e.target.files[0];

    let fileReader = new FileReader();

    fileReader.onload = (t) => {

      this.csv = t.target?.result?.toString();
      console.log(this.csv);

      this.papa.parse(this.csv!,{
        complete: async (result) => {
            console.log('Parsed: ', result);
            await this.service.uploadCsv(result.data);
            
        }});

    };

    fileReader.readAsText(this.file);

    this.ngOnInit();

  }

  ExportCsv(){
    this.service.GetCsv().subscribe(res=>{
      console.log("alo", res);

      let blob:Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = "Recipe.csv";
      a.href = window.URL.createObjectURL(blob);
      a.click();
      return res;
    });

  }



  ngOnInit() {

  }

}
