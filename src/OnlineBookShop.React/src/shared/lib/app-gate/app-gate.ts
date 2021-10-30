import { restore } from 'effector';
import {createGate} from 'effector-react'

export const AppGate = createGate('AppGate');

export const $appMounted = restore(AppGate.open.map(() => true), false);
