class AppResponse{
    code:number;
    error:boolean;
    message:string;
    payload:any

    public static error(message:string,code: number): AppResponse{
        const resp = {
            code:code,
            error:true,
            message:message,
            payload:null
        } as AppResponse;

        return resp;
    }

    public static success(message:string='',payload:any = null): AppResponse{
        const resp = {
            code:0,
            error:false,
            message:message,
            payload:payload
        } as AppResponse;

        return resp;
    }

}


export default AppResponse;