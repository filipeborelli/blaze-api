import { CrashSessions, WalletID } from '../../../utils/sessions/Sessions';
import { IBlazeProvider } from '@providers/IBlazeProvider';
import BlazeProvider from '@providers/index';
import { usersRef } from '../../../database/FireBaseConnection'
export class LoginUseCase {
    private crashProvider: IBlazeProvider;

    constructor() {
        this.crashProvider = new BlazeProvider();
    }

    public async execute(data: any): Promise<any> {
        const userInfos: any = []
        for(const i in data){
            const user  : any = data[i]
            if(!CrashSessions[user.uuid]){
                const checkUser =  await usersRef.where('uuid','==', user.uuid).get().then(snapshot => {
                    const users = snapshot.docs.map(doc => doc.data());
                    return users;
                });
                const loginData : any = {
                    username: checkUser[0].email,
                    password: checkUser[0].password,
                    uuid: checkUser[0].uuid,
                }
                const login = await this.crashProvider.loginBlaze(loginData)
                if(login.error) {
                    userInfos.push({
                        user_reference: user.uuid,
                        error: login.error
                    })
                }else {
                    CrashSessions[user.uuid] = login.access_token as never
                    const walletIdUser: any = await this.crashProvider.walletBlaze(login.access_token)
                    WalletID[user.uuid] = walletIdUser[0].id as never
                    userInfos.push({
                        user_reference: user.uuid,
                        token: CrashSessions[user.uuid]
                    })
                }
            }else{
                userInfos.push({
                    user_reference: user.uuid,
                    token: CrashSessions[user.uuid]
                })
            }
        }
        return userInfos
    }
}