import { IMailInfo } from './types';
// import { sendMailBySendGrid } from './sendMail.sendgrid';
import { sendMailByNodeMailer } from './sendMail.nodemailer';


export const sendMailByClient = (client = 'nodemailer' as "nodemailer" ) => {
// export const sendMailByClient = (client = 'sendgrid' as "sendgrid" | 'mailgun' | 'nodemailer' ) => {
  const MailClients: {
    // [key in "sendgrid" | "nodemailer" | 'mailgun'] : (data: IMailInfo) => void;
    [key in "nodemailer"] : (data: IMailInfo) => void;
  } = {
    "nodemailer": sendMailByNodeMailer,
    // 'sendgrid': sendMailBySendGrid,
  };
  const Mailer = MailClients[client];
  return async (data: IMailInfo) => Mailer(data);
};
