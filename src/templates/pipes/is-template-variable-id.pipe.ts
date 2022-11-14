import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TemplateVariablesRepository } from 'src/templates/template-variables.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTemplateVariableIdPipe implements ValidatorConstraintInterface {
  constructor(
    private readonly templateVariablesRepository: TemplateVariablesRepository,
  ) {}

  validate(id: number) {
    return this.templateVariablesRepository.existsById(id);
  }

  defaultMessage() {
    return 'templateVariableId is invalid';
  }
}

export function IsTemplateVariableId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTemplateVariableIdPipe,
    });
  };
}
