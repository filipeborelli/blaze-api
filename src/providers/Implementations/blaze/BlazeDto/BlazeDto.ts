export interface ICrash {
    amount: number;
    auto_cashout_at: number;
    uuid: any;
    token: any;
}

export interface ILogin {
    username: string;
    password: string;
    user_reference: any;
}

export interface ICrashOut {
    amount: number;
    auto_cashout_at: number;
}