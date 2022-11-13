import { Template } from 'src/templates/entities/template.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
