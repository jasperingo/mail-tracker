import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TemplatesRepository } from 'src/templates/templates.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTemplateIdPipe implements ValidatorConstraintInterface {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  validate(id: number) {
    return this.templatesRepository.existsById(id);
  }

  defaultMessage() {
    return 'templateId is invalid';
  }
}

export function IsTemplateId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTemplateIdPipe,
    });
  };
}
