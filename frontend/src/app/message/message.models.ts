// export enum MESSAGE_TYPE {
//     Confirmation,
//     Warning
// }

export interface Message {
    message: string;
    messageType: 'confirm' | 'warn' | 'none';
    datetime: number;
}

export interface MessageState {
    message: Message;
}