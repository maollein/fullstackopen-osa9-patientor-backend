import patients from '../../data/patients';
import { v4 } from 'uuid';
import { Entry, NewPatient, NonSensitivePatient, Patient, NewEntry} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>
    ({ id, name, dateOfBirth, gender, occupation, entries}));
};

const addPatient = (patient: NewPatient): Patient => {
  const addedPatient = {
    id: v4(),
    ...patient
  };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === id);
  if (!patient) throw new Error('Patient not found');
  const date = new Date().toISOString().substr(0,10);
  console.log(date);
  const entry: Entry = {
    ...newEntry,
    id: v4(),
    date: new Date().toISOString().substr(0,10)
  };
  patient.entries.push(entry);
  return entry;
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatient, addEntry };