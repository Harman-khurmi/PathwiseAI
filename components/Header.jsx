import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  await checkUser();

  return <HeaderClient />;
};

export default Header;
