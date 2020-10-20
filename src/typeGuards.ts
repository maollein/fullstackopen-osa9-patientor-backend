/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ValidationError } from "./errors";
import { Gender, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, SickLeave, Discharge, HealthCheckRating } from "./types";

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const isValidationError = (e: any): e is ValidationError => {
  return (e.name && e.name === 'ValidationError');
};

export const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return (entry && entry.type && entry.type === 'HealthCheck');
};

export const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return (entry && entry.type && entry.type === 'Hospital');
};

export const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  return (entry && entry.type && entry.type === 'OccupationalHealthcare');
};

export const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return Boolean(sickLeave.startDate && sickLeave.endDate);
};

export const isDischarge = (discharge: any): discharge is Discharge => {
  return Boolean(discharge.date && discharge.criteria);
};

export const isStringArray = (object: any): object is string[] => {
  if (!object) return false;
  for (const element in object) {
    if (!isString(element)) return false;
  }
  return true;
};

export const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return !isNaN(Number(rating)) && rating in HealthCheckRating;
};