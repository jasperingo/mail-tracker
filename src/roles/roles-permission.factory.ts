import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Action } from 'src/utils/action.enum';

type Subjects = InferSubjects<typeof Role> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class RolesPermissionFactory {
  create(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.ReadMany, Role);

    if (user.isAdmin) {
      can(Action.Create, Role);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
