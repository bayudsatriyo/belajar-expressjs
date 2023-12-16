import prismaClient from '../application/database.js';
import ResponseError from '../exception/response-error.js';
import addressValidation from '../validation/addressValidation.js';
import validate from '../validation/validation.js';

const cekContact = async (username, contactId) => {
  const TotalContact = await prismaClient.contact.count({
    where: {
      username,
      id: contactId,
    },
  });

  if (!TotalContact) {
    throw new ResponseError(404, 'contactId tidak ditemukan');
  }
};

const addAddressService = async (user, contactId, dataAddress) => {
  const address = validate(addressValidation.bodyAddressValidation, dataAddress);

  await cekContact(user.username, contactId);
  console.log(typeof (address));
  console.log(address);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      country: true,
      postal_code: true,
    },
  });
};

const getAddressById = async (user, contactId, addressId) => {
  const Idaddress = validate(addressValidation.idAddressValidation, addressId);

  await cekContact(user.username, contactId);

  return prismaClient.address.findMany({
    where: {
      id: Idaddress,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      country: true,
      postal_code: true,
    },
  });
};

export default { addAddressService, getAddressById };
