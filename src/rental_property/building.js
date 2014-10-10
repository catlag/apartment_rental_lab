"use strict"

function Building(address) {
  this.address = address;
  this.units = [];
  

  // building has an address
  // ...
  // and array of units
  // ...
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
    this.manager = person;
  }
};

Building.prototype.getManager = function(){
  return this.manager;  
};

Building.prototype.addTenant = function(unit, tenant) {
  if (this.manager && tenant.references.length >= 2){
    if (this.units.indexOf(unit) !== -1 && unit.available() === true){
      unit.tenant = tenant;
    }
   }
   else {
      unit.tenant = null;
   }
  return this;
};

Building.prototype.removeTenant = function(unit, tenant) {
  if (this.manager === null) {
    return;
  }
  if(this.units.indexOf(unit) === -1){
    return;
  }
  if (unit.tenant === tenant){
    unit.tenant = null;
  }
 
};

Building.prototype.availableUnits = function(){
    return this.units.filter(function(unit){
      return unit.available();
    });
};
        

Building.prototype.rentedUnits = function(){
  return this.units.filter(function(unit){
      return !unit.available();
    });
};

module.exports = Building;
