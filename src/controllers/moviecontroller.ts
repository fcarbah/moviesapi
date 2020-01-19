import AppResponse from '../classes/appresonse';

class MovieController{

    response: AppResponse;

    create(): AppResponse{
        return this.response;
    }

    delete(): AppResponse{
        return this.response;
    }

    index(): AppResponse{
        return this.response;
    }

    update(): AppResponse{


        return this.response;
    }

    protected validate(): boolean{
        return true;
    }

}

const movieCtrl = new MovieController();

export default movieCtrl;