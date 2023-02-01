import { Component, Injectable, OnInit } from '@angular/core';
import { IRecipe } from '../interfaces/iRecipe';
import { RecipeService } from '../services/recipe.service';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

export interface DialogData {
  step: string;
}

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class TabViewComponent implements OnInit {

  counter:number = 1;
  ingr:string;
  step:string;
  data$: IRecipe[];

  constructor(public service : RecipeService, public dialog : MatDialog) {
    // this.data = []

    this.GetRecipes();
    this.ngOnInit();
  }

  AddIngredient(id, i :string){
    if (i=="")
      return;
    this.data$.forEach(element => {
        if(element.id == id)
        {
          element.ingredients = element.ingredients+";"+i;

        }
    });

    this.ingr = "";
  }

  // AddStep(item.id, ingredient.value){

  // }

  openDialog(id : string){
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(res=> {
      if(res == null || res == "")
        return;
      console.log("dialog closed");

      this.data$.forEach(element => {
        if (element.id==id)
        {
          element.steps = element.steps+";"+res;
        }
      });
    })
  }

  checkComplete(i:number){
    return (this.counter-1<i);
  }

checkBox( i:number){
  return !(this.counter-2==i||this.counter-1==i);
}

checked(e:boolean){
  if(e){
    this.counter++;
    console.log(this.counter);
    return;
  }

  this.counter--
  console.log(this.counter);
  return;

}

async RemoveRecipe(Id:string){

  let removed = await this.service.RemoveRecipe(Id).toPromise();

  console.log("removed", removed);
  this.ngOnInit();
  // alert(Id);
}

GetRecipes(){

  this.service.GetRecipes().subscribe(data=>{
    console.log("retreiving data", data)
    this.data$ = data;

  });

}

UpdateRecipe(recipe: IRecipe){
  this.service.UpdateRecipe(recipe);
}

  ngOnInit() {
    this.GetRecipes();
    this.service.Refresh.subscribe(res =>{
      console.log("intin?");
      this.GetRecipes();
    });
  }

}
