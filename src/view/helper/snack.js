import 'js-snackbar/snackbar.css';
import { show, ACTION_TYPE } from 'js-snackbar';

export const warning = (message) => {
    show({ text: message, backgroundColor: '#e5af4b', color: 'white' });
}

export const info = (message) => {
    show({ text: message });
}

export const danger = (message) => {
    show({ text: message, backgroundColor: '#e5564b', color: 'white' });
}