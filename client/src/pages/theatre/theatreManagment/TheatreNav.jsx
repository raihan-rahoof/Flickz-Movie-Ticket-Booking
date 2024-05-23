import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "../../../utlis/axiosinstance";


export default function TheatreNav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const theatre = JSON.parse(localStorage.getItem('theatre'))
  const access = JSON.parse(localStorage.getItem('theatre_access'))
  const refresh = JSON.parse(localStorage.getItem('theatre_refresh'))
  const navigate = useNavigate()

  const axiosInstance = createAxiosInstance('theatre')

  const handleLogout = async ()=>{
    const res = await axiosInstance.post('theatre/theatre-logout/',{'refresh_token':refresh , 'access_token':access})
    if(res.status === 200){
      localStorage.removeItem('theatre_access');
      localStorage.removeItem('theatre_refresh');
      localStorage.removeItem('theatre');
      navigate('/theatre/login')
    }
  }

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
          <Button as={Link} onClick={handleLogout} className="bg-indigo-500" href="#" variant="flat">
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
