// При использовании ORM систем(для взаимодействии с DB), тут будет класс, который напрямую отображается
// на таблицу в БД
// Каждый экземпляр(обьект) представляет отдельную строку в таблицу в БД

import { ROLE } from './enums/role.enum.js';

class User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: ROLE;
  active: boolean;
}

export { User };
