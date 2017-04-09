import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
	private recipes: Recipe[] = [
	    new Recipe("Schnitzel", "Very tasty", "http://www.partynet.at/images/blog/37497/wiener-schnitzel-04.jpg", 
	    	[new Ingredient('French Fries', 2),
	    	 new Ingredient('Pork', 1)
	    	]),
	    new Recipe("Summer Salad", "Okayish", "http://www.noelpiepgrass.com/wp-content/uploads/2014/12/salad.jpg", [])
    ];

  constructor(private http: Http) { }

  getRecipes() {
    console.log(this.recipes);
  	return this.recipes;
  }

  getRecipe(id: number) {
  	return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
  	this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    return this.http.put('https://recipebook-d17f6.firebaseio.com/recipes.json', 
      body, 
      {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipebook-d17f6.firebaseio.com/recipes.json')
              .map((response: Response) => response.json())
              .subscribe(
                (data: Recipe[]) => {
                  this.recipes = data;
                  this.recipesChanged.emit(this.recipes);
                }
              );
  }
}
