/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Header from "./header"

export default ({ children, ...props }) => (
  <Styled.root>
    <Header {...props} />
    <div>
      <div
        sx={{
          maxWidth: `container`,
          mx: `auto`,
          px: 3,
          py: 4,
        }}
      >
        {children}
      </div>
    </div>
  </Styled.root>
)
