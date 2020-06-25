import { CrudService, ICrudService } from "../crud";
import { Book } from "@m/book";
import {injectable} from 'inversify'
import {Types} from "mongoose"
const {ObjectId} = Types

export interface IBookService extends ICrudService {
    recommend(categories: String[], reads: String[]): any
    readTrending(option: {skip: number}): any
}
@injectable()
export default class BookService extends CrudService<typeof Book> implements IBookService {
    constructor() {
        super(Book)
    }
    async recommend(categories, reads) {
        const MIN_RATE_SIZE = 1
        const MAX_BOOK_SIZE = 10
        categories = categories.map(cid => new ObjectId(cid))
        reads = reads.map(bookId => new ObjectId(bookId))
        return await Book.aggregate([
            // get all books in categories, not in reads having rate number > 1
            {
                $match: { 
                    _id: {$nin: reads},
                    categories: {$elemMatch: {$in: categories} },
                    rates: {$exists: true},
                    $expr: { $gte: [{$size: "$rates"}, MIN_RATE_SIZE] }
                }
            },
            // join with rate collection
            {
                $lookup: {
                    from: "rate",
                    localField: "rates",
                    foreignField: "_id",
                    as: "rates"
                }
            },
            // caculate average rate star for each book
            {
                $addFields: {
                    rateAvg: { $avg: "$rates.star"}
                }
            }, 
            {
                $sort: {rateAvg: -1}
            },
            {
                $limit: MAX_BOOK_SIZE
            }
        ])
    }
    // 9779 check later
    async readTrending(options = {skip: 0}) {
        const MIN_RATE_SIZE = 1
        const MAX_BOOK_SIZE = 10
        return await Book.aggregate([
            // get all books in categories, not in reads having rate number > 1
            {
                $match: { 
                    rates: {$exists: true},
                    $expr: { $gte: [{$size: "$rates"}, MIN_RATE_SIZE] }
                }
            },
            // join with rate collection
            {
                $lookup: {
                    from: "rate",
                    localField: "rates",
                    foreignField: "_id",
                    as: "rates"
                }
            },
            // caculate average rate star for each book
            {
                $addFields: {
                    rateAvg: { $avg: "$rates.star"}
                }
            }, 
            {
                $sort: {rateAvg: -1}
            },
            {
                $limit: MAX_BOOK_SIZE
            }
        ])
    }
}