import Image from "next/image";
export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fade-in container  pl-0 flex max-w-2xl  mt-16 rounded-lg border border-base-content border-opacity-10 shadow-md  bg-opacity-20">
      <section className="flex-1 p-10 mx-auto w-1/2 flex flex-col">
        {children}
      </section>
    </div>
  );
}
