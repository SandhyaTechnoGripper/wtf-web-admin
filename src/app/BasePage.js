import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import EditUser from "./pages/editUser";
import TrainerManagement from "./pages/TrainerManagement";
import UserManagement from "./pages/UserManagement";
import GymManagement from "./pages/GymManagement";
import EquipmentManagement from "./pages/EquipmentManagement";
import BenefitManagement from "./pages/BenefitManagement";
import AddonsManagement from "./pages/AddonsManagement";
import EventsManagement from "./pages/EventsManagement";
import GalleryManagement from "./pages/GalleryManagement";
import OfferManagement from "./pages/OfferManagement";
import FeedbackManagement from "./pages/FeedbackManagement";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/allusers" component={UserManagement} />
        <ContentRoute path="/edit-users" component={EditUser} />

        <ContentRoute path="/trainer" component={TrainerManagement} />
        <ContentRoute path="/gym" component={GymManagement} />
        <ContentRoute path="/equip" component={EquipmentManagement} />
        <ContentRoute path="/benefit" component={BenefitManagement} />
        <ContentRoute path="/addons" component={AddonsManagement} />
        <ContentRoute path="/gallery" component={GalleryManagement} />
        <ContentRoute path="/offers" component={OfferManagement} />
        <ContentRoute path="/events" component={EventsManagement} />
        <ContentRoute path="/feedback" component={FeedbackManagement} />

        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
