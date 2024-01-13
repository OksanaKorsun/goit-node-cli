const { program } = require("commander");
const contacts = require("./contacts");
//yargs

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);
program.parse();

const options = program.opts();
// console.log('options:', options);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "listContacts":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "getContactById":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "removeContact":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(options);

// invokeAction({ action: 'listContacts' });
// invokeAction({ action: 'getContactById', id: 'Z5sbDlS7pCzNsnAHLtDJd' });
// invokeAction({ action: 'addContact', name: 'Liza', email: 'contact@gmail.com', phone: '(093) 249-7770' });
// invokeAction({ action: "removeContact", id: "1ss2YNUizRQpeVf7cFOMK" });
