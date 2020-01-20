import { Document, Schema, model } from "mongoose";
import config from "config";
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const conn = mongoose.createConnection(config.get('mongodb.uri'),{ useNewUrlParser: true, useUnifiedTopology: true });

autoIncrement.initialize(conn);

export interface MovieInterface extends Document{
    title: String;
    format: String;
    length: Number;
    release_year: Number;
    rating: Number;

};

export class MovieViewModel{

    title: String;
    format: String;
    length: Number;
    release_year: Number;
    rating: Number;
    id: Number;

}

export const MovieSchema = new Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 50,
        index: true,
        unique: true,
        match: new RegExp('^([a-z]|\d)','i')
    },
    format: {
        type: String,
        enum: ["DVD","STREAMING","VHS"],
        uppercase: true
    },
    length: {
        type: Number,
        min: 0,
        max: 500
    },
    release_year: {
        type: Number,
        min: 1800,
        max: 2100
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }

});


MovieSchema.plugin(autoIncrement.plugin,{model:'Movie',field:'movie_id', startAt: 1, incrementBy: 1});
MovieSchema.plugin(mongoosePaginate);

export const Movie = model("Movie", MovieSchema);