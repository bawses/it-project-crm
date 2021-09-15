import {
  createOrganisation,
  getAllOrganisations,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} from "../../api_client/OrganisationQueries";

export default function TestOrganisationApis() {
  var testCreate = {};
  var testGet = {};
  var testUpdate = {};

  var org = {
    name: "Google Co.",
    email: ["test_tony_oop@Org.com"],
    passwordHash: "testing_org",
  };

  async function test() {
    try {
      console.log("Testing create");
      testCreate = await createOrganisation(org);
      console.log(testCreate);

      console.log("Testing get all");
      const orgs = await getAllOrganisations();
      console.log(orgs);

      console.log("Testing get");
      const id = orgs[orgs.length - 1]._id || "";
      testGet = await getOrganisationById(id);
      console.log(testGet);

      console.log("Testing update");
      testUpdate = await updateOrganisation(id, {
        name: "Facebook Co.",
        email: [org.email + "_testSucceeded"],
      });
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteOrganisation,(id);
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
