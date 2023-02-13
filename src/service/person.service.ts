import { AddressModel } from "../schema/address/address.schema.js";
import { ContactModel } from "../schema/contact/contact.schema.js";
import { FlagModel } from "../schema/flag/flag.schema.js";
import { OrganisationModel } from "../schema/organisation/organisation.schema.js";
import GetPersonsSchema, {
  EditAddressDetailsSchema,
  EditContactDetailsSchema,
  EditPersonBasicDetailsSchema,
  GetPersonSchema,
} from "../schema/person/getPersons.schema.js";
import PersonSchema, { PersonModel } from "../schema/person/person.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
};

class PersonService {
  async editPersonBasicDetails(
    input: EditPersonBasicDetailsSchema
  ): Promise<boolean> {
    console.log(input);
    const person = await PersonModel.updateOne<PersonSchema>(
      { id: input._id },
      {
        ...input,
      }
    );

    return person.acknowledged;
  }

  async editContactDetails(input: EditContactDetailsSchema): Promise<boolean> {
    await ContactModel.updateOne(
      { _id: input._id },
      {
        email: input.email,
        cellNumber: input.cellNumber1,
        cellNumber2: input.cellNumber2,
      }
    );

    return true;
  }

  async editAddressDetails(input: EditAddressDetailsSchema): Promise<boolean> {
    await AddressModel.updateOne(
      { _id: input._id },
      {
        line1: input.line1,
        line2: input.line2,
        line3: input.line3,
        line4: input.line4,
        line5: input.line5,
        line6: input.line6,
      }
    );

    return true;
  }

  async getPersons(): Promise<GetPersonsSchema[]> {
    const persons: GetPersonsSchema[] = [];

    const people: PersonSchema[] = await PersonModel.find().select(
      "surName givenName _id flgGender dob flgMaritalStatus organisationId "
    );

    for (const person of people) {
      const maritalStatus = (await FlagModel.findById(person.flgMaritalStatus))
        .description;

      const gender = (await FlagModel.findById(person.flgGender)).description;

      const organisation = (
        await OrganisationModel.find({ _id: person.organisationId })
      )[0].name;

      persons.push({
        maritalStatus,
        gender,
        organisation,
        surName: person.surName,
        givenName: person.givenName,
        _id: person._id,
      });
    }

    return persons;
  }

  async getPerson(id: String): Promise<GetPersonSchema> {
    const person = await PersonModel.findById(id);
    const gender = (await FlagModel.findById(person.flgGender)).description;
    const maritalStatus = (await FlagModel.findById(person.flgMaritalStatus))
      .description;
    const organisation = (
      await OrganisationModel.find({ _id: person.organisationId })
    )[0].name;
    const contact = await ContactModel.findById(person.contactId);
    const address = await AddressModel.findById(person.addressId);

    return {
      _id: person._id,
      surName: person.surName,
      givenName: person.givenName,
      gender,
      flgGender: person.flgGender,
      maritalStatus,
      flgMaritalStatus: person.flgMaritalStatus,
      organisation,
      organisationId: person.organisationId,
      contactId: contact._id,
      email: contact.email,
      cellNumber1: contact.cellNumber,
      cellNumber2: contact.cellNumber2,
      addressId: address._id,
      line1: address.line1,
      line2: address.line2,
      line3: address.line3,
      line4: address.line4,
      line5: address.line5,
      line6: address.line6,
    };
  }
}

export default PersonService;
