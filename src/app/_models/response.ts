import { Dragon } from '../_models/dragon';
import { IResponse } from '../_interfaces/response';

export class Response implements IResponse {
    items: Dragon[];
    _metadata: any;
}
