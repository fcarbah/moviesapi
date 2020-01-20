import {MovieViewModel} from '../models/movie';

export default class MovieTransformer{

    public static transformCollection(collection: any[]){
        const newCollection: MovieViewModel[] = [];

        collection.forEach(item => {
            newCollection.push(MovieTransformer.transform(item));
        })

        return newCollection;
    }

    public static transform(movie: any) :MovieViewModel | null{

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

        return mv;
    }

}