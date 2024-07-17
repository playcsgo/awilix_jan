/* eslint-disable class-methods-use-this */
// const devDao = require('../dao/dev');  // service 裡面又有dev.  too many coupling


class DevService {
  
  constructor({ devDao }) {
    this.devDao = devDao

    // 因為 service 不會直接被Express call,
    // 只會被controller call.  所以不用綁this.
  }

  getDev(id) {
    return this.devDao.getDev(id);


  }

  createDev({ email, firstName, middleNames, lastName }) {
    // John Smith  Alexander Johnson
    const { fName, mNames, lName } = this.sanitizeNames(
      firstName,
      middleNames,
      lastName
    );

    return this.devDao.createDev(email, fName, mNames, lName);
  }

  sanitizeNames(firstName, middleNameStr, lastName) {
    // eslint-disable-next-line prefer-const
    let [sanitizedFirstName, ...mNames] = firstName.trim().split(' ');
    if (middleNameStr) {
      mNames = mNames.concat(middleNameStr.split(' '));
    }

    const sanitizedMiddleNames = mNames.filter((n) => n);
    // console.log('sanitizedMiddleNames', sanitizedMiddleNames);

    // in case we do not have any middlenames
    // we want to return null and not empty string
    // for the middle name
    const sanitizedMiddleName = sanitizedMiddleNames.length
      ? sanitizedMiddleNames.join(' ')
      : null;
    const sanitizedLastName = lastName.trim();

    return {
      fName: sanitizedFirstName,
      mNames: sanitizedMiddleName,
      lName: sanitizedLastName,
    };
  }
}

module.exports = DevService;
