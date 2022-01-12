import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-searh-history-filter',
  templateUrl: './searh-history-filter.component.html',
  styleUrls: ['./searh-history-filter.component.scss']
})
export class SearhHistoryFilterComponent implements OnInit {

  constructor() { }

  @ViewChild("datepickerend") datePickerEnd:MatDatepicker<Date>;
  @ViewChild("datepickerstart") datePickerStart:MatDatepicker<Date>;

  typesFilter:{value:string,str:string}[]=[
    {
      value: "MEAT",
      str:"Carnicos"
    },
    {
      value: "DRIEF",
      str:"Secos"
    },
    {
      value: "PACKING",
      str:"Empaques"
    },
    {
      value: "PRODUCT_ENDED",
      str: "Producto terminado"
    }
  ];

  @Output("emitter") emiter:EventEmitter<any>=new EventEmitter();

  @Input("_isLoading") set _isLoading(isLoading:boolean){
    this.isLoading=isLoading;
  }

  isLoading:boolean=false;

  dateStartStr:string="";
  dateEndStr:string="";

  get type(){
    return this.form.get("type");
  }
  get lote(){
    return this.form.get("lote");
  }
  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      lote: new FormControl(null,Validators.required),
      type: new FormControl("meat",Validators.required)
    });
    this.form.get("type").valueChanges.subscribe((val)=>{
      console.log("Value: "+JSON.stringify(val));
    }); 
    let dateStr = this.parseDate(new Date());
    this.dateStartStr=dateStr;
    this.dateEndStr=dateStr;
  }


  dateEndChange(event:any){
    console.log("JSON:"+event.value);
    let dateStr = this.parseDate(new Date(event.value));
    this.dateEndStr=dateStr;
  }
  dateStartChange(event:any){
    console.log("JSON:"+event.value);
    let dateStr = this.parseDate(new Date(event.value));
    this.dateStartStr=dateStr;
  }

  parseDate(date:Date){
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    if(+month<10) month="0"+month;
    if(+day<10) day="0"+day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  parseDateStr(date:string){
    let dateSplited = date.split("-");
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
  openStartDate(){
    this.datePickerStart.open();
  }

  openEndDate(){
    this.datePickerEnd.open();
  }

  search(){
    if(!this.isLoading){
    console.log("Valid:"+this.form.valid);
    if(this.form.valid){
      this.emiter.emit({dateStart:this.dateStartStr,dateEnd:this.dateEndStr,type:this.type.value,lot:this.lote.value});
    }
  }
  }

}
