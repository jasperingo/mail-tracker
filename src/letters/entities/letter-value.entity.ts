import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Letter } from 'src/letters/entities/letter.entity';
import { TemplateVariable } from 'src/templates/entities/template-variable.entity';

@Entity({ name: 'letterValues' })
export class LetterValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Letter, (letter) => letter.letterValues)
  letter: Letter;

  @ManyToOne(() => TemplateVariable, (template) => template.letterValues, {
    eager: true,
  })
  templateVariable: TemplateVariable;
}
