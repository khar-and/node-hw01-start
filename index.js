const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose your action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);
    case "remove":
      const deletedContact = await contacts.removeContact(id);
      return console.table(deletedContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

      break;

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
