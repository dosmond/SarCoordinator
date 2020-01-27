export interface PdfData {
    contents: string;
    id: string;
    annotationType: number;
    fieldName: string;
    fieldValue: string;
    alternativeText: string;
    defaultAppearance: string;
    fieldType: string;
    fieldFlags: number;
    readOnly: boolean;
    textAlignment: number;
    maxLen: number;
    multiLine: boolean;
    comb: boolean;
    subtype: string;
    rect: number[]; // [x1, y1, x2, y2]
    annotationFlags: any; // todo
    color: number[]; // [r,g,b]
    borderWidth: number;
    hasAppearance: boolean;
    buttonValue: string;
}