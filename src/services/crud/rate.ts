import { CrudService } from "../crud";
import { Rate } from "@m/rate";
import {injectable} from 'inversify'

@injectable()
export default class RateService extends CrudService<typeof Rate> {
    constructor() {
        super(Rate)
    }
    async getRateAvg () {
        
    }
}