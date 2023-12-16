import addressService from '../services/addressService.js';

const addAddressHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const contactId = parseInt(req.params.contactid, 10);
    const dataAddress = req.body;

    const result = await addressService.addAddressService(user, contactId, dataAddress);

    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAddressByIdHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const contactId = parseInt(req.params.contactId, 10);
    const addressId = parseInt(req.params.addressId, 10);

    const result = await addressService.getAddressById(user, contactId, addressId);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { addAddressHandler, getAddressByIdHandler };
