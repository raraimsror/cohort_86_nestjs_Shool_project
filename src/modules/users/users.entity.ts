// При использовании ORM систем(для взаимодействии с DB), тут будет класс, который напрямую отображается
// на таблицу в БД
// Каждый экземпляр(обьект) представляет отдельную строку в таблицу в БД
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './enums/role.enum.js';
// @Enitity - это специальный декоратор, который превращает обычный TypeScript класс в модель таблицы базы данных
// С его помощью TypeORM понимает, что данный класс(в данном примере User) нужно связать
//  со схемой БД(создать таблицу, читать из нее и записывать в нее данные)

@Entity()
class User {
  // - name - название столбца в таблице БД
  // - nullable - указывает могут ли быть созданные в определенном столбце значиния в виде NULL
  // - unique - определяет должно ли быть значение столбца уникальным или нет
  // - type - указываем явный тип для нашего столбца, в данном примере мы его использовали, т.к у нас используется специфический тип enum
  // - enum - это массив возможных перечисленных значений(в нашем случае Role)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;
  @Column({ name: 'password', nullable: false, unique: false })
  password: string;
  @Column({ name: 'name', nullable: false, unique: false })
  name: string;
  @Column({
    name: 'role',
    nullable: false,
    unique: false,
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;
  @Column({ name: 'active', nullable: false, unique: false })
  active: boolean;
}
export { User };