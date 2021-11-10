import {Pipe, PipeTransform} from '@angular/core';
import {HospitalI} from "../models/hospital.interface";

@Pipe({
  name: 'hospitalFilter'
})
export class HospitalFilterPipe implements PipeTransform {

  transform(value: HospitalI[], arg: string): HospitalI[] {
    const resultFilter: HospitalI[] = [];
    value.forEach(hospital => {
      if (hospital.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())) {
        resultFilter.push(hospital);
      }
    });
    return resultFilter;
  }

}
