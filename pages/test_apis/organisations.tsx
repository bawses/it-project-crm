import {
  createOrganisation,
  getOrganisations,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} from "../../api_client/OrganisationQueries";

export default function TestOrganisationApis() {
  async function test() {
    try {
      let org = {
        name: "Google Co.",
        email: ["test_tony_oop@Org.com"],
        passwordHash: "testing_org",
      };

      console.log("Testing create");
      let testCreate = await createOrganisation(org);
      console.log(testCreate);

      console.log("Testing get all");
      const orgs = await getOrganisations();
      console.log(orgs);

      console.log("Testing get");
      const id = testCreate._id;
      let testGet = await getOrganisationById(id);
      console.log(testGet);

      console.log("Testing update");
      let testUpdate = await updateOrganisation(id, {
        name: "Facebook Co.",
        email: [org.email + "_testSucceeded"],
      });
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteOrganisation(id);
      console.log("Delete success");
      console.log("Test success");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      See console for test
      <button onClick={() => test()}>Test</button>
    </div>
  );
}
