import { PdfData } from './../../models/PdfData';
import { Input } from './../../models/Input';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'pdf-gen',
  templateUrl: './pdf-gen.component.html',
  styleUrls: ['./pdf-gen.component.scss']
})
export class PdfGenComponent implements OnInit {

  pdfSrc = "../../../assets/incident_form.pdf";
  readonly dpiRatio = 96 / 72;
  public myForm: FormGroup;

  public inputList: Input[] = [];


  constructor(private _fb: FormBuilder) {
    this.myForm = this._fb.group({});
 }

  ngOnInit() {
  }

  public getInputPosition(input: Input): any {
    return {
        top: `${input.top}px`,
        left: `${input.left}px`,
        height: `${input.height}px`,
        width: `${input.width}px`,
    };
  }

  private createInput(annotation: PdfData, rect: number[] = null) {
    let formControl = new FormControl(annotation.buttonValue || '');

    const input = new Input();
    input.name = annotation.fieldName;

    if (annotation.fieldType === 'Tx') {
        if(annotation.fieldName == "description")
          input.multiLine = true;
        input.type = 'text';
        input.value = annotation.buttonValue || '';
    }else if(annotation.fieldType ="Btn") {
      console.log(annotation);
      input.type = "checkbox";
      input.checked = true;
    }

    // Calculate all the positions and sizes
    if (rect) {
        input.top = rect[1] - (rect[1] - rect[3]);
        input.left = rect[0];
        input.height = (rect[1] - rect[3]);
        input.width = (rect[2] - rect[0]);
    }
    
    this.inputList.push(input);
    //console.log(this.inputList)
    return formControl;
  }

  private addInput(annotation: PdfData, rect: number[] = null): void {
    // add input to page
    this.myForm.addControl(annotation.fieldName, this.createInput(annotation, rect));
  }

  loadComplete(pdf: PDFDocumentProxy): void {
    for (let i = 1; i <= pdf.numPages; i++) {

        // track the current page
        let currentPage = null;
        pdf.getPage(i).then(p => {
            currentPage = p;

            // get the annotations of the current page
            return p.getAnnotations();
        }).then(ann => {

            // ugly cast due to missing typescript definitions
            // please contribute to complete @types/pdfjs-dist
            const annotations = (<any>ann) as PdfData[];
            console.log(ann)
            annotations
                .filter(a => a.subtype === 'Widget') // get the form field annotation only
                .forEach(a => {

                    // get the rectangle that represent the single field
                    // and resize it according to the current DPI
                    const fieldRect = currentPage.getViewport(this.dpiRatio)
                                                 .convertToViewportRectangle(a.rect);

                    // add the corresponding input
                    this.addInput(a, fieldRect);
                });
        });
    }
  }
}
