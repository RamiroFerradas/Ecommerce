const Toast = ({ message, show }) => {
  return !show ? (
    false
  ) : (
    <div
      id="myToast"
      className={`flex hidde fixed top-2 right-2 w-4/5 mf:w-full  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-white-800 z-[9999] transition-all`}
      role="alert"
    >
      <div className="flex items-center justify-center w-12 bg-green-500">
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span
            id="title-toast"
            className="font-bold text-indigo-600 dark:text-indigo-600"
          >
            ¡Genial!
          </span>
          <p
            id="mensaje-toast"
            className="text-sm text-indigo-500 dark:text-indigo-500 font-bold"
          >
            {message}
          </p>
          <button
            type="button"
            className="fixed top-5 right-5 btn-close box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-mdb-dismiss="myToast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};
export default Toast;
