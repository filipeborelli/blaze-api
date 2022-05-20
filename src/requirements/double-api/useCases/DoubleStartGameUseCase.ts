import { CrashSessions, WalletID } from '../../../utils/sessions/Sessions';
import { IBlazeProvider } from '@providers/IBlazeProvider';
import BlazeProvider from '@providers/index';
export class DoubleStartGameUseCase {
    private crashProvider: IBlazeProvider;

    constructor() {
        this.crashProvider = new BlazeProvider();
    }

    public async execute(data: any): Promise<any> {
        const userInfos: any = []
        const promises : any = []
        for(const i in data){
            const user  : any = data[i]
            if(CrashSessions[user.uuid] && WalletID[user.uuid]){
                const dataDouble = {
                    amount: user.amount,
                    collor: user.collor,
                    token: CrashSessions[user.uuid],
                    wallet_id: WalletID[user.uuid],
                    uuid: user.uuid
                }
                promises.push(this.crashProvider.doubleEnter(dataDouble))
                Promise.all(promises).then(()=>{
                    console.log('all promises resolved double')
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