"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

people.push(new app.Person("Anna", "765-4321"));
people.push(new app.Person("Karl", "754-4234"));
people.push(new app.Person("Joe", "831-5595"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
 var bob = new app.Tenant("Bob", "744-1234");
bob.addReference(new app.Person("Jimmy","353 4354 3452"));
people.push(bob);

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      if (building.units[i].tenant === null){
        console.log(" tenant: " +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
      } else {
      console.log(" tenant: " + building.units[i].tenant.name +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
        }
    }
  }  
);

menu.addItem('Show available units', 
  function() {
    for(var i = building.units.length -1; i >= 0; i--){
      if ( building.units[i].tenant === null){
      console.log(" num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
    }
    } 
);

// create people check if ref is instanceof people and not a tennatn
menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
    people.forEach(function(person) {
      if (person.name instanceof app.Tenant) {
        return;
      } 
    });
    // var reference = new app.Person(ref_name, ref_contact);
    people.forEach(function (person) {
      if (person.name === tenant_name && person instanceof app.Tenant){
        person.addReference(reference);
      }
     }); 
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);


menu.addItem('Move tenant in unit', 
  function(unit_number, tenant_name) {
    // building.addTenant(unit_number, tenant_name);
    //   // find tenant and unit objects, use building's addTenant() function.
    var targetUnit;

    building.units.forEach(function(unit) {
      if (unit_number == unit.number) {
        targetUnit = unit;
      }
    });

    people.forEach(function(tenant) {
      if(tenant_name === tenant.name) {
        building.addTenant(targetUnit, tenant);
      }
    });
  },
  null, 
  [{'name': 'unit_number', 'type': 'string'},
  {'name': 'tenant_name', 'type': 'string'}] 
);


menu.addItem('(implement me) Evict tenant', 
  function(tenant_name) {

// find  tenant in people array and if they exist 
// remove teneant object not name. 

      // Similar to above, use whatever you want.
   //    var targetUnit;

   //  building.units.forEach(function(unit) {
   //    if(unit.tenant !== null && tenant_name == unit.tenant.name){
   //      targetUnit = unit.number;
        
   //      }

   //    });

   // building.removeTenant(targetUnit, tenant);
   
   building.units.forEach(function (unit) {
    if(unit.tenant && unit.tenant.name === tenant_name){
      unit.tenant = null;
    }
   });
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Show total sqft rented', 
function() {
    var total = 0;

    building.units.forEach(function(unit){
      if (unit.tenant !== null){
        
        total += unit.sqft;
       
        }
    });

      console.log(total);
    } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
    var total = 0;
   
    building.units.forEach(function(unit){
      if (unit.tenant !== null){
        // total.push(unit.rent);
        total += unit.rent;
        }
    });

      console.log(total);
    } 

);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();