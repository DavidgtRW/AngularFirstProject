import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoggingService{

    lastlog: string;

    printLog(meesasge: string){
        console.log(meesasge);
        console.log(this.lastlog);
        this.lastlog = meesasge;
    }
}