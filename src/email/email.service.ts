import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: '163',
      secure: true,
      auth: {
        user: 'banruo734@163.com',
        pass: 'JOLKSZEBLSDDIIPW',
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail(
      {
        from: {
          name: '会议室预定系统',
          address: 'banruo734@163.com',
        },
        to,
        subject,
        html,
      },
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
        }
      },
    );
  }
}
