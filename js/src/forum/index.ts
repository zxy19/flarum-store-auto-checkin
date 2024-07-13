import app from 'flarum/forum/app';
import { UseHelper, addFrontendProviders } from "@xypp-store/forum"
import { extend } from "flarum/common/extend"
import IndexPage from "flarum/forum/components/IndexPage"
app.initializers.add('xypp/store-auto-checkin', () => {
  let hasChecked = false;
  addFrontendProviders("auto-check-in", app.translator.trans("xypp-store-auto-checkin.forum.name") as string)
  extend(IndexPage.prototype, 'sidebarItems', function (items) {
    if (app.session.user !== null && app.forum.attribute('allowCheckIn') === true) {
      if (hasChecked) return;
      hasChecked = true;
      const canCheckin = app.session.user.attribute("canCheckin");
      if (canCheckin) {
        UseHelper.get("auto-checkin").then(async e => e.filterAvailable().use(""))
          .then(() => $("#checkInButton").click());
      }
    }
  });
});
