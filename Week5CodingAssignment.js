class CourseTitle {
  constructor(name, type){
    this.name = name;
    this.type = type;
  }

  describe(){
    return '${this.name} plays ${this.type}.';
  }
}

class Vendor {
  constructor(name){
    this.name = name;
    this.courses = [];
  }

  addCourseTitle(CourseTitle){
    if(CourseTitle instanceof CourseTitle){
      this.courses.push(CourseTitle);
    } else {
      throw new Error('You can only add an instance of CourseTitle. Argument is not a CourseTitle: ${CourseTitle}');
    }
  }

  describe(){
    return '${this.name} has ${this.CourseTitle.length} course types.';
  }
}

class Menu {
  constructor(){
    this.vendors = [];
    this.selectedVendor = null;
  }

  start(){
    let selection = this.showMainMenuOptions();
    while (selection !=0){
      switch (selection){
        case '1':
        this.createVendor();
        break;
        case '2':
        this.viewVendor();
        break;
        case '3':
        this.deleteVendor();
        break;
        case '4':
        this.displayVendor();
        break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert('Goodbye!');
  }

  showMainMenuOptions(){
    return prompt(`
    0)exit
    1)create new vendor
    2)view vendor
    3)delete vendor
    4)display all vendors
    `);
  }

showVendorMenuOptions(vendorInfo){
  return prompt(`
  0) back
  1) create course type
  2) delete course type
  3) view course types
  --------------------
  ${vendorInfo}
  `);
}

  displayVendor(){
    let vendorsString = '';
    for (let i = 0; i < this.vendors.length; i++){
      vendorsString += i + ')' + this.vendors[i].name + '\n';
    }
    alert(vendorsString);
  }

  createVendor(){
    let name = prompt('Enter name for new vendor:');
    this.vendors.push(new Vendor(name));
  }

  viewVendor(){
    let index = prompt('Enter the index of the vendor you wish to view:');
    if(index > -1 && index < this.vendors.length){
      this.selectedVendor = this.vendors[index];
      let description = 'Vendor Name: ' + this.selectedVendor.name + '\n';

      for (let i = 0; i < this.selectedVendor.courses.length; i++){
        description += i + ') ' + this.selectedVendor.courses[i].names
        + ' - ' + this.selectedVendor.courses[i].type + '\n';
      }

      let selection = this.showVendorMenuOptions(description);
      switch (selection) {
        case '1':
          this.createCourseTitle()
          break;
        case '2':
          this.deleteCourseTitle();
          break;
        case '3':
          this.displayCourseTitle();
        default:
          selection = 0

      }
    }
  }
deleteVendor(){
  let index = prompt('Enter the index of the vendor you wish to delete:');
  if (index > -1 && index < this.selectedVendor.length){
    this.vendors.splice(index, 1);
  }
}


  createCourseTitle(){
    let name = prompt('Enter title for new course:');
    let type = prompt('Enter course type for new course:'); // blended vs instructor led vs virtual
    this.selectedVendor.courses.push(new CourseTitle(name, type));
  }

  deleteCourseTitle(){
    let index = prompt('Enter the index of the course you wish to delete:');
    if (index > -1 && index < this.selectedVendor.courses.length){
      this.selectedVendor.courses.splice(index, 1);
    }
  }

  displayCourseTitle(){
    let coursesString = '';
    for (let i = 0; i < this.courses.length; i++){
      coursesString += i + ')' + this.courses[i].name + '\n';
    }
    alert(vendorsString);
  }
  }
}
let menu = new Menu();
menu.start();
