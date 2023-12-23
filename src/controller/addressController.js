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

const updateAddressByIdHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const contactId = parseInt(req.params.contactId, 10);
    const addressId = parseInt(req.params.addressId, 10);
    const address = req.body;
    address.id = addressId;

    const result = await addressService.updateAddress(user, contactId, address);

    res.status(200).json({
      status: 'berhasil mengupdate',
      message: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteAddressByIdHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const contactId = parseInt(req.params.contactId, 10);
    const addressId = parseInt(req.params.addressId, 10);

    await addressService.deleteAddress(user, contactId, addressId);

    res.status(200).json({
      status: 'success',
      message: 'data alamat berhasil dihapus',
    });
  } catch (e) {
    next(e);
  }
};

export default {
  addAddressHandler, getAddressByIdHandler, updateAddressByIdHandler, deleteAddressByIdHandler,
};
