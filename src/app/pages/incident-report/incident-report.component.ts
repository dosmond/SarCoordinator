import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import {NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'fury-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  htmltoPDF()
{
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#print-page")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

  });

}

printPage(){
  window.print();
}

downloadPDF()
{

  var node = document.getElementById('print-page');

  var img;
  var filename;
  var newImage;


  domtoimage.toPng(node, { bgcolor: '#fff' })

    .then(function(dataUrl) {

      img = new Image();
      img.src = dataUrl;
      newImage = img.src;

      img.onload = function(){

      var pdfWidth = img.width;
      var pdfHeight = img.height;

        // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

        var doc;

        if(pdfWidth > pdfHeight)
        {
          doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
        }
        else
        {
          doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
        }


        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();


        doc.addImage(newImage, 'PNG',  10, 10, width, height);
        filename = 'mypdf_' + '.pdf';
        doc.save(filename);

      };


    })
    .catch(function(error) {

     // Error Handling

    });



}

}
