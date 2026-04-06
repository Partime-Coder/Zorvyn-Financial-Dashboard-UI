// src/components/cards/ProfileCard.jsx
import { useNavigate } from "react-router-dom"
import { RiAccountCircleFill, IoIosArrowDown, PiToolbox, MdOutlineDarkMode, MdOutlineLightMode, CiLogout, CiSettings } from "../../assets/icons/reactIcons"
import { useAuth } from "../../hooks/useAuthentication"
import Dropdown from "../utilities/Dropdown"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../../features/theme/themeSlice"

function ProfileCard({ isCollapsed }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.theme.theme)

  const dropdownItems = [
    {
      label: "View profile",
      icon: <RiAccountCircleFill />,
      // UI Only Perpose 
      onClick: () => {}, 
    },
    {
      label: "Account settings",
      icon: <CiSettings />,
      // UI Only Perpose 
      onClick: () => {},
    },
    {
      label: "Help & documentation",
      icon: <PiToolbox />,
      // UI Only Perpose 
      onClick: () => {},
    },
    {
      label: isDark ? "Light mode" : "Dark mode",
      icon: isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />,
      onClick: () => dispatch(toggleTheme()),
    },
    { type: "divider" },
    {
      label: "Sign out",
      icon: <CiLogout />,
      danger: true,
      onClick: () => {
        logout()
        navigate("/login")
      },
    },
  ]

  if (isCollapsed) {
    return (
      <div className="w-full flex justify-center ">
        <div className="w-12 h-12 rounded-full flex justify-center items-center overflow-hidden bg-primary shrink-0">
          <RiAccountCircleFill size={40} className="text-text-primary" />
        </div>
      </div>
    )
  }

  // expanded — avatar card with dropdown
  const trigger = (
    <div className="relative w-full border bg-primary border-third rounded-2xl px-4 py-3 hover:bg-secondary transition-all duration-200 cursor-pointer">

      {/* Arrow */}
      <div className="absolute top-3 right-3 text-text-secondary">
        <IoIosArrowDown size={16} />
      </div>


      <div className="flex items-center gap-3 ">
        <div className="w-12 h-12 rounded-full flex justify-center items-center overflow-hidden bg-secondary shrink-0">
          <RiAccountCircleFill size={40} className="text-text-secondary" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-text-primary leading-none">
            {user?.name}
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            {user?.email}
          </p>
        </div>
      </div>

    </div>
  )

  return (
    <Dropdown
      trigger={trigger}
      items={dropdownItems}
      align="top"
    />
  )
}

export default ProfileCard