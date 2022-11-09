import {
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  Ability,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Action } from 'src/utils/action.enum';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class UserPermissionFactory {
  create(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Read, User);

    can(Action.Update, User, { id: user.id });

    if (user.isAdmin) {
      can([Action.Create, Action.ReadMany], User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
