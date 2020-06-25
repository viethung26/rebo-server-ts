import { CrudRouter } from "@r/crud"
import { itemController, ItemController } from "@c"
export default class ItemRouter extends CrudRouter <ItemController> {
    constructor() {
        // 9779 improvement: auto inject
        super(itemController)
    }
}