import CrudController from "../crud";
import { DIContainer, TYPES, ICrudService, RateService } from "@s";

export default class RateController extends CrudController<ICrudService> {
    constructor() {
        super(DIContainer.get<RateService>(TYPES.RateService))
    }
}