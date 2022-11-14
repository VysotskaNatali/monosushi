import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
})
export class AdminDiscountComponent implements OnInit {
  public adminDiscounts!: IDiscountResponse[];
  public editStatus = false;
  public show = true;
  public discountForm!: FormGroup;
  public currentId!: number;
  public isUploaded = false;
  private currentCategoryId = 0;
  public uploadPercent = 0;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.initDiscountForm();
    this.getDiscounts();
    
  }

  getDiscounts(): void {
    this.discountService.getAll().subscribe((data) => {
      this.adminDiscounts = data;
    });
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: ['../../../assets/content.png', Validators.required],
      data: [new Date()],
    });
  }

  addActions(): void {
    this.show = !this.show;
  }

  saveActions(): void {
    this.show = true;

    if (this.editStatus) {
      this.discountService
        .update(this.discountForm.value, this.currentId)
        .subscribe((data) => {
          this.getDiscounts();
        });
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts();
      });
    }
    this.editStatus = false;
    this.isUploaded = false;
    this.discountForm.reset();
    this.discountForm.patchValue({ data: new Date() });
  }

  editDiscount(discount: IDiscountResponse): void {
    this.editStatus = true;
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
      data: new Date(),
    });
    this.show = false;
    this.editStatus = true;
    this.currentId = discount.id;
  }
  
  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() =>{
      this.getDiscounts();
    })
  }
   //firebase
   upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('discounts', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      
      .catch(err => {
        console.log(err);
      })
   
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        
        const storageRef = ref(this.storage, path);
        
        const task = uploadBytesResumable(storageRef, file);
        
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress 
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
