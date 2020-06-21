import { CrudRouter } from "@r/crud";
import { rateController, RateController } from "@c";
export default class RateRouter extends CrudRouter <RateController> {
    constructor() {
        // 9779 improvement: auto inject
        super(rateController)
    }
}