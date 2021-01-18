import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { filter, map, skip } from "rxjs/operators"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObserver: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObserver = interval(1000).subscribe(
    //   (increment) => {
    //     console.log(increment);
    //   }
    // )
    const scratchObserver = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        count++;
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(Error("Your count is greater than 3"));
        }
      }, 1000);
    });

    this.firstObserver = scratchObserver.pipe(filter(
      (data)=>{
        return data > 0;
      }
    ) , map((data:number)=>{
      return "Round: " + (data ) ;
    }), skip(2)).subscribe((data) => {
      console.log(data);
    }, (error) => {
        console.log(error);
        prompt(error.message);  
    }, () => {
      console.log('complete');
      
    });
  }

  ngOnDestroy() {
    this.firstObserver.unsubscribe();
  }
}
