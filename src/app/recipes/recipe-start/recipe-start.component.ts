import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-recipe-detail-wrapper',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // если роут нужный не показываем заглушку иначе - показываем
  }
}
