var data = {
  firstName: 'Sankar Ganesh',
  lastName: 'Arumugamangalam Nellaivinayagam'
};

JSON.stringify(data) // prints "{"firstName":"Sankar Ganesh","lastName":"Arumugamangalam Nellaivinayagam"}"

data.next = data;    // Add cyclic

JSON.stringify(data) // Uncaught TypeError: Converting circular structure to JSON

data.toJSON = function() {    // Define Serializer
  return {
    firstName: this.firstName,
    lastName: this.lastName
  };
};

JSON.stringify(data) // prints "{"firstName":"Sankar Ganesh","lastName":"Arumugamangalam Nellaivinayagam"}"
