export default function Background() {
  return (
    <>
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/5 blur-[180px]" />

      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-white/5 blur-[150px]" />

      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-[180px]" />
    </>
  );
}