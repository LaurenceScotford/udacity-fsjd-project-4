import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectMessage } from "../message.selectors";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
    message: string;
    messageType: 'confirm' | 'warn' | 'none';
    datetime: number;
    messageSub: Subscription | null | undefined;

    constructor(public store: Store) {
        this.message = '';
        this.messageType = 'none';
        this.datetime = 0;
    }

    ngOnInit(): void {
        // Subscription to get current message
        this.messageSub = this.store.select(selectMessage)
            .subscribe(message => {
                this.message = message.message;
                this.messageType = message.messageType;
                this.datetime = message.datetime;
            }
            );
    }

    ngOnDestroy(): void {
        this.messageSub?.unsubscribe();
        this.messageSub = null;
    }
}