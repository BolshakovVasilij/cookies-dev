import { CommonModule, NgFor} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    NgFor,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //функция для скроллинга на выбранный элемент, в html в тег ссылки вставить функцию с указанием целевого элемента, целевой элемент пометить #
    currency = "$"
    productsData: any; 
    //Все данные берутся с сервера, поэтому в коде они закомментированы[
    //   //1
    //   {
    //     image:"1.png",
    //     title:"Лучшие друзья",
    //     text:"Печенье, с которого все началось! Наше фирменное печенье с шоколадной крошкой и грецкими орехами хрустящее снаружи с достаточно толстой и липкой серединкой.",
    //     price:20,
    //     basePrice:20,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //2
    //   {
    //     image:"2.png",
    //     title:"Шоколадный француз",
    //     text:"Это печенье, изготовленное из тёмного французского какао и полусладкой шоколадной стружки, наверняка удовлетворит даже самого заядлого любителя шоколада.",
    //     price:24,
    //     basePrice:24,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //3
    //   {
    //     image:"3.png",
    //     title:"всянка с изюмом, Сэр!",
    //     text:" Это сдобное маслянистое печенье весом шесть унций каждое, золотисто-коричневое снаружи, влажное внутри и наполненное пухлым сладким изюмом.",
    //     price:18,
    //     basePrice:18,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //4
    //   {
    //     image:"4.png",
    //     title:"Шоколадное наслаждение",
    //     text:"Идеально хрустящее снаружи и достаточно густое и липкое в центре, это печенье наполнено полусладкой и тёмной шоколадной стружкой, придающей богатую глубину вкуса.",
    //     price:24,
    //     basePrice:24,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //5
    //   {
    //     image:"5.png",
    //     title:"Арахисовый рай",
    //     text:"Сладкое, пикантное и идеально сбалансированное печенье удовлетворяет тягу любителей арахисового масла и шоколада.",
    //     price:20,
    //     basePrice:20,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //6
    //   {
    //     image:"6.png",
    //     title:"Шоколадный ореховый деликатес",
    //     text:"Наша фирменная рецептура печенья с шоколадными крошками и грецкими орехами гарантирует незабываемый вкусовой опыт. Каждое печенье хрустит снаружи, но раскрывает внутри нежную сердцевину.",
    //     price:18,
    //     basePrice:18,
    //     weight:"2 шт./ 200 гр.",
    //   },
    //   //7
    //   {
    //     image:"7.png",
    //     title:"Ассорти фирменного печенья",
    //     text:"Зачем выбирать один, когда можно получить их все? Наш классический ассортимент печенья включает в себя по одному из четырёх оригинальных вкусов печенья.",
    //     price:36,
    //     basePrice:36,
    //     weight:"4 шт./ 400 гр.",
    //   },
    //   //8
    //   {
    //     image:"8.png",
    //     title:"Лимонное печенье",
    //     text:"Весна уже не за горами, но нам не терпелось подарить вам немного солнечного света: наше первое лимонное печенье. Это лакомство жевательное, лимонное, не слишком сладкое и даже немного… освежающее?",
    //     price:33,
    //     basePrice:33,
    //     weight:"4 шт./ 400 гр.",
    //   },
    //   //9
    //   {
    //     image:"9.png",
    //     title:"Любители шоколада",
    //     text:"Вам больше не нужно выбирать фаворитов. Мы сделали этот набор для всех людей, которые действительно любят шоколад…",
    //     price:38,
    //     basePrice:38,
    //     weight:"4 шт./ 400 гр.",
    //   },
    //   //10
    //   {
    //     image:"10.png",
    //     title:"Карамель и кокос",
    //     text:"Побалуйте себя кокосовым, маслянистым, карамельным печеньем, которое обладает невиданным ранее вкусом и текстурой. Наслаждение круглый год.",
    //     price:33,
    //     basePrice:33,
    //     weight:"4 шт./ 400 гр.",
    //   },
    //   //11
    //   {
    //     image:"11.png",
    //     title:"Веганское с шоколадной крошкой",
    //     text:"Наше веганское безглютеновое печенье содержит кусочки хрустящих грецких орехов и полусладкую веганскую шоколадную стружку.",
    //     price:39,
    //     basePrice:39,
    //     weight:"4 шт./ 400 гр.",
    //   },
    //   //12
    //   {
    //     image:"12.png",
    //     title:"Крем-брюле ореховое печенье",
    //     text:"Используя уникальную смесь ингредиентов, мы создали печенье с кусочками крем-брюле и миндальными орехами, которое обещает неповторимые гастрономические ощущения. Каждый кусочек обладает хрустящей корочкой и тает во рту.",
    //     price:35,
    //     basePrice:35,
    //     weight:"4 шт./ 400 гр.",
    //   },
    // ];


 
    form = new FormGroup({
      product:new FormControl("",[Validators.required]),
      name:new FormControl("",[Validators.required]),
      phone:new FormControl("",[Validators.required])
    });

    constructor(private httpClient: HttpClient) { }

    ngOnInit(){
      this.httpClient.get("https://testologia.ru/cookies").subscribe(data => this.productsData = data);
    }

    scrollTo(target: HTMLElement, product?:any){
    target.scrollIntoView({behavior:"smooth"});
    if (product){
      this.form.patchValue({
        product:product.title + '(' + product.price +''+this.currency + ')'
      }
      )
    }
  }
changeCurrency(){
  let newCurrency = "$";
  let coefficient = 1;
  if(this.currency === "$") {
    newCurrency = "₽";
    coefficient = 90;
  } else if (this.currency ==="₽"){
    newCurrency = "BYN";
    coefficient = 3;
  } 
  else if (this.currency === 'BYN') {
    newCurrency = '€';
    coefficient = 0.9;
} else if (this.currency === '€') {
    newCurrency = '¥';
    coefficient = 6.9;
}
  this.currency = newCurrency;

  this.productsData.forEach((item:any) => {
    item.price=+(item.basePrice*coefficient).toFixed(1);
  });
}

confirmOrder(){
  if (this.form.valid){
    this.httpClient.post("https://testologia.ru/cookies-order", this.form.value)
      .subscribe({
        next:(response:any)=>{
          alert(response.message);
          this.form.reset();
        },
        error:(response:any)=>{
          alert(response.error.message);
        }
      });
  }
}



}
