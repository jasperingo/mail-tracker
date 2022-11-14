import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RolesRepository } from 'src/roles/roles.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsRoleIdPipe implements ValidatorConstraintInterface {
  constructor(private readonly rolesRepository: RolesRepository) {}

  validate(id: number) {
    return this.rolesRepository.existsById(id);
  }

  defaultMessage() {
    return 'roleId is invalid';
  }
}

export function IsRoleId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleIdPipe,
    });
  };
}
