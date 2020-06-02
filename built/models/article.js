"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var articleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    collection: 'article'
});
exports.Article = mongoose_1.default.model('Article', articleSchema);
