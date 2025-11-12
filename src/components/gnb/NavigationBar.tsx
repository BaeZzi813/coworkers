import LogoFullSmall from "@/assets/images/logo-full-small.svg";
import Logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/stores/auth-store";
import Icon from "../icon";
import NavigationBarProfile from "./NavigationBarProfile";
import ProfileMenu from "./ProfileMenu";

export default function NavigationBar() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return (
    <nav className="flex h-13 items-center px-4">
      {loggedIn ? (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-3">
            <button className="cursor-pointer">
              <Icon name="menu" color="#94A3B8" />
            </button>
            <Logo />
          </div>
          <ProfileMenu anchor={<NavigationBarProfile />} alignment="right" />
        </div>
      ) : (
        <LogoFullSmall />
      )}
    </nav>
  );
}
