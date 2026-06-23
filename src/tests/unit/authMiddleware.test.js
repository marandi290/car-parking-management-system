const jwt = require("jsonwebtoken");
const authenticate = require(
  "../../middlewares/authMiddleware"
);

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test("Should return 401 when token is missing", () => {
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("Should return 401 for invalid token", () => {
    req.headers.authorization =
      "Bearer invalidtoken";

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("Should call next for valid token", () => {
    req.headers.authorization =
      "Bearer validtoken";

    jwt.verify.mockReturnValue({
      id: 1,
      role: "admin",
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(req.user).toEqual({
      id: 1,
      role: "admin",
    });
  });
});