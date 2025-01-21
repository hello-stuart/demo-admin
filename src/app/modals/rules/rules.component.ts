import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { BackendService } from "../../services/backend.service";
import { ActivatedRoute } from "@angular/router";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { CONFIG } from "../../../../config";

@Component({
  selector: "app-rules",
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: "./rules.component.html",
  styleUrl: "./rules.component.css",
})
export class RulesComponent {
  showFancy: boolean = false;
  sportId: any;
  sub!: Subscription;
  rulesInfo: any[] = []; //with bookmaker/fancy content
  updatedRuleInfo:any=[]; // without bookmaker/fancy
  showGeneral: boolean[] = Array(this.rulesInfo.length).fill(false);
  matchEl:any;
  bookmakerEl:any;
  fancyEl:any;
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute
  ) {
    // this.route.params.subscribe(params => {
    //   this.sportId = params['id'];
    // });
  }

  ngOnInit(): void {
    this.gameRulesList();
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
  showRules() {
    this.showFancy = !this.showFancy;
  }
  gameRulesList() {
    this.backendService
      .getAllRecordsByPost(CONFIG.sportsRulesList, {})
      .subscribe(
        (data:any) => {
          if (data.meta.status === true) {
            // Filter out objects where specific properties are undefined in the first index
            this.rulesInfo = data.data.filter((item: any, index: number) => {
              if (index === 0) {
                // Check if required properties are undefined in the first index
                return (
                  item.sportID !== undefined &&
                  item.sportName !== undefined &&
                  item.Rules !== undefined
                );
              }
              return true; // Include other indexes without filtering
            });
            
            this.rulesInfo.forEach((item)=>{
              if(this.isRuleEl(item,'bookmaker') && this.isRuleEl(item, 'fancy')){
                this.matchEl=this.getRuleEl(item,'general')
                // this.updatedRuleInfo=this.removePartFromInnerHTML(item.rules,removeEl)
              }
              
              if(this.isRuleEl(item,'bookmaker')){
                this.bookmakerEl=this.getRuleEl(item,'bookmaker')
              } 
              if(this.isRuleEl(item,'fancy')){
                this.fancyEl=this.getRuleEl(item,'fancy')
              }
            })
            //testing code
          }
        },
        (error) => {
          console.error("Error fetching rules:", error);
        }
      );
  }
  showInfo(index: number): void {
    // Close all other elements
    for (let i = 0; i < this.showGeneral.length; i++) {
      if (i !== index) {
        this.showGeneral[i] = false;
      }
    }

    // Toggle visibility of the clicked element
    this.showGeneral[index] = !this.showGeneral[index];

    // Scroll to the clicked element
    // setTimeout(() => {
    //   document.getElementById("showInfo")?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "end"
    //   });
    // }, 1);
  }
  isRuleEl(rulesItem: any, key:string): boolean {
    let isEl: boolean = false;
    let tempDiv = document.createElement("div");
    let generalElement:any;
    tempDiv.innerHTML = rulesItem.rules;
    if (tempDiv !== null) {
      if(key==='bookmaker'){
        generalElement = Array.from(tempDiv.querySelectorAll("h3")).find(
          (h4) => {
            return h4.textContent && h4.textContent === "Cricket Bookmaker";
          }
        );
      }else if(key==='fancy'){
        generalElement = Array.from(tempDiv.querySelectorAll("h3")).find(
          (h4) => {
            return h4.textContent && h4.textContent.trim().includes("Fancy Bets");
          }
        );
      }
      // Output the found element
      if (generalElement) {
        isEl = true;
      } else {
        isEl = false;
      }
    }
    return isEl;
  }
  getRuleEl(rulesItem: any,key: string) {
    let el:any
    let tempDiv = document.createElement("div");
    
    let generalElement:any;
    tempDiv.innerHTML = rulesItem?.rules;
    if (tempDiv.innerHTML !== undefined) {
      if (key === 'bookmaker') {
        generalElement = Array.from(tempDiv.querySelectorAll("h3")).find(
          (h3) => h3.textContent && h3.textContent.trim() === "Cricket Bookmaker"
        );
        const parentEl = generalElement?.parentElement?.parentElement;
        if (parentEl) {
          const rulesDiv = parentEl.querySelector('.rules-content');
          if (rulesDiv) {
            rulesDiv.remove();
          }
          el = parentEl.innerHTML;
        }
      }
      else if(key==='fancy'){
        generalElement = Array.from(tempDiv.querySelectorAll("h3")).find(
          (h3) => {
            return h3.textContent && h3.textContent.trim().includes('Fancy Bets');
          }
        );
        el=generalElement?.parentElement?.parentElement?.parentElement.innerHTML
      } else if(key === 'general'){
        generalElement = Array.from(tempDiv.querySelectorAll("p")).find(
          (p) => {
            return p.textContent && p.textContent.trim().includes('Cricket General');
          }
        );
        el=generalElement?.parentElement.innerHTML
      }
    }
    return el;
  }
  removePartFromInnerHTML(innerHTML:any, partToRemove:any) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = innerHTML;
    const elementsToRemove = tempDiv.querySelectorAll(partToRemove);
    elementsToRemove.forEach(element => {
        element.remove(); 
    });
    return tempDiv.innerHTML;
}
}
