import { APP_NAME } from "@/lib/contants";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        &copy; {year} {APP_NAME}. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
