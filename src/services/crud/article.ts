import { CrudService, ICrudOption, ICrudService } from "../crud";
import { Article } from "@m/article";
import {injectable} from 'inversify'
import { DIContainer, TYPES } from "..";
import mongoose from 'mongoose'
export interface IArticleService extends ICrudService {
    like(data, option: ICrudOption): any
    readTrending(): any
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
    async readTrending() {
        const COMMENT_POINT = 1.5
        const VOTE_POINT = 1
        const LIMIT = 2
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
                $limit: 1
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
                    from: "comment",
                    localField: "comments",
                    foreignField: "_id",
                    as: "comments"
                }
            },
            // {
            //     $graphLookup: {
            //         from: "user",
            //         startWith: "$comments",
            //         connectFromField: "comments",
            //         connectToField: "_id",
            //         as: "author2",
            //         depthField: "author"
            //      }
            // },
            {
                $unwind: "$author"
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
                    comments: { "$first": "$comments" },
                }
            }
            // {
            //     $project: {
            //         author: {password: 0}
            //     }
            // }
        ])
    }
}