import { ICrash, ILogin } from "./Implementations/blaze/BlazeDto/BlazeDto";
export interface IBlazeProvider {
    crashEnter(data : any): Promise<any>;
    doubleEnter(data : any): Promise<any>;
    loginBlaze(data : ILogin): Promise<any>;
    walletBlaze(data : any): Promise<any>;
}