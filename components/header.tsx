import Link from "next/link";

const Header = () => {
  return (
    <section className="px-4 border-b py-4 bg-white mb flex justify-between">
      
      <Link href="/">
        <div className="font-medium cursor-pointer">SF Agora</div>
      </Link>
      <div className="text-stone-600">Legislations</div>
    </section>
  );
};

export default Header;
