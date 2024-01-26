import { ParamMap } from '@angular/router';
export interface IUrlSegment {
  path: string;
  parameters: { [name: string]: string };
  parameterMap: ParamMap;
}
