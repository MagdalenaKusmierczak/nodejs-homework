const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST: urlDb } = process.env;
const { login } = require("./users");

app.post("/api/users/login", login);

describe("test login controller", () => {
  let server;
  let response;
  beforeAll(() => {
    mongoose
      .connect(urlDb)
      .then(() => (server = app.listen(3000)))
      .catch((e) => process.exit(1));
  });

  beforeEach(async () => {
    response = await supertest(app).post("/api/users/login").send({
      email: "test@o2.pl",
      password: "123Deq",
    });
  });

    test("response.code(200)", async () => {
      const { code } = response.body;
    expect(code).toBe(200);
  });

  test("get token", async () => {
    const { token } = response.body;
    expect(token).toBeTruthy();
  });

  test("user object with two fields of string data type", async () => {
    const { user } = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(() => {
    mongoose.disconnect(urlDb).then(() => {
      server.close();
    });
  });
});
