import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      service: this.configService.get('nodemailer_service'),
      secure: this.configService.get('nodemailer_secure'),
      auth: {
        user: this.configService.get('nodemailer_auth_user'),
        pass: this.configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail(
      {
        from: {
          name: this.configService.get('nodemailer_title'),
          address: this.configService.get('nodemailer_auth_user'),
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
