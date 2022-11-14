import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserIdPipe implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  validate(id: number) {
    return this.userRepository.existsById(id);
  }

  defaultMessage() {
    return 'userId is invalid';
  }
}

export function IsUserId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserIdPipe,
    });
  };
}
