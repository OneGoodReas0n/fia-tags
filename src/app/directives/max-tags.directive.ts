import {Directive} from '@angular/core';
import {Tag} from '../components/tags/tags-component';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const maxTagsValidator = (maxTags: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const valid = (control.value as Array<Tag>).length < maxTags;
    return !valid ? {maxTags: {value: 'You reached the limit of tags for one observation'}} : null;
  };
