import { BadRequestException, ValidationError } from '@nestjs/common';

const errorMapper = (error: ValidationError) => {
  const context = error.contexts ? Object.values(error.contexts)[0] : null;
  const errorMessage = error.constraints
    ? Object.values(error.constraints)[0]
    : null;

  return {
    value: error.value,
    message: errorMessage,
    name: context?.propertyName ?? error.property,
    errors: error.children?.map((error) => errorMapper(error)),
  };
};

/**
 * Makes custom class-validator ValidationError.
 */
export const createValidationError = (
  value: any,
  message: string,
  property: string,
) => ({
  value,
  property,
  children: [],
  constraints: { custom: message },
});

/**
 * Maps an array of class-validator ValidationError using the errorMapper.
 */
export const validationErrorFactory = (
  validationErrors: ValidationError[] = [],
) =>
  new BadRequestException(validationErrors.map((error) => errorMapper(error)));
