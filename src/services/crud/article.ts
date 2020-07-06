import { CrudService, ICrudOption, ICrudService } from "../crud";
import { Article } from "@m/article";
import {injectable} from 'inversify'
import { DIContainer, TYPES } from "..";
import mongoose from 'mongoose'
import { Book } from "@m/book";
export interface IArticleService extends ICrudService {
    like(data, option: ICrudOption): any
    readTrending(option?: {skip: number}): any
    readInterest(categories, options?: {skip: number}): any
}
@injectable()
export default class ArticleService extends CrudService<typeof Article> implements IArticleService {
    constructor() {
        super(Article)
    }
    async like(data, option: ICrudOption) {
        const {author} = data
        const article = await DIContainer.get<IArticleService>(TYPES.ArticleService).readItem(option)
        if (article) {
            const votes = article.votes || []
            const index = votes.findIndex(vote => vote.toString() === author.toString())
            console.info('9779 index', index)
            if(index !== -1) {
                votes.splice(index, 1)
            } else {
                console.info('9779 dislike')
                votes.push(author)
            }
            return await article.save()
        }
        return undefined
    }
    async readTrending(options = {skip: 0}) {
        const COMMENT_POINT = 1.5
        const VOTE_POINT = 1
        const LIMIT = 10
        const skip = options.skip
        // Get trendPoint by sum of comment size and vote size
       
        return await Article.aggregate([
            {
                $addFields: {
                    "trendPoint": {
                        $add : [
                            {$multiply: [{$size: "$comments"}, COMMENT_POINT]}, 
                            {$multiply: [{$size: "$votes"}, VOTE_POINT]}
                        ] 
                    }
                }
            }, 
            {
                $sort: {trendPoint: -1}
            },
            {
                $skip: skip
            },
            {
                $limit: LIMIT
            },
            {
                $lookup: {
                    from: "user",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $lookup: {
                    from: "book",
                    localField: "book",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $lookup: {
                    from: "comment",
                    localField: "comments",
                    foreignField: "_id",
                    as: "comments"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $unwind: "$book"
            },
            {
                    $project: {
                        author: {password: 0}
                    }
                },
            {
                $unwind: "$comments"
            },
            {
                $lookup: {
                    from: "user",
                    localField: "comments.author",
                    foreignField: "_id",
                    as: "comments.author"
                }
            },
            {
                $unwind: "$comments.author"
            },
            {
                $project: {
                    comments: {author: {password: 0}}
                }
            },
            {
                $group: {
                    _id: "$_id",
                    author: { "$first": "$author" },
                    title: { "$first": "$title" },
                    content: { "$first": "$content" },
                    book: { "$first": "$book" },
                    createdAt: { "$first": "$createdAt" },
                    updatedAt: { "$first": "$updatedAt" },
                    type: { "$first": "$type" },
                    votes: { "$first": "$votes" },
                    trendPoint: { "$first": "$trendPoint" },
                    comments: { $push: "$comments" },
                }
            },
            {
                $sort: {trendPoint: -1}
            }
        ])
    }
    async readInterest(categories, options = {skip: 0}) {
        const LIMIT = 10
        const skip = options.skip || 0
        // await Book.aggregate([
        //     // get all books in categories, not in reads having rate number > 1
        //     {
        //         $match: { 
        //             categories: {$elemMatch: {$in: categories} }
        //         }
        //     },
        return await Article.aggregate([
            {
                $lookup: {
                    from: "book",
                    let: {bookId: "$book"},
                    pipeline: [
                        {
                            $match: {
                                categories: {
                                    $elemMatch: {$in: categories}
                                },
                                $expr: {
                                    $and: [
                                        
                                        {
                                            $eq: ["$$bookId", "$_id"]
                                        }
                                    ]
                                    
                                }
                                
                            }
                        }
                    ],
                    as: "book"
                }
            },
            {
                $match: { 
                    $expr: { $gt: [{$size: "$book"}, 0] }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: LIMIT
            },
            {
                $lookup: {
                    from: "user",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            // {
            //     $lookup: {
            //         from: "book",
            //         localField: "book",
            //         foreignField: "_id",
            //         as: "book"
            //     }
            // },
            {
                $lookup: {
                    from: "comment",
                    localField: "comments",
                    foreignField: "_id",
                    as: "comments"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $unwind: "$book"
            },
            {
                    $project: {
                        author: {password: 0}
                    }
                },
            {
                $unwind: "$comments"
            },
            {
                $lookup: {
                    from: "user",
                    localField: "comments.author",
                    foreignField: "_id",
                    as: "comments.author"
                }
            },
            {
                $unwind: "$comments.author"
            },
            {
                $project: {
                    comments: {author: {password: 0}}
                }
            },
            {
                $group: {
                    _id: "$_id",
                    author: { "$first": "$author" },
                    title: { "$first": "$title" },
                    content: { "$first": "$content" },
                    book: { "$first": "$book" },
                    createdAt: { "$first": "$createdAt" },
                    updatedAt: { "$first": "$updatedAt" },
                    type: { "$first": "$type" },
                    votes: { "$first": "$votes" },
                    comments: { $push: "$comments" },
                }
            },
            {
                $sort: {createdAt: -1}
            },
        ])
    }
}