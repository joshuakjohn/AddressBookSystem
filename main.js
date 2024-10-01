class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // Use Case 1: Add Contact
    addContact(contact) {
        this.contacts.push(contact);
    }

    // Use Case 2: Validate Contact
    static isValidContact(contact) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        const addressPattern = /^.{4,}$/;
        const zipPattern = /^\d{5}$/;
        const phonePattern = /^[0-9]{10}$/;
        const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!namePattern.test(contact.firstName) || !namePattern.test(contact.lastName)) {
            throw new ValidationError('First and Last name should start with a capital letter and be at least 3 characters.');
        }
        if (!addressPattern.test(contact.address) || !addressPattern.test(contact.city) || !addressPattern.test(contact.state)) {
            throw new ValidationError('Address, City, and State should have at least 4 characters.');
        }
        if (!zipPattern.test(contact.zip)) {
            throw new ValidationError('Invalid Zip Code');
        }
        if (!phonePattern.test(contact.phone)) {
            throw new ValidationError('Invalid Phone Number');
        }
        if (!emailPattern.test(contact.email)) {
            throw new ValidationError('Invalid Email');
        }
    }

    // Use Case 3: Add Contact to New Address Book
    addNewContact(contact) {
        try {
            AddressBook.isValidContact(contact);
            this.addContact(contact);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Use Case 4: Find and Edit Contact
    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContact(firstName, lastName, newDetails) {
        const contact = this.findContact(firstName, lastName);
        if (contact) {
            Object.assign(contact, newDetails);
        } else {
            console.log('Contact not found');
        }
    }

    // Use Case 5: Delete Contact
    deleteContact(firstName, lastName) {
        this.contacts = this.contacts.filter(contact => !(contact.firstName === firstName && contact.lastName === lastName));
    }

    // Use Case 6: Count Contacts
    countContacts() {
        return this.contacts.reduce((count) => count + 1, 0);
    }

    // Use Case 7: Check for Duplicate Contact
    hasDuplicate(firstName, lastName) {
        return this.contacts.some(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    addUniqueContact(contact) {
        if (!this.hasDuplicate(contact.firstName, contact.lastName)) {
            this.addNewContact(contact);
        } else {
            console.log('Duplicate entry found');
        }
    }

    // Use Case 8: Search Contact by City or State
    searchByCityOrState(location) {
        return this.contacts.filter(contact => contact.city === location || contact.state === location);
    }

    // Use Case 9: View Contacts by City or State
    viewByCityOrState(location) {
        const contactsByLocation = this.searchByCityOrState(location);
        contactsByLocation.forEach(contact => console.log(contact));
    }

    // Use Case 10: Count Contacts by City or State
    countByCityOrState(location) {
        return this.searchByCityOrState(location).length;
    }

    // Use Case 11: Sort by Name
    sortByName() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log(this.contacts);
    }

    // Use Case 12: Sort by City, State, or Zip
    sortByCity() {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
        console.log(this.contacts);
    }

    sortByState() {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
        console.log(this.contacts);
    }

    sortByZip() {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
        console.log(this.contacts);
    }
}

// Example Usage:
const addressBook = new AddressBook();
try {
    const contact1 = new Contact('John', 'Doe', '1234 Elm St', 'New York', 'New York', '10001', '1234567890', 'john.doe@example.com');
    addressBook.addUniqueContact(contact1);

    const contact2 = new Contact('Jane', 'Doe', '4321 Maple Ave', 'Los Angeles', 'California', '90001', '0987654321', 'jane.doe@example.com');
    addressBook.addUniqueContact(contact2);

    console.log('Total Contacts:', addressBook.countContacts());
    addressBook.sortByName();
    addressBook.sortByCity();

} catch (error) {
    console.error(error.message);
}
