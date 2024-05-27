import { Link, Route, Routes } from "react-router-dom";
import { AppShell, Container, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useWindowSize } from "./contexts/WindowSizeContext";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoCube } from "react-icons/io5";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import CommunityPage from "./pages/CommunityPage";
import ManagePage from "./pages/ManagePage";
import Header, { LanguageChoices } from "./components/header/Header";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ExplorePage from "./pages/ExplorePage";
import AllPage from "./pages/AllPage";
import LostPage from "./pages/LostPage";
import Drawer from "react-modern-drawer";
import Dialog from "./Dialog";
import Modallion from "./Modallion";
import NotificationPage from "./pages/NotificationPage";
import "react-modern-drawer/dist/index.css";

export default function Layout() {
  const [opened] = useDisclosure();
  const { screenWidth, screenHeight } = useWindowSize();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function openDrawer() {
    setIsDrawerOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    screenWidth >= 1200 && closeDrawer();
  });

  return (
    <>
      <AppShell
        header={{ height: screenHeight > 700 ? 60 : 50 }}
        navbar={{
          width: { base: 280, xl: 300 },
          breakpoint: "lg",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Flex className="bg-dark-900 items-center h-full">
            <button onClick={openDrawer} className="ml-4 lg:hidden">
              <MdMenu size={28} />
            </button>
            <div className="flex-grow h-full">
              <Header />
            </div>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <div className="lg:hidden">
          <Drawer
            open={isDrawerOpen}
            onClose={closeDrawer}
            direction="left"
            duration={200}
          >
            <div
              className={`flex justify-between items-center gap-8 bg-dark-850 w-[300px] border-r border-line ${
                screenHeight >= 700 ? "h-[60px]" : "h-[50px]"
              }`}
            >
              <div className="flex items-center gap-8">
                <button onClick={closeDrawer} className="ml-4">
                  <MdMenu size={28} />
                </button>
                <Link to="/home" onClick={closeDrawer}>
                  <IoCube size={32} />
                </Link>
              </div>
              {screenWidth < 700 && (
                <div className="mr-4">
                  <LanguageChoices />
                </div>
              )}
            </div>
            <Navbar closeDrawer={closeDrawer} />
          </Drawer>
        </div>

        <AppShell.Main>
          <Container className="max-w-[1056px] p-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/all" element={<AllPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/c/:community_link/*" element={<CommunityPage />} />
              <Route
                path="/c/:community_link/manage"
                element={<ManagePage />}
              />
              <Route
                path="/c/:community_link/post/:post_permalink/*"
                element={<PostDetailPage />}
              />
              <Route path="/user/:username/*" element={<UserPage />} />
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/profile/settings" element={<SettingsPage />} />
              <Route path="*" element={<LostPage />} />
            </Routes>
          </Container>
        </AppShell.Main>
      </AppShell>
      <Dialog />
      <Modallion />
    </>
  );
}
