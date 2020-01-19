import { MovieInterface } from "../models/movie";
import validator from 'validator';
import config from 'config';

export class MovieValidator{

    private config: any;
    private errors: String[];

    constructor(){
        this.config = config.get('movie.validation')
        this.errors = [];
    }

    validate(obj: MovieInterface){

        if(this.validateFields(obj)){

            return this.validateFieldsValues(obj);
        }

        return false;
    }

    getErrorMessages() : String[]{
        return this.errors;
    }

    protected runValidator(ruleSet: any,param:any): boolean{

        let method:string = ruleSet.method;

        switch(method){
            case 'isInt':
                return validator.isInt(param.toString(),ruleSet.arg);
            case 'isLength':
                return validator.isLength(param.toString(),ruleSet.arg);
            case 'matches':
                return validator.matches(param,new RegExp(ruleSet.arg,'i'));
            default :
                throw new Error("Invalid Validation Method specified");
        }
    }

    protected validateFields(obj: MovieInterface) : boolean{

        let pass = true;

        for(var i in this.config){
            if((<any>obj)[i] == undefined){
                pass = false
                this.errors.push(`Field ${i} is required`);
            }
        }

        return pass;
    }

    protected validateFieldsValues(obj: MovieInterface) : boolean{

        let pass = true;

        Object.keys(this.config).forEach((key)=>{

            const item = this.config[key];

            if(item.rules){
                item.rules.forEach((rule:any)=> {
                    if(!this.runValidator(rule,(<any>obj)[key])){
                        this.errors.push(rule.message);
                        pass = false;
                    }
                });
            }
        });

        return pass;
    }

}

const movieValidator = new MovieValidator();
export default movieValidator;