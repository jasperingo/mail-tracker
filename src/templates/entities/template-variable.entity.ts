import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LetterValue } from 'src/letters/entities/letter-value.entity';
import { Template } from 'src/templates/entities/template.entity';

export enum TemplateVariableSource {
  INPUT = 'input',
  DATABASE = 'database',
}

@Entity({ name: 'templateVariables' })
export class TemplateVariable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TemplateVariableSource })
  source: TemplateVariableSource;

  @Column()
  databaseField: string;

  @ManyToOne(() => Template, (template) => template.templateVariables)
  template: Template;

  @OneToMany(() => LetterValue, (item) => item.letter)
  letterValues: LetterValue[];
}
