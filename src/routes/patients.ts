import express from 'express';
import patientService from '../services/patientService';
import { NewEntry } from '../types';
import { toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry, toNewPatient } from '../utils';
import { isHealthCheckEntry, isHospitalEntry, isOccupationalHealthcareEntry, isValidationError } from '../typeGuards';

const router = express.Router();

router.get('/', (_req, res) => {
  const nonSensitivePatients = patientService.getNonSensitivePatients();
  return res.json(nonSensitivePatients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
    return res.json(patient);
  } catch (e) {
    const msg = isValidationError(e) ? e.message : 'Something went wrong';
    return res.status(400).json({ error: msg });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) return res.json(patient);
  else return res.status(404).json({ error: 'Not found' });
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  let newEntry: NewEntry;
  if (isHealthCheckEntry(req.body)) {
    newEntry = toNewHealthCheckEntry(req.body);
  } else if (isHospitalEntry(req.body)) {
    newEntry = toNewHospitalEntry(req.body);
  } else if (isOccupationalHealthcareEntry(req.body)) {
    newEntry = toNewOccupationalHealthcareEntry(req.body);
  } else return res.status(400).json({error: "Invalid data"});
  const addedEntry = patientService.addEntry(id, newEntry);
  return res.json(addedEntry);
});

export default router;