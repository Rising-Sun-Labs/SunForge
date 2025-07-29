import { BsActivity } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import type { ReactElement } from "react";

export interface SideMenuData{
    label: string;
    path: string;
    icon: ReactElement;
    children?: SideMenuData[];
    customRender?: ReactElement;
} 


const SideMenu:SideMenuData[]=[
    {label:"Quick search", path:"", icon:<CiSearch />},
    {label:"Recent activity", path:"/recentActivity", icon:<BsActivity/>}
]

export {SideMenu}