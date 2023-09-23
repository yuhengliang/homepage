import { View } from "@dlightjs/dlight"
import { type Typed, button, Env, required, img } from "@dlightjs/types"
import Header from "./Header.view"
import { css, div } from "@dlightjs/easy-css"
import { featureData } from "../../utils/const"
import PreviewSection from "./PreviewSection.view"
import FeatureCardGroup from "./FeatureCardGroup.view"
import Footer from "./Footer.view"
import Logo from "../../Icon/Logo.view"
import Example from "./Example.view"

class Home extends View {
  @Env navigator = required
  @Env theme: any = required
  featureData = featureData
  count = 2

  Body() {
    div()
      .className(this.bgCss)
    {
      Header()
        .isNeedAnimation(true)
      div()
      .className(this.titleExampleWrapCss)
      {
        div()
          .className(this.titleWrapCss)
        {
          div("DLight.js")
            .className(this.homeTitleCss)
          div("DX-first UI Rendering Library")
            .className(this.titleDescriptionCss)
          div("Unlocking View Building in Familiar JS Syntax with an Intuitive API")
            .className(this.introDescriptionCss)
          button("Get Started")
            .className(this.homeStartBtnCss)
            .onclick(() => { this.navigator.to("./docs/getting-started") })
        }
        Example()
      }
      div()
        .className(this.featureCardWrap)
      {
        FeatureCardGroup()
          .data(this.featureData.slice(0, 2))
        FeatureCardGroup()
          .data(this.featureData.slice(2, 4))
      }
      // PreviewSection()
      Footer()
    }
  } 

  bgCss = css`
    background-color: ${this.theme.orange1};
    overflow-x: hidden;
  `

  titleExampleWrapCss = css`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  `

  homeTitleCss = css`
    color: ${this.theme.orange10};
    font-weight: bold;
    font-size: 60px;
    text-shadow: 0 1px 5px;
  `

  titleDescriptionCss = css`
    color: ${this.theme.green12};
    font-weight: bold;
    font-size: 50px;
    margin-top: 10px;
    /* text-align: center; */
  `

  introDescriptionCss = css`
    font-size: 25px;
    line-height: 35px;
    margin-top: 10px;
    color: ${this.theme.green12};
    /* text-align: center; */
  `

  homeStartBtnCss = css`
    color: ${this.theme.green12};
    background-color: ${this.theme.orange6};
    padding: 12px 12px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px ${this.theme.green10};
    border-width: 0;
    margin-top: 25px;
  `

  titleWrapCss = css`
    margin: 65px 10% 86px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* align-items: center; */
    justify-content: center;
    width: 500px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  featureCardWrap = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    margin-top: -120px;
  `
}

export default Home as any as Typed<Home>
