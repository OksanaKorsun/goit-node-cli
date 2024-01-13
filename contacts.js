const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

// const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  //   const list = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}
listContacts();
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
  // const newContacts = allContacts.filter(contact => contact.id !== contactId);
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}
module.exports = { listContacts, getContactById, removeContact, addContact };
