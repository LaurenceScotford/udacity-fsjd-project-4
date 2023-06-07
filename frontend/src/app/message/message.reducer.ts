import {
    createReducer,
    on
} from '@ngrx/store';

import { MessageState, Message } from './message.models';
import * as MessageActions from './message.actions';

export const messageFeatureKey = 'message';

export const initialState: MessageState = {
    message: {
        message: '',
        messageType: 'confirm',
        datetime: 0,
    }
};

export const messageReducer = createReducer(
    initialState,
    on(
        MessageActions.setMessage,
        (state, action) => {
            return {
                ...state,
                message: {
                    message: action.message,
                    messageType: action.messageType,
                    datetime: Date.now()
                }
            }
        }
    ),
    on(
        MessageActions.clearMessage,
        (state, action) => {
            return {
                ...state,
                message: {
                    ...state.message,
                    message: '',
                    messageType: 'none'
                }
            }
        }
    )
);