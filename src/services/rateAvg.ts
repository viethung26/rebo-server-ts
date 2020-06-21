import { Rate } from "@m/rate"
import { Book } from "@m/book"
import {Schema} from "mongoose"
export interface IRateAvgService {

}
const {ObjectId} = Schema.Types
export default class RateAvgService implements IRateAvgService {
    async bestRate (data) {
        const {categories} = data
        const books = Book.aggregate([
            {
                $match: { 
                    categories: {$elemMatch: {$in: [new ObjectId("5ed7768df17193326a07f8d1")]} },
                    rates: {$exists: true},
                    $expr: { $gte: [{$size: "$rates"}, 1] }
                }
            },
            {
                $lookup: {
                    from: "rate",
                    localField: "rates",
                    foreignField: "_id",
                    as: "rates"
                }
            },
            {
                $addFields: {
                    rateAvg: { $avg: "$rates.star"}
                }
            }, 
            {
                $sort: {rateAvg: -1}
            }
        ])
        const result = await Rate.aggregate([
            {

            }
        ])

    }
}