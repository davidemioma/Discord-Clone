export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#313338] flex items-center justify-center w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}
