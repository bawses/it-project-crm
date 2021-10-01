import AddedIndexHandler from "../../pages/api/added_contacts/index";
import AddedIdHandler from "../../pages/api/added_contacts/[id]";
import AddedSearchHandler from "../../pages/api/added_contacts/search";
import UserIdHandler from "../../pages/api/users/[id]"
import SignUpHandler from "../../pages/api/users/signup";
import mongoose from "mongoose";
import { hash as hashPassword, compare as verifyPassword } from "bcryptjs";

describe("Create two mock users, perform adding, searching added contact and deleting", () => {
  var authId;
  var authId2;
  var addedId;
  const testUserDetails = {
      firstName: "Yeetus",
      lastName: "Skeetus",
      email: "yeetuskeetus69@gmail.com",
      password: "iamasigmamale123"
  }

  const testUserDetails2 = {
      firstName: "Sigma",
      lastName: "Man",
      email: "sigmaman69@gmail.com",
      password: "iamaweeb123"
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

  test("Create two mock users and add each other", async() => {
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

    await SignUpHandler(createUserReq, res);
    authId = json.mock.calls[0][0].data._id;

    const createUserReq2 = {
      method: "POST",
      body: {
        name: {
          firstName: testUserDetails2.firstName,
          lastName: testUserDetails2.lastName,
        },
        fullName: testUserDetails2.firstName + " " + testUserDetails2.lastName,
        email: testUserDetails2.email,
        passwordHash: await hashPassword(testUserDetails2.password, 10),
      }
    }

    await SignUpHandler(createUserReq2, res);
    authId2 = json.mock.calls[1][0].data._id;

    expect(json.mock.calls[0][0].success).toBe(true);
    expect(json.mock.calls[1][0].success).toBe(true);

    // Add the two users together
    const addReq = {
      method: "POST",
      body: {
        fromUserId: authId,
        toUserId: authId2,
        starred: false,
      }
    }

    await AddedIndexHandler(addReq, res);
    addedId = json.mock.calls[2][0].data._id;
    expect(json.mock.calls[2][0].success).toBe(true);

  })

  test("Update added user, set starred to true instead of false", async () => {
    const updateAddedReq = {
      method: "PUT",
      query: {id: addedId},
      body: {
        starred: true
      }
    }

    await AddedIdHandler(updateAddedReq, res);

    expect(json.mock.calls[3][0].success).toBe(true);

  });

  test("Search and return back valid added user object, with starred set to true", async () => {
    const searchAddedReq = {
      method: "POST",
      body: {
        fromUserId: authId
      }
    }

    await AddedSearchHandler(searchAddedReq, res);

    expect(json.mock.calls[4][0].data).toHaveLength(1);
    expect(json.mock.calls[4][0].data[0].starred).toBe(true);
  })

  test("Delete the two created users and remove the added link between", async () => {
    const deleteUserReq = {
      method: "DELETE",
      query:{id: authId}
    }

    const deleteUser2Req = {
      method: "DELETE",
      query:{id: authId2}
    }

    await UserIdHandler(deleteUserReq, res);
    await UserIdHandler(deleteUser2Req, res);

    const deleteAddedReq = {
      method: "DELETE",
      query: {id: addedId}
    }

    await AddedIdHandler(deleteAddedReq, res);

    expect(json.mock.calls[5][0].success).toBe(true);
    expect(json.mock.calls[6][0].success).toBe(true);
    expect(json.mock.calls[7][0].success).toBe(true);
  })
})