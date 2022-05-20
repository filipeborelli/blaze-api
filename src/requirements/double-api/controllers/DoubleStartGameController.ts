import { ICrash } from '@providers/Implementations/blaze/BlazeDto/BlazeDto';
import { Request, Response } from 'express';
import { DoubleStartGameUseCase } from '../useCases/DoubleStartGameUseCase'

export class StartDoubleGameController {
    private doubleStartGameUseCase: DoubleStartGameUseCase;

    constructor() {
        this.doubleStartGameUseCase = new DoubleStartGameUseCase();
    }

    public async handler(request: Request, response: Response): Promise<Response> {
        const data = request.body as unknown as ICrash;
        try{
            const gameResponse = await this.doubleStartGameUseCase.execute(data);
            return response.status(200).json(gameResponse)
        }catch(error){
            return response.status(500).json({message: error})
        }
    }
}