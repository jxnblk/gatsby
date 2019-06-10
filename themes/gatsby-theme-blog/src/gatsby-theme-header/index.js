import React from 'react'
import {
  css,
  Header,
  Container,
  Styled,
  Box,
  useColorMode,
} from 'theme-ui'
import { Link } from 'gatsby'
import useSiteMetadata from '../hooks/use-site-metadata'
import Toggle from '../components/toggle'
import sun from "../../content/assets/sun.png"
import moon from "../../content/assets/moon.png"

const Title = props => {
  return (
    <Styled.h3 my={0}>
      <Styled.a
        as={Link}
        to='/'
        css={css({
          boxShadow: `none`,
          textDecoration: `none`,
          color: `primary`,
        })}>
        {props.children}
      </Styled.a>
    </Styled.h3>
  )
  const { location, title } = props
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname === rootPath) {
    return (
      <Styled.h1
        css={css({
          my: 0,
          fontSize: 4,
        })}
      >
        <Styled.a
          as={Link}
          css={{
            color: `inherit`,
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}
        >
          {title}
        </Styled.a>
      </Styled.h1>
    )
  } else {
    return (
      <Styled.h3
        css={css({
          my: 0,
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            color: `primary`,
          })}
          to={`/`}
        >
          {title}
        </Styled.a>
      </Styled.h3>
    )
  }
}

export default props => {
  const metadata = useSiteMetadata()
  const [ colorMode, setColorMode ] = useColorMode()
  const isDark = colorMode === 'dark'
  const toggleColorMode = e => {
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <Header mb={4}>
      <Container
        css={css({
          py: 3,
          display: 'flex',
          alignItems: 'center',
        })}>
        <Title>
          {metadata.title}
        </Title>
        <Box mx='auto' />
        {props.children}
        <Toggle
          icons={{
            checked: (
              <img
                alt="moon indicating dark mode"
                src={moon}
                width="16"
                height="16"
                role="presentation"
                css={{ pointerEvents: `none` }}
              />
            ),
            unchecked: (
              <img
                alt="sun indicating light mode"
                src={sun}
                width="16"
                height="16"
                role="presentation"
                css={{ pointerEvents: `none` }}
              />
            ),
          }}
          checked={isDark}
          onChange={toggleColorMode}
        />
      </Container>
    </Header>
  )
}
