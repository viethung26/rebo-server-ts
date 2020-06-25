import { CrudService, ICrudService } from "../crud";
import { Item } from "@m/item";
import {injectable} from 'inversify'
export interface IItemService extends ICrudService {
}
@injectable()
export default class ItemService extends CrudService<typeof Item> implements IItemService {
    constructor() {
        super(Item)
    }
}