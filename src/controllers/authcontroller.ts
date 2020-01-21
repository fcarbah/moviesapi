import { User} from '../models/user';
import passport from 'passport';
import { DigestStrategy } from "passport-http";
import Cryptr from 'cryptr';


const crypto = new Cryptr(process.env.CRYPTR_SECRET);

export class AuthController {

    static async authenticate(username:string,done:CallableFunction){
        try{
            const user = await User.findOne({username: username});

            if(!user){
                return done({t:1},false)
            }

            return done(null,username,crypto.decrypt(user.password.toString()));

        }
        catch(error){
            return done(error);
        }
        finally{

        }
    }

}


passport.use(new DigestStrategy({ qop: 'auth' },

    (username,done)=>{
        AuthController.authenticate(username,done);
    },
    
    (params,done)=>{
        done(null,true);
    }

  ));

export const isAuthenticated = passport.authenticate(['digest'], { session : false });
