import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'datetime' })
  endedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
