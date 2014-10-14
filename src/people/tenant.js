 var Person = require("./person.js");

function Tenant(name, contact, references) {
 Person.call(this, name, contact);
  this.references = [];

};

Tenant.prototype = new Person();
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
  if (reference instanceof Person)
  	this.references.push(reference);
};

Tenant.prototype.removeReference = function(reference) {
   if (this.references.indexOf(reference) !== -1) {
  		this.references.splice(this.references.indexOf(reference),1);
  	}
  return this;
};

module.exports = Tenant;
