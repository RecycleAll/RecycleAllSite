import {formatDate} from "@angular/common";


export function dateToStringDisplay(date: Date){
  return formatDate(date, 'yyyy-MM-dd HH:mm', 'fr')
}

export function dateToStringForms(date: Date){
  return formatDate(date, 'yyyy-MM-ddTHH:mm', 'fr')
}
