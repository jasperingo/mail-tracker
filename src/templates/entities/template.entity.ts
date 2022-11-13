import { Letter } from 'src/letters/entities/letter.entity';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TemplateVariable, (item) => item.template, { eager: true })
  templateVariables: TemplateVariable[];

  @OneToMany(() => Letter, (letter) => letter.template)
  letters: Letter[];
}
