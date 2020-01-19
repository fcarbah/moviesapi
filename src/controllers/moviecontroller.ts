import AppResponse from '../classes/appresonse';
import config from 'config';
import { MovieInterface, Movie, MovieSchema } from '../models/movie';
import movieValidator from '../classes/movievalidator';
import DBConnector from '../database/connector';
import MovieTransformer from '../classes/movieTransformer';

class MovieController{

    protected response: AppResponse;
    protected obj: any;
    protected config: any;
    protected messages : String[];

    constructor(){
        this.config = config.get('movie');
        this.messages = [];
        DBConnector.connect();
    }

    async create(obj: MovieInterface): Promise<AppResponse>{

        if(!movieValidator.validate(obj)){
            return AppResponse.error(movieValidator.getErrorMessages().join("\n"),200);
        }

        const movie = new Movie(obj);

        try{
            const dbResponse = await Movie.create(movie)

            return AppResponse.success(`Movie: "${movie.title}" created successfully`,MovieTransformer.transform(dbResponse));
        }
        catch(error){
            return AppResponse.error(error.message,510);
        }
        finally{
            //DBConnector.disconnect();
        }

    }

    async delete(id: string): Promise<AppResponse>{

        try{
            let movieId = parseInt(id);
            const movie = await Movie.findOne({movie_id: movieId});

            if(!movie){
                return AppResponse.error("Invalid Movie",204)
            }

            const dbResponse = await Movie.deleteOne(movie);

            return AppResponse.success(`Movie: "${movie.title}" (ID: ${id}) deleted successfully`,MovieTransformer.transform(dbResponse));

        }
        catch(error){
            return AppResponse.error(error.message,500);
        }
        finally{

        }

    }

    
    async get(id: string): Promise<AppResponse>{

        try{
            let movieId = parseInt(id);
            const movie = await Movie.findOne({movie_id: movieId});

            return AppResponse.success(``,MovieTransformer.transform(movie));

        }
        catch(error){
            return AppResponse.error(error.message,500);
        }
        finally{

        }

    }

    async index(query: any = {}): Promise<AppResponse>{

        try{
            const paginationOptions = this.getPaginationOptions(query);
            console.log(paginationOptions);
            const movies = await Movie.paginate({},paginationOptions);

            const collection = MovieTransformer.transformCollection(movies.docs);

            const paginator = {movies: collection,page:movies.page,pages: movies.totalPages,limit: movies.limit,total: movies.totalDocs,offset:movies.offset};

            return AppResponse.success('',paginator);
        }
        catch(error){
            return AppResponse.error(error.message,500);
        }
        finally{
            //DBConnector.disconnect();
        }

    }

    async update(id:string,obj: MovieInterface): Promise<AppResponse>{
        
        try{
            let movieId = parseInt(id);
            const movie = await Movie.findOne({movie_id: movieId});

            if(!movieValidator.validate(obj)){
                return AppResponse.error(movieValidator.getErrorMessages().join("\n"),204);
            }

            if(!movie){
                return AppResponse.error("Invalid Movie",204)
            }

            const dbResponse = await Movie.updateOne(movie,obj);

            return AppResponse.success(`Movie: "${movie.title}" (ID: ${id}) updated successfully`,MovieTransformer.transform(dbResponse));

        }
        catch(error){
            return AppResponse.error(error.message,500);
        }
        finally{

        }
    }

    protected getPaginationOptions(query: any): any{
        console.log(query);
        const paramConfig :any = config.get('movie.pagination');

        return {
            page: query.page? (parseInt(query.page) >= paramConfig.page.min? parseInt(query.page) : paramConfig.page.default ) : paramConfig.page.default,
            limit: query.limit? ( paramConfig.limit.allowed.indexOf(parseInt(query.limit)) >=0? parseInt(query.limit) : paramConfig.limit.default ) : paramConfig.limit.default,
            sort: this.getSort(query,paramConfig)
        };
    }

    protected getSort(query: any,config: any):any{
        const field = query.sort? ( config.sort.allowed.indexOf(query.sort) >= 0? query.sort : config.sort.default ) : config.sort.default;
        const order = query.order? ( config.sort.order.indexOf(query.order) >= 0? query.order : config.sort.default_order ) : config.sort.default_order;
        
        let sort:any = {};
        sort[`${field}`] = order;

        return sort;
    }

}

const movieCtrl = new MovieController();
export default movieCtrl;