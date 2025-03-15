import Globalfunction from "../utils/globalFunction"
class EwayLandingPage
{
get ewaylandingLogo()
{
    return $('//a[@class="navbar-brand"]//img')
}
async isLogoDisplayed()
{

    this.ewaylandingLogo.isDisplayed()
}


}
export default new EwayLandingPage()
