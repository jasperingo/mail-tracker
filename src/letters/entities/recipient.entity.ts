import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Letter } from 'src/letters/entities/letter.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity({ name: 'recipients' })
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'datetime' })
  signedAt: Date;

  @ManyToOne(() => Letter, (letter) => letter.recipients)
  letter: Letter;

  @ManyToOne(() => Role, (role) => role.recipients, {
    eager: true,
  })
  role: Role;
}
