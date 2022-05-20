import { usersRef } from "@database/FireBaseConnection";
import { IBlazeProvider } from "@providers/IBlazeProvider";
import { CrashSessions, WalletID } from "../sessions/Sessions";
import BlazeProvider from '@providers/index';

export class RenewToken {

    private crashProvider: IBlazeProvider;

    constructor() {
        this.crashProvider = new BlazeProvider();
    }

    public async renew(data: any): Promise<any> {
        const checkUser =  await usersRef.where('uuid','==', data.uuid).get().then(snapshot => {
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
            return {
                user_reference: data.uuid,
                error: login.error
            }
        }else {
            CrashSessions[data.uuid] = login.access_token as never
            const walletIdUser: any = await this.crashProvider.walletBlaze(login.access_token)
            WalletID[data.uuid] = walletIdUser[0].id as never
        }
    }
}