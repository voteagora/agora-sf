const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-stone-100 py-2 text-center text-sm text-stone-600">
      Made by{" "}
      <a
        href="https://twitter.com/philipliao_"
        target="_blank"
        className="underline"
      >
        Phil Liao
      </a>{" "}
      and the{" "}
      <a href="https://www.voteagora.com" target="_blank" className="underline">
        Agora team
      </a>
      . Data from{" "}
      <a
        href="https://sfgov.legistar.com/Legislation.aspx"
        target="_blank"
        className="underline"
      >
        SF Legistar
      </a>
      .
    </footer>
  );
};

export default Footer;
