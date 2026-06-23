const authorize = require(
  "../../middlewares/roleMiddleware"
);

describe("Role Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      user: {
        role: "",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test("Should allow admin access", () => {
    req.user.role = "admin";

    authorize("admin")(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("Should allow operator access", () => {
    req.user.role = "operator";

    authorize("admin", "operator")(
      req,
      res,
      next
    );

    expect(next).toHaveBeenCalled();
  });

  test("Should deny unauthorized role", () => {
    req.user.role = "operator";

    authorize("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(
      403
    );

    expect(next).not.toHaveBeenCalled();
  });
});