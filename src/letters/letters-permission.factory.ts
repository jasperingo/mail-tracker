import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Letter } from 'src/letters/entities/letter.entity';
import { User } from 'src/users/entities/user.entity';
import { Action } from 'src/utils/action.enum';

type Subjects = InferSubjects<typeof Letter> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class LettersPermissionFactory {
  create(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Create, Letter);

    can<Letter & { 'user.id': Letter['user']['id'] }>(
      [Action.ReadMany, Action.Read],
      Letter,
      { 'user.id': user.id },
    );

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
