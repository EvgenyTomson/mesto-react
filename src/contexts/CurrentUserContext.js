import { createContext } from "react";
import tempAvatar from '../img/avatar.png';


const initialUserData = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь океана',
  avatar: tempAvatar
}

export const CurrentUserContext = createContext(initialUserData);
