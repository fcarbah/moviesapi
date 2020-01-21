import config from 'config';
const rp = require('request-promise');

export class ImdbApiWrapper{

    protected uri:string;
    protected host:string;
    protected apiKey: string;

    constructor(){

        const apiConfig:any = config.get('imdbapi');

        this.uri = apiConfig.baseUrl;
        this.host = apiConfig.host;
        this.apiKey = process.env.RAPID_KEY;
    }

    async getMoviePoster(title:string) : Promise<String> {
        
        try{
            const res = await rp({
                uri:this.uri+'/search/'+title,
                headers:{
                    'x-rapidapi-host': this.host,
                    'x-rapidapi-key': this.apiKey
                },
                json:true
            })

            return res.titles && res.titles.length > 0? res.titles[0].image : ''; 

        }
        catch(error){
            return '';
        }
        
        
    }

}