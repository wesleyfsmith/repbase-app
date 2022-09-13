import { Meteor } from 'meteor/meteor';

// if (!Meteor.isDevelopment) {
//   sgMail.setApiKey(Meteor.settings.sendgrid.apiKey);
// }

if (Meteor.isServer) {
  const sgMail = require('@sendgrid/mail');

  // if (Meteor.isProduction) {
  //   sgMail.setApiKey(Meteor.settings.sendgrid.apiKey);
  // }

  const templates = {
    subscribe_confirmation: 'd-2d43ffcf2663439aac6bf12d8fa31911',
    verify_email: 'd-7fbae8fc22864d8a826209ed2dd01205',
    password_reset: 'd-df82939e2d9a4368b9f779a870294b53',
    purchase_confirmation: 'd-717ee8112663479094d767cf55036bf9',
    signup_confirmation2: 'd-9363bf6b4a1949d4a4e998d4057d5984',
  };

  export const sendEmail = async (template, addressee, dynamic_template_data) => {
    if (Meteor.settings.enableEmail) {
      const msg = {
        to: addressee,
        from: 'hello@inkmarket.co',
        templateId: templates[template],
        dynamicTemplateData: dynamic_template_data,
      };
      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log('Email sent');
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    } else {
      console.log(`Email disabled, but would have sent to ${addressee}.`);
    }
  };
}
