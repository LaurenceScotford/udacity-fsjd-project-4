import { createAction, props } from '@ngrx/store';

const key = '[message]';

export const setMessage = createAction(
    `${key} Set Message`,
    props<{
        message: string,
        messageType: 'confirm' | 'warn' | 'none'
    }>()
);

export const clearMessage = createAction(`${key} Clear Message`);