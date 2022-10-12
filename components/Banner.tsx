function Banner() {
  return (
    <div className=" py-10 md:py-0 flex justify-between items-center bg-amber-900 text-white md:rounded-lg md:w-[1280px]">
      <div className="text-4xl pl-16 tracking-wide">
        <span className="underline text-7xl">BLOG</span> is a place to read,
        write, shared
        <p className=" mt-4 text-xs md:text-md">
          It's easy and free to post your thoughts on any topic and share it
          with others
        </p>
      </div>
      <h3 className="hidden md:block text-[15rem] pr-16">B</h3>
    </div>
  );
}

export default Banner;
