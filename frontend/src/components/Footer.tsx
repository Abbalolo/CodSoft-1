

function Footer() {
  return (
    <footer className=" bg-black flex flex-col justify-between text-sm md:text-md pb-5">
      <div className="mt-8 w-full px-8 md;px-[500px] flex justify-around flex-col md:flex-row text-sm md:text-md py-8">
        <div className="flex flex-col gap-2 text-white">
          <p>Featured Blogs</p>
          <p>Most Viewd Blogs</p>
          <p>Readers Choice</p>
        </div>
        <div className="flex flex-col gap-2 text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col gap-2 text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="text-white text-center">
        All Right Reserved @CodSoft Blog 2024
      </p>
    </footer>
  );
}

export default Footer;
