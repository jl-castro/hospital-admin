import {Pipe, PipeTransform} from '@angular/core';
import {PatientI} from "../models/patient.interface";

@Pipe({
  name: 'patientFilter'
})
export class PatientFilterPipe implements PipeTransform {

  transform(value: PatientI[], arg: any, arg2: any): PatientI[] {
    const resultFilter: PatientI[] = [];
    switch (arg2) {
      case 'name': {
        value.forEach(patient => {
          if (patient.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
            resultFilter.push(patient);
          }
        });
        return resultFilter;
      }
      case 'lastname': {
        value.forEach(patient => {
          if (patient.lastName.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
            resultFilter.push(patient);
          }
        });
        return resultFilter;
      }
      default: {
        break;
      }
    }
    value.forEach(patient => {
      if (patient.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
        resultFilter.push(patient);
      }
    });
    return resultFilter;
  }

}
