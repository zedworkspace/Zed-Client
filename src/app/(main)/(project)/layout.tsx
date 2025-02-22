type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <div className="flex">
        <main className="bg-primary w-full min-h-screen border-none">
          {children}
        </main>
      </div>
    </>
  );
}

export default layout;
