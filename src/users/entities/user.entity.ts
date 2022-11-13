import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  matriculationNumber: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Role, (role) => role.user, { eager: true })
  roles: Role[];
}
