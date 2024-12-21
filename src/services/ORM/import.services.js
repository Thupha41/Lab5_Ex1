import db, { sequelize } from "../../models";
class ImportServices {
  static async createUser(apiUser, company_id, address_id, transaction) {
    const user = await db.User.create(
      {
        fullName: apiUser.name,
        email: apiUser.email,
        address: "Default address",
        phone: apiUser.phone,
        website: apiUser.website,
        username: apiUser.username,
        registrationDate: new Date(),
        company_id,
        address_id,
      },
      { transaction }
    );
    return user;
  }

  static async createAddress(apiUser, transaction) {
    const address = await db.Address.create(
      {
        street: apiUser.address.street,
        suite: apiUser.address.suite,
        city: apiUser.address.city,
        zipcode: apiUser.address.zipcode,
        lat: apiUser.address.geo.lat,
        lng: apiUser.address.geo.lng,
      },
      { transaction }
    );
    return address;
  }

  static async createCompany(apiUser, transaction) {
    const company = await db.Company.create(
      {
        name: apiUser.company.name,
        catchPhrase: apiUser.company.catchPhrase,
        bs: apiUser.company.bs,
      },
      { transaction }
    );
    return company;
  }

  static async import(apiUsers) {
    const result = await sequelize.transaction(async (t) => {
      const createdUsers = await Promise.all(
        apiUsers.map(async (apiUser) => {
          const address = await this.createAddress(apiUser, t);
          const company = await this.createCompany(apiUser, t);
          const user = await this.createUser(
            apiUser,
            company.id,
            address.id,
            t
          );
          console.log(address);
          return user;
        })
      );
      return createdUsers;
    });

    return result;
  }
}

export default ImportServices;
