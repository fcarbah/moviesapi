import { Document, Schema, model } from "mongoose";


export interface MovieInterface extends Document{
    title: String;
    format: String;
    length: Number;
    release_year: Number;
    rating: Number;

};

export const MovieSchema = new Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 50
    },
    format: {
        type: String,
        enum: ['DVD','STREAMING','VHS'],
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
    },

});

export const Movie = model<MovieInterface>("Movie", MovieSchema);