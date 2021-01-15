import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, interval } from "rxjs";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObserver: Subscription;
  constructor() { }

  ngOnInit() {
    this.firstObserver = interval(1000).subscribe(
      (increment) => {
        console.log(increment);
      }
    )
  }

  ngOnDestroy() {
    this.firstObserver.unsubscribe();
}
 
}
