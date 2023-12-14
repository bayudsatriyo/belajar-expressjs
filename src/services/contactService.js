import prismaClient from '../application/database.js';
import contactValdiation from '../validation/contactValdiation.js';
import validate from '../validation/validation.js';

const addContact = async (user, request) => {
  const contact = validate(contactValdiation.addContactValidation, request);
  console.log(request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      first_name: true,
      email: true,
      phone: true,
    },
  });
};

const getContact = async (user, contactid) => {
  const contactId = await validate(contactValdiation.getContactIdValidation, contactid);

  return prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

export default { addContact, getContact };
