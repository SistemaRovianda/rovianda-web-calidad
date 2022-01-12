import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistorialService } from 'src/app/shared/Services/historial.service';

@Component({
  selector: 'app-modal-select-format',
  templateUrl: './modal-select-format.component.html',
  styleUrls: ['./modal-select-format.component.scss']
})
export class ModalSelectFormatComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{packId:number,type:number},
  private historyService:HistorialService,
  private matDialogRef:MatDialogRef<ModalSelectFormatComponent>) { }
  isLoading:boolean=false;
  ngOnInit(): void {
  }
  
  getExcel(){
    switch(this.data.type){
      case 1:
        if(!this.isLoading){
          this.isLoading=true;
          this.historyService.getReportHistoryTrazability(this.data.packId,"excel").subscribe((blob)=>{
            this.downloadFile(blob);
            this.isLoading=false;
          },(err)=>{
            this.isLoading=false;
          })
        } 
      break;
        
    }
  }
  getPdf(){
    switch(this.data.type){
      case 1:
        if(!this.isLoading){
          this.isLoading=true;
          this.historyService.getReportHistoryTrazability(this.data.packId,"pdf").subscribe((blob)=>{
            this.openReport(blob);
            this.isLoading=false;
          },(err)=>{
            this.isLoading=false;
          })
        }   
        break;
    }
  }

  openReport(response:any){
    let file = new Blob([response], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  downloadFile(data: any){
    var url = window.URL.createObjectURL(new Blob([data]));
     var a = document.createElement('a');
     document.body.appendChild(a);
     a.setAttribute('style', 'display: none');
     a.href = url;
     a.download = `Trazabilidad.xlsx`;
     a.click();
     window.URL.revokeObjectURL(url);
     a.remove(); // remove the element
   }
  cancel(){
    this.matDialogRef.close();
  }

}
