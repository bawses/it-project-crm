import mongoose from "mongoose";
import { hash as hashPassword, compare as verifyPassword } from "bcryptjs";
import ManualIndexHandler from "../../pages/api/manual_contacts/index";
import ManualIdHandler from "../../pages/api/manual_contacts/[id]"
import ManualSearchHandler from "../../pages/api/manual_contacts/search";
import UserIdHandler from "../../pages/api/users/[id]"
import SignUpHandler from "../../pages/api/users/signup";

describe("Create a mock user, then create a manual contact, update and search, and then delete", () => {
  var ownerId = "";
  var contactId = "";
  const testUserDetails = {
      firstName: "Yeetus",
      lastName: "Skeetus",
      email: "yeetuskeetus69@gmail.com",
      password: "iamasigmamale123"
  }
  
  const testManualContactDetails = {
    name: {
      firstName: "Tony",
      lastName: "Dang",
    },
    email: ["tony.dang@gmail.com"],
    archived: false,
    starred: false
  }

  const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      }
    })
    const res = {
      status
  }

  beforeAll(done => {
    done();
  })

  afterAll(done => {
    mongoose.connection.close();
    done();
  })

  test("Successfully create a user and manual contact", async () => {
    const createUserReq = {
      method: "POST",
      body: {
        name: {
          firstName: testUserDetails.firstName,
          lastName: testUserDetails.lastName,
        },
        fullName: testUserDetails.firstName + " " + testUserDetails.lastName,
        email: testUserDetails.email,
        passwordHash: await hashPassword(testUserDetails.password, 10),
      }
    }

    await SignUpHandler(createUserReq, res)
    
    ownerId = json.mock.calls[0][0].data._id;

    const createManualReq = {
      method: "POST",
      body:{
        name: {
          firstName: testManualContactDetails.name.firstName,
          lastName: testManualContactDetails.name.lastName
        },
        ownerId: ownerId,
        email: testManualContactDetails.email,
        archived: testManualContactDetails.archived,
        starred: testManualContactDetails.starred,
        fullName: testManualContactDetails.name.firstName + " " + testManualContactDetails.name.lastName
      }
    }

    await ManualIndexHandler(createManualReq, res);

    contactId = json.mock.calls[1][0].data._id

    expect(json.mock.calls[1][0].data.email).toContain('tony.dang@gmail.com');
    expect(json.mock.calls[1][0].data.ownerId).toEqual(String(ownerId));
    expect(json.mock.calls[1][0].data.fullName).toEqual("Tony Dang");

  });

  test("Update the name of the created manual contact", async() => {
    const updateReq = {
      method: "PUT",
      query: {id: contactId},
      body: {
        name: {firstName: "Toneth", lastName: "Dangus"},
        phone: ["0263862381"]
      }
    }

    await ManualIdHandler(updateReq, res);

    expect(json.mock.calls[2][0].success).toBe(true);
  })

  test("Search the update manual contact", async() => {
    const searchReq = {
      method: "POST",
      body: {
        name: {firstName: "Toneth", lastName: "Dangus"},
      }
    }

    await ManualSearchHandler(searchReq, res);

    expect(json.mock.calls[3][0].data[0].name).toEqual({firstName: "Toneth", lastName: "Dangus"});
    expect(json.mock.calls[3][0].data[0]._id).toEqual(contactId);

  })

  test("Get the created user's manual contact", async () => {
    const getContactReq = {
      method: "POST",
      body: {ownerId: ownerId}
    }

    await ManualSearchHandler(getContactReq, res);

    expect(json.mock.calls[4][0].success).toBe(true);
    expect(json.mock.calls[4][0].data).toHaveLength(1);
    expect(json.mock.calls[4][0].data[0]._id).toEqual(contactId);

  });

  test("Delete the manual contact and user", async() => {
    const deleteUserReq = {
      method: "DELETE",
      query: {id: ownerId}
    }
    const deleteManualReq = {
      method: "DELETE",
      query: {id: contactId}
    }

    await UserIdHandler(deleteUserReq, res);
    await ManualIdHandler(deleteManualReq, res);

    expect(json.mock.calls[5][0].success).toBe(true);
    expect(json.mock.calls[6][0].success).toBe(true);

  })

})