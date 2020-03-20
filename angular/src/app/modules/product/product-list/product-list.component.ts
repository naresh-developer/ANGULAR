import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from 'src/app/_services/common-service';
import { Product } from 'src/app/_models/product';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit {
  products : Product;
  category : any =[];
  productForm: FormGroup;
  loading = false;
  submitted = false;
  productDialog :any;
  error = '';
  subscription = new Subscription();
  private productSearch: Subject<void> = new Subject();
  searchVal : any


  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private commonServiceService : CommonServiceService
  ) { }

  ngOnInit() {
    this.productList();
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productSku: ['', Validators.required],
      productPrice: ['', Validators.required]
      
  });

  this.productSearch
    .pipe(
      debounceTime(500),
      switchMap(() => {
      return this.commonServiceService.productList(this.searchVal);
    }))
    .subscribe((results: any) => {
      this.products = results.data;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  search(event){
    
    this.searchVal = event;
    this.productSearch.next()
  }
  

  productList(){
    const params = ''
    this.subscription.add(
    this.commonServiceService.productList(params).subscribe((val: any)=>{
      if(val.data.length){
        this.products = val.data;
      }
    }, error=>{
      console.log(error);
    })
  );
  }
 
  addProduct(content){
    this.productDialog = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
   
  }

  get control() { return this.productForm.controls; }
  
  onSubmit(){
    this.submitted = true;
    
            if (this.productForm.invalid) {
                return;
            }
    
            this.loading = true;
            this.subscription.add(
            this.commonServiceService.createProduct(this.productForm.value)
                .subscribe(
                    data => {
                        
                      this.productDialog.close();
                        this.productList();
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }));
        }

}

