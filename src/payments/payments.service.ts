import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const created = new this.paymentModel(dto);
    return created.save();
  }

  async findAllPaginated({ page, limit, status, method, startDate, endDate }) {
    const filter: any = {};
    if (status) filter.status = status;
    if (method) filter.method = method;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.paymentModel.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
      this.paymentModel.countDocuments(filter),
    ]);
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    return this.paymentModel.findById(id);
  }

  async getStats() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const [todayCount, weekCount, totalRevenue, failedCount, last7Days] = await Promise.all([
      this.paymentModel.countDocuments({ date: { $gte: startOfToday } }),
      this.paymentModel.countDocuments({ date: { $gte: startOfWeek } }),
      this.paymentModel.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
      this.paymentModel.countDocuments({ status: 'failed' }),
      this.paymentModel.aggregate([
        {
          $match: { date: { $gte: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000) } },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            total: { $sum: '$amount' },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);
    return {
      todayCount,
      weekCount,
      totalRevenue: totalRevenue[0]?.total || 0,
      failedCount,
      last7Days,
    };
  }
} 