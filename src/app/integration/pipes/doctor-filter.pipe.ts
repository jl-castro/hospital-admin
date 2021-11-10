import {Pipe, PipeTransform} from '@angular/core';
import {DoctorI} from "../models/doctor.interface";

@Pipe({
  name: 'doctorFilter'
})
export class DoctorFilterPipe implements PipeTransform {

  transform(value: DoctorI[], arg: any, arg2: any): DoctorI[] {
    const resultFilter: DoctorI[] = [];
    switch (arg2) {
      case 'name': {
        value.forEach(doctor => {
          if (doctor.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
            resultFilter.push(doctor);
          }
        });
        return resultFilter;
      }
      case 'lastname': {
        value.forEach(doctor => {
          if (doctor.lastName.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
            resultFilter.push(doctor);
          }
        });
        return resultFilter;
      }
      default: {
        break;
      }
    }
    value.forEach(doctor => {
      if (doctor.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
        resultFilter.push(doctor);
      }
    });
    return resultFilter;
  }

}
