import {Pipe, PipeTransform} from '@angular/core';
import { PostTerm } from '../model/term.interface';

@Pipe({name: 'termTaxonomyDisplayPipe'})
export class TermTaxonomyDisplayPipe implements PipeTransform {
  transform(wpTerm: PostTerm[]): string {
    if (!wpTerm) return null;

    let retVal: string[] = [];

    for(let term of wpTerm) {
        retVal.push(term.name);
    }   

    return retVal.join(", ");
  }
}