import { Barrio } from '@core/models/Barrio';
import { BarrioRepository } from '@core/repositories';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

const COLLECTION_NAME = 'barrios';
const barrioRepository: BarrioRepository = makeFirestoreRepository<Barrio>('barrios');
export default barrioRepository;
