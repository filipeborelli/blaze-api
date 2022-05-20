import { ICrash } from '@providers/Implementations/blaze/BlazeDto/BlazeDto';
import { Request, Response } from 'express';
import { StartGameUseCase } from '../useCases/StartGameUseCase'

export class StartGameController {
    private startGameUseCase: StartGameUseCase;

    constructor() {
        this.startGameUseCase = new StartGameUseCase();
    }

    public async handler(request: Request, response: Response): Promise<Response> {
        const data = request.body as unknown as ICrash;
        try{
            const gameResponse = await this.startGameUseCase.execute(data);
            return response.status(200).json(gameResponse)
        }catch(error){
            return response.status(500).json({message: error})
        }
    }
}