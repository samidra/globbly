import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from './contact-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'Globby';
  isScrolled = false;
  enquiry_form: any
  constructor(private fb: FormBuilder, private contact_service: ContactServiceService){ 
    this.enquiry_form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]]
    }) as FormGroup;
  }

  show_small_menu = false
  toggleNav() {
    this.show_small_menu = !this.show_small_menu
  }


  get firstName() {
    return this.enquiry_form.get('firstName');
  }

  get lastName() {
    return this.enquiry_form.get('lastName');
  }

  get email() {
    return this.enquiry_form.get('email');
  }

  get phone() {
    return this.enquiry_form.get('phone');
  }

  onSubmit() {
    if (this.enquiry_form.valid) {
      const body = {
        firstName: this.firstName.value,  // Access the value of the form control
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value
      }
      console.log('Form Submitted!', body);
      this.contact_service.submit_query(body).subscribe((res:any)=>{
        console.log(res);
      })
    } else {
      this.enquiry_form.markAllAsTouched(); // Marks all fields to show validation errors
    }
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {
      if (window.pageYOffset > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }

  showcontent(elementId: string): void {
    const scrollTarget = document.getElementById(elementId);
    const scrollDistance = scrollTarget!.offsetTop - (window.innerHeight/2) + 25

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });

  }


  Categories = [
    'Industrial Automation', 'Healthcare Automation', 'Power Supplies', 'Network Security',
    'Industrial Computing', 'Process Control'
  ]
  
}
