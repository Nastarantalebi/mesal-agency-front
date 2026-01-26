import { Header } from "@radix-ui/react-accordion";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"




function App() {
  return(
    <>
      <Header/>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </>
  )

}

export default App;
