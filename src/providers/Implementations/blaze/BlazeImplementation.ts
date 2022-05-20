import { usersRef } from '@database/FireBaseConnection';
import { IBlazeProvider } from '@providers/IBlazeProvider';
import { CrashSessions, WalletID } from '../../../utils/sessions/Sessions';
import axios, { AxiosInstance } from 'axios';
import { ICrash, ILogin } from './BlazeDto/BlazeDto'

export class BlazeImplementation implements IBlazeProvider {

    public async crashEnter(data: ICrash): Promise<any> {
        const crashGameOptions = {
            method: 'POST',
            url: `${process.env.BASE_URL}/crash/round/enter`,
            headers: {
               authorization: `Bearer ${data.token}`,
              'content-type': 'application/json;charset=UTF-8'
            },
            data: {
              amount: data.amount,
              type: 'BRL',
              auto_cashout_at: data.auto_cashout_at,
            }
          };
          const gameResult = await axios.request(crashGameOptions).then(function (response) {
            return response.data
          }).catch(function (error) {
            return error.response.status
          });
          
          if(gameResult === 401){
            const checkUser =  await usersRef.where('uuid','==', data.uuid).get().then(snapshot => {
              const users = snapshot.docs.map(doc => doc.data());
              return users;
            });
            const loginData : any = {
                username: checkUser[0].email,
                password: checkUser[0].password,
                uuid: checkUser[0].uuid,
            }
            const renewToken =  await this.loginBlaze(loginData)
            if(renewToken.error) {
                return {
                    user_reference: data.uuid,
                    error: renewToken.error
                }
            }else {
                CrashSessions[data.uuid] = renewToken.access_token as never
                const gameResult = await this.crashEnter(data)
                return gameResult
            }
          }
          return gameResult
    }

    public async loginBlaze(data: any): Promise<any>{
          const loginOptions = {
            method: 'PUT',
            url: `${process.env.BASE_URL}/auth/password`,
            headers: {'content-type': 'application/json;charset=UTF-8'},
            data: {username: data.username, password: data.password}
          };
         const resultLogin = await axios.request(loginOptions).then(function (response) {
            return response.data
         }).catch(function (error) {
            return {error: "Invalid Username or Password"}
         });
         
       return resultLogin
    }

    public async walletBlaze(token: any): Promise<any>{
        const walletOptions = {
          method: 'GET',
          url: `${process.env.BASE_URL}/wallets`,
          headers: {
            authorization: `Bearer ${token}`,
           'content-type': 'application/json;charset=UTF-8'
         }
        };
      const resultWallet = await axios.request(walletOptions).then(function (response) {
          return response.data
      }).catch(function (error) {
          return {error: "Invalid token"}
      });
      return resultWallet
    }

    public async doubleEnter(data: any): Promise<any> {
      const checkCollor = (collor: any) => {
        if(collor === 'white') return 0
        if(collor === 'red') return 1
        if(collor === 'black') return 2
      }

      const doubleGameOptions = {
        method: 'POST',
        url: `${process.env.BASE_URL}/roulette_bets`,
        headers: {
           authorization: `Bearer ${data.token}`,
          'content-type': 'application/json;charset=UTF-8'
        },
        data: {
          amount: data.amount,
          currency_type: 'BRL',
          color: checkCollor(data.collor),
          free_bet: false,
          wallet_id: data.wallet_id,
        }
      };
      const gameResult = await axios.request(doubleGameOptions).then(function (response) {
        return response.data
      }).catch(function (error) {
        return error.response.status
      });

      if(gameResult === 401){
        const checkUser =  await usersRef.where('uuid','==', data.uuid).get().then(snapshot => {
          const users = snapshot.docs.map(doc => doc.data());
          return users;
        });
        const loginData : any = {
            username: checkUser[0].email,
            password: checkUser[0].password,
            uuid: checkUser[0].uuid,
        }
        const renewToken =  await this.loginBlaze(loginData)
        if(renewToken.error) {
            return {
                user_reference: data.uuid,
                error: renewToken.error
            }
        }else {
            CrashSessions[data.uuid] = renewToken.access_token as never
            const gameResult = await this.doubleEnter(data)
            return gameResult
        }
    }
    return gameResult
 }
}