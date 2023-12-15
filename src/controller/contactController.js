import contactService from '../services/contactService.js';

const addContactHandler = async (req, res, next) => {
  try {
    const result = await contactService.addContact(req.user, req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getContactByIdHandler = async (req, res, next) => {
  try {
    const contactid = parseInt(req.params.id, 10);
    console.log(req.params.id);
    const result = await contactService.getContact(req.user, contactid);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateContactHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = req.body;
    contact.id = id;

    const result = await contactService.updateContact(req.user, contact);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteContactHandler = async (req, res, next) => {
  try {
    await contactService.deleteContact(req.user, req.params.id);
    res.status(200).json({
      status: 'success',
      message: `${req.params.id} sudah terhapus`,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  addContactHandler, getContactByIdHandler, updateContactHandler, deleteContactHandler,
};
