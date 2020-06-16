import { CrudService, ICrudOption, ICrudService } from "../crud";
import { Article } from "@m/article";
import {injectable} from 'inversify'
import { DIContainer, TYPES } from "..";
import mongoose from 'mongoose'
export interface IArticleService extends ICrudService {
    like(data, option: ICrudOption): any
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
}