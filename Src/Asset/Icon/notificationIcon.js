import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  ClipPath,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const NotificationIcon = (props) => (
  <Svg
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="url(#b)" d="M0 0h128v128H0z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h128v128H0z" />
      </ClipPath>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABNBJREFUeJztml9oHFUYxc83u5uEmiZiLRoqYiVpK/7rJov5s7Mp+6BIsEIRoxajDS0FEYRiwfrgg4ggKNIiPigkJWIVo9haEd9cm91NE5tkU0UqUqsPtuBfSFvaJLs7xwexaJhNdu7cOxM1v8eZe7577uGbmbszKwgBkpIv5F8EsBsAKXzD3mw/JyIM2osEPSEA5Av5HSQP/v0YwcdTram3gvZiBT0hANDhloXHhJIOw0soAYjIVdUcC4JQAlhORIOcLPNF5vpoJJog2bzw7kOyOTuZvS9WEzvRcXvHT0F5Mn4THBsbayjWFvstWo8RjFcxJwVSADDESzxo2/YFk/6MBTAyNbLWEutZEDsBNCiWmSE4QPCl7tbuX3T6+wsjAWQL2QeF8jqAtZpK/iyQJ5OtyQ801buC1gAymUxdTWPNIMFHdNa9AnHofMP5nT0tPXO6SmoLYGJiYtWszB6G4B5dNSvwebG2uDV9a/qijmJaApiYmFg1a81+CqBbR72lEMixWqe2J5FIXPJbS8s+YM6aew0BLR4ACG65LJf366jluwNyk7leCN7TYcYrBLenWlPv+qnhK4Cxr8auKxVL30L9MeeXGQdOi59HpK9LoDRf2ovwFg8AjRasPX4KKHfA+Pj4mmK0+D0Eq/0Y0MDFolNcn06kf1URK3fAfGz+iWWweACoj0Viu1XFygEI5GFVrXaIh1SlSpfA6PToOsdxflSd1BDr7Fb7nFeRUgeUWe5S0ZlEIJ0qOqUAhLJJRWcSCjeq6NQCELlBRWcU4kYVmVIAJOtVdEYhlDypdQAkpqIziYjUqOj+9y9FVwII20DYrAQQtoGwWQlARUQwotuIXwgqrUW1A8J8CeIKobY5UwuAWKOkM4hAlDx5DoCkBcEGlckMs4mk55/3ngPIf5lvARDKt/wlqB+ZHmn2KvLeAQ7v9aoJCgvW3d41XgW0tnnVBIVQHvCs8TI4dzK3EWWc8qoLEFq0NnS1dZ2uVuCtA0rYh+W7eAAQR5xnPAmqHZg/mb+NZU4DWHaboAWUIozc0dnWeaqawVV1QCaTiTplZwDLf/EAEC1LeXB4eLgqr1UFEGuMvSCQu/z5CpSOppam56sZuOQlkJ/M91M46N9T4BCCfjtuDy02aNEOyE5l+yh8U6+vwBAQA7lCbtfigyqQncr2CWRosTH/EkhwV6o15drFros7Xjh+U5nlbwDUGrUWHLMRidzSGe/8YeEJ10ugzHIf/juLB4C6EkuPup1wvwcQNxu1EwIWLNdfsJVugkb+lRkqxO9uhysF8LFBK2Fx1O2gawB2m50F8I5ROwEikPeTbcnP3M5V3AfUOXU7INgPQNvfUkOgKJQDM6tn+ioNWPIZP/r16DVO0bmT5LV6vRnGwYWaUs2J9vb238K2ssJyxtg2NzeVOwRgu5ZigrftuF3xOvaDuU9jdH/sqCCUj3TVWoixAOpY9yEEZzSU+m5+Zv6IhjquGAsgkUgUHThP+yxDknvS6XRJiykXjH4d7o53HyH4qqqewpdTbSmju1Ljn8ftuL1XKQTiFXuzvc+ApX8Q2MuO7GR2q4gcALB+0YGCMwJ5KhlPfhKEr0Df9mQymWj06ug2gdwPogNA058m5ByAMQBHz54+e7i3t7cclKc/AGlVaOXaJp4RAAAAAElFTkSuQmCC"
        id="c"
        width={16}
        height={16}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
)
export default NotificationIcon
