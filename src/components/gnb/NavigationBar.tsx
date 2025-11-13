import LogoFullSmall from "@/assets/images/logo-full-small.svg";
import Logo from "@/assets/images/logo.svg";
import Icon from "@/components/icon";
import { useAuthStore } from "@/stores/auth-store";
import { overlay } from "overlay-kit";
import Drawer from "./Drawer";
import NavigationBarProfile from "./NavigationBarProfile";
import ProfileMenu from "./ProfileMenu";

export default function NavigationBar() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const handleMenuClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Drawer isOpen={isOpen} onClose={close} onExit={unmount} />
      ),
      { overlayId: "gnb-drawer" }
    );
  };

  return (
    <nav className="flex h-13 items-center px-4">
      {loggedIn ? (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-3">
            <button className="cursor-pointer" onClick={handleMenuClick}>
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
