import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { IRecipe } from '../interfaces/iRecipe';
import { TabViewComponent } from '../tab-view/tab-view.component';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  readonly BASE_URL = "https://localhost:7224/api";

  data: IRecipe[];

constructor(public http: HttpClient ) {
  this.data = []
}

refresh = new Subject<void>();

get Refresh(){
    return this.refresh;
}

UpdateRecipe(recipe){
  this.http.put(this.BASE_URL+"/Recipe/"+recipe.id, recipe)
  .subscribe(res =>{
    console.log(res);
    alert("recipe saved");
  });

}


GetRecipes() : Observable<IRecipe []> {
  console.log(this.http.get<IRecipe []>(this.BASE_URL+"/Recipe"))
 return this.http.get<IRecipe []>(this.BASE_URL+"/Recipe");

}

GetCsv(){
  return this.http.get(this.BASE_URL+"/Recipe/CSV",{
    observe:'response',
    responseType:'blob'
  });
}

RemoveRecipe(Id){
  return this.http.delete(this.BASE_URL+`/Recipe/${Id}`);
}

async uploadCsv(arr :any) {

  console.log("uploadCsv", JSON.stringify(arr));

  arr.forEach(async (recipe :any)=> {

    if(recipe[0].toString()=="")
      return null;

    let body : IRecipe = {
      name: recipe[0],
      ingredients : recipe[1],
      steps : recipe[2]

    }

    console.log("body", JSON.stringify(body))

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': '*/*',

    }


    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
      // console.log(this.http.post<string>(this.BASE_URL+"/Recipe", JSON.stringify(body), requestOptions));
     return this.http.post (this.BASE_URL+"/Recipe", JSON.stringify(body), requestOptions).subscribe(res =>{
      this.Refresh.next();
     })

  });


}

}
