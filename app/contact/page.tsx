import Button from "../components/button/Button";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";

const Contact = () => {
  return (
    <section className="mt-28">
      <div className="flex flex-col items-center">
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
              name="name"
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
              name="email"
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
              name="message"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="inline-block w-full cursor-pointer rounded-xl bg-black px-8 py-4 mt-4 text-center duration-300 font-semibold text-white no-underline [box-shadow:rgb(19,_83,_254)_6px_6px]"
              type="submit"
              content="Send"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
