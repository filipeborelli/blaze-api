import { ICrash } from '@providers/Implementations/blaze/BlazeDto/BlazeDto';
import { Request, Response } from 'express';
import { LoginUseCase } from '../useCases/LoginUseCase'

export class LoginController {
    private loginUseCase: LoginUseCase;

    constructor() {
        this.loginUseCase = new LoginUseCase();
    }

    public async handler(request: Request, response: Response): Promise<Response> {
        const data = request.body as unknown as ICrash;
        try{
            const gameResponse = await this.loginUseCase.execute(data);
            return response.status(200).json(gameResponse)
        }catch(error){
            return response.status(500).json({message: error})
        }
    }
}