import { hash as hashPassword, compare as verifyPassword } from "bcryptjs";
import mongoose from "mongoose";
import SignUpHandler from "../../pages/api/users/signup";
import UserIdHandler from "../../pages/api/users/[id]"
import UserSearchHandler from "../../pages/api/users/search";

describe("Signing up a user with valid credentials, performing updating, search and then deletion", () => {
  /* Testing in creating a user object */
  var userId;
  const testUserDetails = {
      firstName: "Yeetus",
      lastName: "Skeetus",
      email: "yeetuskeetus69@gmail.com",
      password: "iamasigmamale123"
    }

  beforeAll(done => {
    done()
  })

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done();
  })

  test('It should return back a valid user object', async () => {
    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      }
    })
    const res = {
      status
    }
    const createReq = {
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
    
    await SignUpHandler(createReq, res);

    userId = json.mock.calls[0][0].data._id;

    expect(json.mock.calls[0][0].data.email).toContain("yeetuskeetus69@gmail.com")
    expect(json.mock.calls[0][0].data.fullName).toEqual("Yeetus Skeetus")
    
    const isValid = await verifyPassword(testUserDetails.password, json.mock.calls[0][0].data.passwordHash);
    expect(isValid).toEqual(true);

    expect(json.mock.calls[0][0].data.name).toEqual({firstName: "Yeetus", lastName: "Skeetus"});
  });

  test('It should update the created user object', async () => {
    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      }
    })
    const res = {
      status
    }

    const updateReq = {
      method: "PUT",
      query: {id: userId},
      body: {
        name: {firstName: "Yeeter", lastName: "Skeeter"},
        fullName: "Yeeter Skeeter"
      }
    }

    await UserIdHandler(updateReq, res);

    const searchReq = {
      method: "GET",
      query: {id: userId},
    }

    await UserIdHandler(searchReq, res);

    expect(json.mock.calls[0][0].data.name).toEqual({firstName: "Yeeter", lastName: "Skeeter"});
    expect(json.mock.calls[0][0].data.fullName).toEqual("Yeeter Skeeter");
  });

  test("Searching a user by name in a Search Object", async () => {
    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      }
    })
    const res = {
      status
    }

    const searchReq = {
      method: "POST",
      body: {
        _id: userId,
        fullName: "Yeeter Skeeter",
      }
    }

    await UserSearchHandler(searchReq, res);
    expect(json.mock.calls[0][0].success).toEqual(true);
    expect(json.mock.calls[0][0].data[0].name).toEqual({firstName: "Yeeter", lastName: "Skeeter"});

  });

  test("It should delete the created user", async () => {
    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      }
    })
    const res = {
      status
    }
    const deleteReq = {
      method: "DELETE",
      query: {id: userId}
    }

    await UserIdHandler(deleteReq, res);

    const searchReq = {
      method: "GET",
      query: {id: userId}
    }

    await UserIdHandler(searchReq, res);

    expect(json.mock.calls[0][0].success).toEqual(true);
    expect(json.mock.calls[0][0].data.deletedCount).toEqual(1);

    expect(json.mock.calls[1][0].success).toEqual(false);
    expect(json.mock.calls[1][0].error).toBeDefined();
  })
})

