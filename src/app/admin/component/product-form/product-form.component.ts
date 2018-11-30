import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import { take } from 'rxjs/operators';
//import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = <any>{};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService : ProductService) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
   }

   save(product) {
     if (this.id) this.productService.update(this.id, product);
     else 
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

   delete() {
     if (!confirm('Are you sure?')) return;
    
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
     
   }

  ngOnInit() {
  }

}
