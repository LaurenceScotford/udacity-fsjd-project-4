import * as fromMessage from './message.reducer';
import * as fromActions from './message.actions';
import { MessageState } from './message.models';

interface test_message {
    message: string;
    messageType: 'confirm' | 'warn' | 'none'
}

describe('Message Reducer', () => {
    const { initialState } = fromMessage;

    it('should set the state with a new message when the Set Message action is dispatched', () => {
        const message = 'message';
        const m_type = 'confirm';

        const payload: test_message = {
            message: message,
            messageType: m_type
        };

        const action = fromActions.setMessage(payload);
        const state = fromMessage.messageReducer(initialState, action);

        expect(state.message.message).toBe(message);
        expect(state.message.messageType).toBe(m_type);
        expect(state.message.datetime).toBeDefined();
    });

    it('should set the state to the default settings when the Clear Message action is dispatched', () => {
        const message = 'message';
        const m_type = 'confirm';

        const newState: MessageState = {
            message: {
                message: 'message',
                messageType: 'confirm',
                datetime: 1
            }
        };

        const action = fromActions.clearMessage();
        const state = fromMessage.messageReducer(newState, action);

        expect(state.message.message).toBe('');
        expect(state.message.messageType).toBe('none');
    });

});