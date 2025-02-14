const SignIn = () => {
  return (
    <div className="sm:max-w-smd mx-auto flex items-center justify-center min-h-screen ">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--user-speak-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                type="text"
                className="input max-w-sm"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--lock-password-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                type="password"
                className="input max-w-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 bg-gradient-to-r from-primary to-neutral bg-clip-text text-transparent font-bold w-fit">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:text-primary-content duration-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
