import { AppBar, Avatar, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react"

import { useRouter } from 'next/router'
import { Container } from "@mui/system"

// import { useAppDispatch, useAppSelector } from '../hooks'
// import { RootState } from '../store'

const NavLink = ({ children, href }: any) => {
  return (
    <div style={{ marginRight: '1rem' }}>
      <Link
        href={href}
        underline="none"
        variant="button"
        color="default"
      >
        {children}
      </Link>
    </div>
  )
}

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onClickProfile = () => {
    handleCloseUserMenu()
    router.push('/profile')
  }

  return (
    <AppBar component="nav" color="default">
      <Toolbar>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <NavLink href="/users">Users</NavLink>
          <NavLink href="/journals">Journals</NavLink>

          <Tooltip title="Profile">
            <IconButton
              onClick={handleOpenUserMenu}
              size="small"
              sx={{ ml: 2 }}
            >
              <Avatar alt="Profile" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="profile" onClick={onClickProfile}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar