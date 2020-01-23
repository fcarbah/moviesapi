import {MovieViewModel} from '../models/movie';
import { ImdbApiWrapper } from './imdbapi';
import NodeCache from 'node-cache';
import { MovieValidator } from './movievalidator';

export class MovieTransformer{

    protected api: ImdbApiWrapper;
    protected cache:NodeCache;

    constructor(){
        this.api = new ImdbApiWrapper();
        this.cache = new NodeCache();
    }

    public async transformCollection(collection: any[]){
        const newCollection: MovieViewModel[] = [];

        for(var i in collection){
            const mv = await this.transform(collection[i]);
            newCollection.push(mv);
        }

        return newCollection;
    }

    public  async transform(movie: any) :Promise<MovieViewModel | null>{

        if(!movie){
            return null;
        }

        const mv = new MovieViewModel();
        mv.format = movie.format;
        mv.title = movie.title;
        mv.rating = movie.rating;
        mv.id = movie.movie_id;
        mv.release_year = movie.release_year;
        mv.length = movie.length;
        mv.poster = await this.getPoster(movie.title)

        return mv;
    }

    protected async getPoster(title:string) : Promise<String>{

        if(this.cache.has(title)){
            return this.cache.get(title);
        }

        const poster = await this.api.getMoviePoster(title);

        this.cache.set(title,poster,600);

        return poster;

    }

}

const movieTransformer = new MovieTransformer();
export default movieTransformer;