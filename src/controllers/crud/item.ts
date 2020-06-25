import CrudController from "../crud";
import { DIContainer, TYPES, ItemService, IItemService } from "@s";

export default class ItemController extends CrudController<IItemService> {
    constructor() {
        super(DIContainer.get<ItemService>(TYPES.ItemService))
    }
}