/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Discharge, NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, HealthCheckRating, SickLeave } from './types';
import * as guards from './typeGuards';

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newPatient;
};

export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  const entry: NewHealthCheckEntry = {
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    description: parseStringProperty(object.description),
    specialist: parseStringProperty(object.specialist),
    diagnosisCodes: parseOptionalStringArray(object.diagnosisCodes)
  };
  return entry;
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  const entry: NewHospitalEntry = {
    type: "Hospital",
    description: parseStringProperty(object.description),
    specialist: parseStringProperty(object.specialist),
    diagnosisCodes: parseOptionalStringArray(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge)
  };
  return entry;
};

export const toNewOccupationalHealthcareEntry = (object: any): NewOccupationalHealthcareEntry => {
  const entry: NewOccupationalHealthcareEntry = {
    type: "OccupationalHealthcare",
    description: parseStringProperty(object.description),
    specialist: parseStringProperty(object.specialist),
    diagnosisCodes: parseOptionalStringArray(object.diagnosisCodes),
    employerName: parseStringProperty(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };
  return entry;
};

const parseName = (name: any): string => {
  if (!name || !guards.isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !guards.isString(dateOfBirth)) {
    throw new Error(`Incorrect or missing name: ${String(dateOfBirth)}`);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !guards.isString(ssn)) {
    throw new Error(`Incorrect or missing name: ${String(ssn)}`);
  }

  return ssn;
};

const parseGender = (gender: any): string => {
  if (!gender || !guards.isGender(gender)) {
    throw new Error(`Incorrect or missing name: ${String(gender)}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !guards.isString(occupation)) {
    throw new Error(`Incorrect or missing name: ${String(occupation)}`);
  }

  return occupation;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  else if (guards.isSickLeave(sickLeave)) return sickLeave;
  else throw new Error(`Incorrect property sickLeave: ${String(sickLeave)}`);
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !guards.isDischarge(discharge)){
    throw new Error(`Incorrect or missing property: ${String(discharge)}`);
  }
  return discharge;
};

const parseStringProperty = (property: any): string => {
  if (!property || !guards.isString(property)) {
    throw new Error(`Incorrect or missing property: ${String(property)}`);
  }
  return property;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined || rating === null || !guards.isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${String(rating)}`);
  }
  return Number(rating);
};

const parseOptionalStringArray = (object: any): string[] | undefined => {
  if (!object || !guards.isStringArray(object)) return undefined;
  else return object;
};