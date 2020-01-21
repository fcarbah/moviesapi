import AppResponse from '../classes/appresonse';
import config from 'config';
import { MovieInterface, Movie, MovieSchema } from '../models/movie';
import movieValidator from '../classes/movievalidator';
import movieTransformer from '../classes/movieTransformer';

class MovieController{

    protected response: AppResponse;
    protected obj: any;
    protected config: any;

    constructor(){
        this.config = config.get('movie');
    }

    async create(obj: MovieInterface): Promise<AppResponse>{

        if(!movieValidator.validate(obj)){
            return AppResponse.error(movieValidator.getErrorMessages().join("\n"),10);
        }

        const movie = new Movie(obj);

        try{
            
            const dbResponse = await Movie.create(movie)

            const mv = await movieTransformer.transform(dbResponse);

            return AppResponse.success(`Movie: "${movie.title}" created successfully`,mv);
        }
        catch(error){
            return AppResponse.error(error.message,50);
        }
        finally{

        }

    }

    async delete(id: Number): Promise<AppResponse>{

        try{

            const movie = await Movie.findOne({movie_id: id});

            if(!movie){
                return AppResponse.error("Invalid Movie",40)
            }

            const dbResponse = await Movie.deleteOne(movie);

            return AppResponse.success(`Movie: "${movie.title}" (ID: ${id}) deleted successfully`);

        }
        catch(error){
            return AppResponse.error(error.message,50);
        }
        finally{

        }

    }

    
    async get(id: Number): Promise<AppResponse>{

        try{

            const movie = await Movie.findOne({movie_id: id});

            if(!movie){
                return AppResponse.error("Movie not found",40)
            }

            const mv = await movieTransformer.transform(movie);

            return AppResponse.success(``,mv);

        }
        catch(error){
            return AppResponse.error(error.message,50);
        }
        finally{

        }

    }

    async index(query: any = {}): Promise<AppResponse>{

        try{
            const paginationOptions = this.getPaginationOptions(query);

            const movies = await Movie.paginate({},paginationOptions);

            const collection = await movieTransformer.transformCollection(movies.docs);

            const paginator = {movies: collection,page:movies.page,pages: movies.totalPages,limit: movies.limit,total: movies.totalDocs,offset:movies.offset};

            return AppResponse.success('',paginator);
        }
        catch(error){
            return AppResponse.error(error.message,50);
        }
        finally{

        }

    }

    async update(id: Number,obj: MovieInterface): Promise<AppResponse>{
        
        try{

            const movie = await Movie.findOne({movie_id: id});

            if(!movieValidator.validate(obj)){
                return AppResponse.error(movieValidator.getErrorMessages().join("\n"),10);
            }

            if(!movie){
                return AppResponse.error("Invalid Movie",40)
            }

            const dbResponse = await Movie.findOneAndUpdate({movie_id: id},obj,{new: true});

            const mv = movieTransformer.transform(dbResponse);

            return AppResponse.success(`Movie: "${movie.title}" (ID: ${id}) updated successfully`,mv);

        }
        catch(error){
            return AppResponse.error(error.message,50);
        }
        finally{

        }
    }

    protected getPaginationOptions(query: any): any{

        const paramConfig :any = config.get('movie.pagination');

        return {
            page: query.page? (query.page >= paramConfig.page.min? query.page : paramConfig.page.default ) : paramConfig.page.default,
            limit: query.limit? ( paramConfig.limit.allowed.indexOf(query.limit) >=0? query.limit : paramConfig.limit.default ) : paramConfig.limit.default,
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