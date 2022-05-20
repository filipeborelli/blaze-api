import { CrashSessions } from '../../../utils/sessions/Sessions';
import { IBlazeProvider } from '@providers/IBlazeProvider';
import BlazeProvider from '@providers/index';
export class StartGameUseCase {

    public crashProvider: IBlazeProvider;

    constructor() {
        this.crashProvider = new BlazeProvider();
    }

    public async execute(data: any): Promise<any> {
        const userInfos: any = []
        const promises : any = []
        for(const i in data){
            const user  : any = data[i]
            if(CrashSessions[user.uuid]){
                const dataCrash = {
                    amount: user.amount,
                    auto_cashout_at: user.auto_cashout_at,
                    token: CrashSessions[user.uuid],
                    uuid: user.uuid
                }
                promises.push(this.crashProvider.crashEnter(dataCrash))
                Promise.all(promises).then(()=>{
                    console.log('all promises resolved')
                })
                userInfos.push({
                    amount: user.amount,
                    auto_cashout_at: user.auto_cashout_at,
                    uuid: user.uuid,
                    status: 'game_started'
                })
            }else{
                userInfos.push({
                    amount: user.amount,
                    auto_cashout_at: user.auto_cashout_at,
                    uuid: user.uuid,
                    status: 'not_logged_in'
                })
            }
          
        }
        return userInfos
    }
}