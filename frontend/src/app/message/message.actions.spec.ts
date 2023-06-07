import * as fromActions from './message.actions';

interface test_message {
    message: string;
    messageType: 'confirm' | 'warn' | 'none'
}

describe('Message Actions', () => {
    it('should create the Set Message action', () => {
        const payload: test_message = {
            message: 'message',
            messageType: 'confirm'
        };

        const action = fromActions.setMessage(payload);

        expect(action).toEqual({
            type: '[message] Set Message',
            ...payload
        });
    });

    it('should create the Clear Message action', () => {
        const action = fromActions.clearMessage();

        expect(action).toEqual({
            type: '[message] Clear Message'
        });
    });
});