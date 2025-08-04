import { Persona } from '@core/models/Persona';
import { PersonaRepository } from '@core/repositories';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

const COLLECTION_NAME = 'personas';
const personaRepository: PersonaRepository = makeFirestoreRepository<Persona>('personas');
export default personaRepository;
