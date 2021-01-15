import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, interval, Observable } from "rxjs";

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
        if (count > 3) {
          observer.error(Error("Your count is greater than 3"));
        }
      }, 1000);
    });

    this.firstObserver = scratchObserver.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.firstObserver.unsubscribe();
  }
}
