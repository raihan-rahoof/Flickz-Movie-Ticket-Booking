import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";


export default function TheatreNav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          
          <h1 className="font-bold text-xl ">FLICKZ.</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" className={`hover:cursor-pointer ${props.now === 'dashboard' && 'text-indigo-500' }`}>
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
        <Link color="foreground" className={`hover:cursor-pointer ${props.now === 'Shows' && 'text-indigo-500' }`}>
            Shows
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className={`hover:cursor-pointer ${props.now === 'screens' && 'text-indigo-500' }`}>
            Screens
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        
        <NavbarItem>
          <Button as={Link} className="bg-indigo-500" href="#" variant="flat">
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        
          <NavbarMenuItem>
          <Link color="foreground" className={`${props.now === 'dashboard' && 'text-indigo-500' }`}>
            Dashboard
          </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
          <Link color="foreground" className={`${props.now === 'Shows' && 'text-indigo-500' }`}>
            Shows
          </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
          <Link color="foreground" className={`${props.now === 'screens' && 'text-indigo-500' }`}>
            Screens
          </Link>
          </NavbarMenuItem>
        
      </NavbarMenu>
    </Navbar>
  );
}
