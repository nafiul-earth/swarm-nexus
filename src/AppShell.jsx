import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderContainer,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavDivider,
  Theme,
  Tag
} from '@carbon/react'
import {
  Activity,
  ChartLineSmooth,
  CodeReference,
  Dashboard,
  DocumentTasks,
  Hourglass,
  Notification,
  Search as SearchIcon,
  Settings,
  TestTool,
  TreeView,
  UserAvatar,
  Workspace as WorkspaceIcon,
  AddAlt,
  Idea,
  Asleep,
  Network_3,
  Chat,
  Choices,
  ChartBubble
} from '@carbon/icons-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { to: '/',           label: 'Today',         Icon: Dashboard },
  { to: '/exec',       label: 'Executive view',Icon: ChartBubble },
  { to: '/goals',      label: 'Goals',         Icon: ChartLineSmooth },
  { to: '/delegate',   label: 'Delegate',      Icon: AddAlt },
  { to: '/live',       label: 'Live work',     Icon: Activity },
  { to: '/plans',      label: 'Plans',         Icon: TreeView },
  { to: '/knowledge',  label: 'Knowledge',     Icon: Idea },
  { to: '/decisions',  label: 'Decisions',     Icon: Choices },
  { to: '/replay',     label: 'Replay & audit',Icon: Hourglass },
  { to: '/eval',       label: 'Trust & eval',  Icon: TestTool }
]

export default function AppShell({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Theme theme="g100">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="GoalNexus">
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName as={Link} to="/" prefix="">
                <span style={{ color: '#33b1ff', textShadow: '0 0 12px rgba(51,177,255,0.45)' }}>
                  GoalNexus
                </span>
                <span style={{ color: '#78a9ff', marginLeft: '0.5rem', fontWeight: 300 }}>
                  business coordination
                </span>
              </HeaderName>
              <div style={{ marginLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag size="sm" type="blue">Workspace · M. Patel</Tag>
                <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: '0.75rem', color: '#c6c6c6' }}>
                  4 goals · 5 asks for you · 23 agents
                </span>
              </div>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search"><SearchIcon size={20} /></HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications"><Notification size={20} /></HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Settings"><Settings size={20} /></HeaderGlobalAction>
                <HeaderGlobalAction aria-label="User avatar" tooltipAlignment="end"><UserAvatar size={20} /></HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent
              >
                <SideNavItems>
                  {NAV.map(({ to, label, Icon }) => (
                    <SideNavLink
                      key={to}
                      renderIcon={Icon}
                      isActive={
                        to === '/'
                          ? location.pathname === '/'
                          : location.pathname.startsWith(to)
                      }
                      onClick={(e) => { e.preventDefault(); navigate(to) }}
                      href={to}
                    >
                      {label}
                    </SideNavLink>
                  ))}
                  <SideNavDivider />
                  <SideNavLink renderIcon={Network_3} href="#" onClick={(e) => e.preventDefault()}>
                    Connectors
                  </SideNavLink>
                  <SideNavLink renderIcon={Chat} href="#" onClick={(e) => e.preventDefault()}>
                    Quiet hours
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Header>
            <main className="gn-main with-sidenav">
              {children}
            </main>
          </>
        )}
      />
    </Theme>
  )
}
