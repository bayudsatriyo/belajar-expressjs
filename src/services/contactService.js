import prismaClient from '../application/database.js';
import ResponseError from '../exception/response-error.js';
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

const cekTotalContact = async (username, contactId) => prismaClient.contact.count({
  where: {
    id: contactId,
    username,
  },
});

const updateContact = async (user, contact) => {
  const dataContact = await validate(contactValdiation.updateContactValdation, contact);
  console.log(dataContact);
  const totalContactValidation = await cekTotalContact(user.username, dataContact.id);

  console.log('ini total contact:');
  console.log(totalContactValidation);

  if (totalContactValidation !== 1) {
    throw new ResponseError(404, 'contact yang ingin diubah sudah tidak ada');
  }

  return prismaClient.contact.update({
    where: {
      id: dataContact.id,
    },
    data: {
      first_name: dataContact.first_name,
      last_name: dataContact.last_name,
      email: dataContact.email,
      phone: dataContact.phone,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const deleteContact = async (user, contactId) => {
  await validate(contactValdiation.getContactIdValidation, contactId);

  const TotalContact = await cekTotalContact(user.username, parseInt(contactId, 10));

  if (TotalContact !== 1) {
    throw new ResponseError(404, 'Contact yang ingin anda hapus sudah tidak ada');
  }

  return prismaClient.contact.delete({
    where: {
      id: parseInt(contactId, 10),
    },
  });
};

const SearchContact = async (user, dataContact) => {
  const contactData = await validate(contactValdiation.searchContactValidation, dataContact);
  console.log(contactData);
  const skip = (contactData.page - 1) * contactData.size;
  const filters = [];

  filters.push({
    username: user.username,
  });
  if (contactData.name) {
    filters.push(
      {
        OR: [
          {
            first_name: {
              contains: contactData.name,
            },
          },
          {
            last_name: {
              contains: contactData.name,
            },
          },
        ],
      },
    );
  }

  if (contactData.email) {
    filters.push(
      {
        email: {
          contains: contactData.email,
        },
      },
    );
  }

  if (contactData.phone) {
    filters.push(
      {
        phone: {
          contains: contactData.phone,
        },
      },
    );
  }

  const contact = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: contactData.size,
    skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contact,
    paging: {
      page: contactData.page,
      total_items: totalItems,
      total_page: Math.ceil(totalItems / contactData.size),
    },
  };
};

export default {
  addContact, getContact, updateContact, deleteContact, SearchContact,
};
