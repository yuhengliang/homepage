import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, Env, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { FeatureData } from "../../const/homeData"
import FeatureCardGroup from "./components/FeatureCardGroup.view"
import Footer from "./components/Footer.view"
import Example from "./components/Example.view"
import { getSize } from "../../utils/utilFunc"
import Title from "./components/Title.view"
import { Logo } from "../../logo"
import FirstScreen from "./FirstScreen.view"

@View
class Home {
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  featureData = FeatureData
  count = 2

  View() {
    div()
      .class(this.bgCss)
    {
      FirstScreen()
    }
  }

  bgCss = css`
    /* background: ${this.themeType === "dark" ? "linear-gradient(#330172, #000000)" : "linear-gradient(#fff9f4, #fff9f4)"}; */
    background-color: ${this.theme.primaryBgColor};
    overflow-x: hidden;
    height: 100vh;
  `
}

export default Home as Pretty as Typed
