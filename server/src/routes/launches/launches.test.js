const request = require("supertest");
const app = require("../../app");

describe("Test Get /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test Post /launches", () => {
  const completeLaunchData = {
    mission: "USS",
    rocket: "NCC",
    target: "KEPLET",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS",
    rocket: "NCC",
    target: "KEPLET",
  };
  const launchDataWithInvalidDate = {
    mission: "USS",
    rocket: "NCC",
    target: "KEPLET",
    launchDate: "Jzoot",
  };
  test("it should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf;
    const responseDate = new Date(response.body.launchDate).valueOf;
    expect(response.body).toMatchObject(launchDataWithoutDate);
    expect(responseDate).toBe(requestDate);
  });

  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
