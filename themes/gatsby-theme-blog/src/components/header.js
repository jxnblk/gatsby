/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, useColorMode, Styled } from "theme-ui"
import Switch from "./switch"
import Bio from "../components/bio"
import sun from "../../assets/sun.png"
import moon from "../../assets/moon.png"

const rootPath = `${__PATH_PREFIX__}/`

const Title = ({ children, location }) => {
  if (location.pathname === rootPath) {
    return (
      <Styled.h1
        sx={{
          my: 0,
          fontSize: 4,
        }}
      >
        <Styled.a
          as={Link}
          sx={{
            color: `inherit`,
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h1>
    )
  } else {
    return (
      <Styled.h3
        as="p"
        sx={{
          my: 0,
        }}
      >
        <Styled.a
          as={Link}
          sx={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `primary`,
          }}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h3>
    )
  }
}

const checkedIcon = (
  <img
    alt="moon indicating dark mode"
    src={moon}
    width="16"
    height="16"
    role="presentation"
    css={{
      pointerEvents: `none`,
      margin: 4,
    }}
  />
)

const uncheckedIcon = (
  <img
    alt="sun indicating light mode"
    src={sun}
    width="16"
    height="16"
    role="presentation"
    css={{
      pointerEvents: `none`,
      margin: 4,
    }}
  />
)

export default ({ children, title, ...props }) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = e => {
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <header>
      <div
        sx={{
          maxWidth: `container`,
          mx: `auto`,
          px: 3,
          pt: 4,
        }}
      >
        <div
          sx={{
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `baseline`,
            mb: 4,
          }}
        >
          <Title {...props}>{title}</Title>
          {children}
          <Switch
            aria-label="Toggle dark mode"
            sx={{
              bg: `black`,
            }}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checked={isDark}
            onChange={toggleColorMode}
          />
        </div>
        {props.location.pathname === rootPath && <Bio />}
      </div>
    </header>
  )
}
