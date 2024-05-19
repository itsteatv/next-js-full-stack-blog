import Button from "../components/button/Button";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";

const Contact = () => {
  return (
    <section className="mt-28">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold md:text-5xl text-white mb-4">
          <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/6391714b7ac2b51acc1a2548_Rectangle%2017%20(1).svg')] bg-contain bg-center bg-no-repeat px-4 text-white">
            Let's Build
          </span>{" "}
          Something
        </h2>
        <div>
          <span className="text-3xl font-semibold md:text-5xl text-white">
            Exciting Together
          </span>
        </div>
        <form className="mb-4 rounded-3xl w-full min-h-[7rem] max-w-3xl sm:px-8 sm:py-16 md:px-20">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <TextArea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="inline-block w-full cursor-pointer rounded-xl bg-black px-8 py-4 mt-4 text-center duration-300 font-semibold text-white no-underline [box-shadow:rgb(19,_83,_254)_6px_6px]"
              type="button"
              content="Send"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
