import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointments: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointments,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 8, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 9, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 10, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 11, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 12, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 13, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 14, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 15, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 16, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 2, 1, 17, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 3, 2, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 3,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
      ]),
    );
  });
});
