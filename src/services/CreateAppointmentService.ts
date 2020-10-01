import Appointment from '../models/Appointment';

import { startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findApptInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findApptInSameDate) {
      throw new AppError('This Appointment already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
