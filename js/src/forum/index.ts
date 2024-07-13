import app from 'flarum/forum/app';
import { UseHelper, addFrontendProviders } from "@xypp-store/forum"
function doAutoCheckin() {
  const nd = $("<div></div>").addClass("auto-checkin-coverment")
    .html(`<span class="before-em">🤔</span><span class="after-em">😋</span>`);
  $("#checkInButton").addClass("auto-checkin-doing").append(nd).on("click", (e) => {
    const btn = $(e.currentTarget);
    if (btn.hasClass("auto-checkin-doing")) {
      btn.removeClass("auto-checkin-doing");
    }
  });
  setTimeout(() => $("#checkInButton").click(), 2000);
}
app.initializers.add('xypp/store-auto-checkin', () => {
  addFrontendProviders("auto-check-in", app.translator.trans("xypp-store-auto-checkin.forum.name") as string)
  if (app.session.user !== null && app.forum.attribute('allowCheckIn') === true) {
    const canCheckin = app.session.user.attribute("canCheckin");
    if (canCheckin) {
      UseHelper.get("auto-checkin").then(async e => e.filterAvailable().hasItem())
        .then(canAutoCheckin => {
          if (canAutoCheckin) {
            doAutoCheckin();
          }
        })
    }
  }
});
