import GetOrganisationsSchema from "../schema/organisation/getOrganisations.schema.js";
import OrganisationSchema, {
  OrganisationModel,
} from "../schema/organisation/organisation.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
};

class OrganisationService {
  async getOrganisations(): Promise<GetOrganisationsSchema[]> {
    const rtn: OrganisationSchema[] = await OrganisationModel.find().select(
      "name _id"
    );

    return rtn.map<GetOrganisationsSchema>((r) => ({
      name: r.name,
      _id: r._id,
    }));
  }
}

export default OrganisationService;
