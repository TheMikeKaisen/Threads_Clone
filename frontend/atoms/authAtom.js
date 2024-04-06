import {
    atom
} from 'recoil'

const authScreenState = atom({
    key: 'authScreenState', // unique ID (with respect to other atoms/selectors)
    default: 'login', // default value (aka initial value)
  });

export default authScreenState
  