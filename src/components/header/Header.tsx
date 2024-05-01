import { Link } from "react-router-dom";
import { Authentication } from "./Authentication";
import { Flex } from "@mantine/core";
import { IoCube } from "react-icons/io5";

export default function Header() {
  return (
    <div className="flex justify-between bg-dark-900 h-full text-white px-4 xs:px-8 py-2 z-50">
      <Link to="/home" className="flex items-center">
        <IoCube size={32} />
      </Link>
      <Flex align="center" gap={8}>
        <Authentication />
      </Flex>
    </div>
  );
}
