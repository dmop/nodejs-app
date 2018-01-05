const app = require("../app");
const request = require("supertest");

/* test ---------------------------------------------------------------- */

// describe("GET /urls/:id", () => {
//   it("should return 302 OK", done => {
//     request(app)
//       .get("/urls/0")
//       .expect(302, done);
//   });
// });

describe("GET /posts", () => {
  it("should return 200 OK", function(done) {
    request(app)
      .get("/posts")
      .expect(200, done);
  });
});

// describe("GET /users/:userId/stats", () => {
//   it("should return 200 OK", done => {
//     request(app)
//       .get("/users/5a16dc054ea69f308c1c4cb9/stats")
//       .expect(200, done);
//   });
// });

// describe("GET /posts/:id", () => {
//   it("should return 200 OK", done => {
//     request(app)
//       .get("/stats/0")
//       .expect(200, done);
//   });
// });