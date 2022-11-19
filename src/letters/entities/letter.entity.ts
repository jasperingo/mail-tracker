import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Template } from 'src/templates/entities/template.entity';
import { LetterValue } from 'src/letters/entities/letter-value.entity';
import { Recipient } from 'src/letters/entities/recipient.entity';

@Entity({ name: 'letters' })
export class Letter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.letters, { eager: true })
  user: User;

  @ManyToOne(() => Template, (template) => template.letters, { eager: true })
  template: Template;

  @OneToMany(() => LetterValue, (item) => item.letter, { eager: true })
  letterValues: LetterValue[];

  @OneToMany(() => Recipient, (item) => item.letter, { eager: true })
  recipients: Recipient[];
}
