// let orderIdsIntervalled = [];
//window.Shopify.checkout = shopify checkout values

// pixel on window: window.fbq.getState().pixels
// cart/update.js and atclid for atc event?

// async function sha256(message) {
//   // encode as UTF-8
//   const msgBuffer = new TextEncoder().encode(message);

//   // hash the message
//   const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

//   // convert ArrayBuffer to Array
//   const hashArray = Array.from(new Uint8Array(hashBuffer));

//   // convert bytes to hex string
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
//   console.log({ hashHex, message });
//   return hashHex;
// }

// SHOPIFY SEE IF LOGGED CONVERISON YET
// var hasLoggedConversion = function (token) {
//   if (token) {
//     return document.cookie.indexOf("loggedConversion=" + token) !== -1;
//   }
//   return false;
// };

// var setCookieIfConversion = function (token) {
//   if (token) {
//     var twoMonthsFromNow = new Date(Date.now());
//     twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

//     document.cookie =
//       "loggedConversion=" + token + "; expires=" + twoMonthsFromNow;
//   }
// };
// var match = window.location.pathname.match(
// /checkouts\/(.+)\/(thank_you|post_purchase)/
// );
// var token = match ? match[1] : undefined;
// if (!hasLoggedConversion(token)) {
// setCookieIfConversion(token);
function getUserTimezone() {
  try {
    if (Intl && Intl.DateTimeFormat) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else {
      // Fallback mechanism: Return a default timezone or ask the user
      return "UTC"; // Example default
    }
  } catch (error) {
    console.log("error collecting tz", error);
  }
}

// }

function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );
}

function getSubstringBetween(n, t, e) {
  if ("" == n) return "";
  var i = n.indexOf(t);
  if (!(i >= 0)) return "";
  if (((n = n.substring(i + t.length)), e)) {
    if (!((i = n.indexOf(e)) >= 0)) return "";
    n = n.substring(0, i);
  }
  return n;
}

function getCookie(name) {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  } catch (error) {
    return "";
  }
}

// Function that persists data for both server-side and a client-side.
function setSessionCookie(cookieName, cookieValue) {
  try {
    // Format cookie string without specifying expiration date
    const cookieString =
      cookieName + "=" + encodeURIComponent(cookieValue) + "; path=/";

    // Set the cookie
    document.cookie = cookieString;
  } catch (err) {
    console.log(err);
  }
}

function generateUUID() {
  let d = Date.now(); // Timestamp
  let d2 = 0;

  try {
    if (typeof performance !== "undefined" && performance.now) {
      d2 = performance.now() * 1000; // Time in microseconds since page-load
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16; // Random number between 0 and 16
        if (d > 0) {
          // Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          // Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  } catch (err) {
    // Fallback to timestamp if performance.now is not supported or an error occurs
    return timestamp.toString(16);
  }
}

// Generate a unique ID if none exists but if it does, use the existing
// This identifier serves as an additional mechanism to identify the user, particularly useful if the IP address is inaccurate or unavailable.
function generateOrGetUUID() {
  try {
    let cid = localStorage.getItem("trueroas_cid");
    if (!cid) {
      cid = generateUUID();
      localStorage.setItem("trueroas_cid", cid);
    }
    setSessionCookie("trueroas_cid", cid);
    return cid;
  } catch (err) {
    console.error("Error generating or getting UUID:", err);
    try {
      let cid = generateUUID();
      localStorage.setItem("trueroas_cid", cid);
      setSessionCookie("trueroas_cid", cid);
      return cid;
    } catch (err) {
      console.error("Error getting UUID:", err);
      return "";
    }
  }
}

function getUrlParameter(url, parameter) {
  try {
    const regex = new RegExp("[?&]" + parameter + "=([^&#]*)", "i");
    const results = regex.exec(url);
    return results ? decodeURIComponent(results[1]) : null;
  } catch (error) {
    return null;
  }
}

function getShopifyCartToken() {
  try {
    const cartToken =
      localStorage.getItem("cartToken") ||
      localStorage.getItem("trackedSourceId");

    // Ensures the string meets the specific criteria of starting with certain character(s)
    // followed by a 32-character hexadecimal sequence. Because in other cases, the token is encoded in different ways
    const regex = /^([a-z]{2}|\d{2}|[a-z]\d|\d[a-z])-[0-9a-f]{32}$/i;
    return regex.test(cartToken) ? cartToken : "";
  } catch (err) {
    console.error("Error getting cart token:", err);
    return "";
  }
}

async function reroasq(initial, customConversion = {}) {
  var blockedTruePixels = [
    "juicefully.myshopify.com",
    "flexstoremgmt.myshopify.com",
    "000f5f.myshopify.com",
    "00c5f2-2.myshopify.com",
    "0100fb.myshopify.com",
    "0875b0.myshopify.com",
    "094bc9.myshopify.com",
    "0d9690-4.myshopify.com",
    "0f5744.myshopify.com",
    "111587-2.myshopify.com",
    "16f709-2.myshopify.com",
    "17cd14-2.myshopify.com",
    "17d104.myshopify.com",
    "1a7065-2.myshopify.com",
    "1d8746.myshopify.com",
    "229d3d.myshopify.com",
    "23265b-2.myshopify.com",
    "233c05-2.myshopify.com",
    "24535c.myshopify.com",
    "2532d1.myshopify.com",
    "2931ac-2.myshopify.com",
    "29e1c1.myshopify.com",
    "2a5d39.myshopify.com",
    "2bcc09.myshopify.com",
    "2c1006-3.myshopify.com",
    "2dc30e-3.myshopify.com",
    "2dehandsfietsenwinkel.myshopify.com",
    "335b19-2.myshopify.com",
    "3a4168.myshopify.com",
    "3b1fac-3.myshopify.com",
    "3c33c0-2.myshopify.com",
    "3ca965.myshopify.com",
    "3cd808.myshopify.com",
    "3f320c.myshopify.com",
    "3rdfloorgr.myshopify.com",
    "41eb24-2.myshopify.com",
    "44595d.myshopify.com",
    "4519fd.myshopify.com",
    "4a8578-2.myshopify.com",
    "4fdadd.myshopify.com",
    "5053ad.myshopify.com",
    "535b0a.myshopify.com",
    "53a6f6.myshopify.com",
    "5468c3-3.myshopify.com",
    "55a1cc-4.myshopify.com",
    "570504.myshopify.com",
    "5c3d8b.myshopify.com",
    "5f9ec6-2.myshopify.com",
    "61dce0.myshopify.com",
    "64fefa.myshopify.com",
    "67024d-2.myshopify.com",
    "67afc2.myshopify.com",
    "693fb9-2.myshopify.com",
    "6fb5ed.myshopify.com",
    "70eb19-2.myshopify.com",
    "712692-3.myshopify.com",
    "78edb8.myshopify.com",
    "7eac04.myshopify.com",
    "7ed338.myshopify.com",
    "7figsoon.myshopify.com",
    "82023a.myshopify.com",
    "8ac684.myshopify.com",
    "8b8f54.myshopify.com",
    "8c1b57-2.myshopify.com",
    "8c3693.myshopify.com",
    "8dbc44-2.myshopify.com",
    "8ed58a.myshopify.com",
    "90a925.myshopify.com",
    "9250ae.myshopify.com",
    "93cf9f-3.myshopify.com",
    "98c4a1-2.myshopify.com",
    "99c31c.myshopify.com",
    "9b06ff.myshopify.com",
    "9be09a-2.myshopify.com",
    "9ce69b.myshopify.com",
    "9f28d1.myshopify.com",
    "9f29d2.myshopify.com",
    "9f93b4-2.myshopify.com",
    "a19e3b.myshopify.com",
    "a2888d.myshopify.com",
    "a6b1ee.myshopify.com",
    "a6cbd3-2.myshopify.com",
    "a80806.myshopify.com",
    "aa3e87.myshopify.com",
    "ab66f8.myshopify.com",
    "abchome-dk.myshopify.com",
    "ac30c5-2.myshopify.com",
    "adeluvo1.myshopify.com",
    "aeee2f.myshopify.com",
    "ahava-il.myshopify.com",
    "airfloppy.myshopify.com",
    "akemi1292.myshopify.com",
    "all-about-audrey-boutique.myshopify.com",
    "allpabotanicals.myshopify.com",
    "aloe-paris.myshopify.com",
    "alpha-prime-supps.myshopify.com",
    "amoprimee-2.myshopify.com",
    "amorcustomgifts.myshopify.com",
    "andrewisthebest-befc.myshopify.com",
    "andy-okay.myshopify.com",
    "angelasmithkyy.myshopify.com",
    "antiscent.myshopify.com",
    "antram-3365.myshopify.com",
    "aok9.myshopify.com",
    "aphroditehealth.myshopify.com",
    "arcticrecovery.myshopify.com",
    "art-force-one-mexico.myshopify.com",
    "athenee-paris-5046-2.myshopify.com",
    "athletia-8276.myshopify.com",
    "b0ef8b-2.myshopify.com",
    "b23021.myshopify.com",
    "b2b47a.myshopify.com",
    "b3d1d6-2.myshopify.com",
    "b55b1b.myshopify.com",
    "b5a4bb.myshopify.com",
    "b6750a.myshopify.com",
    "b7a7fc-2.myshopify.com",
    "b7af90.myshopify.com",
    "b96006.myshopify.com",
    "babygear-5122.myshopify.com",
    "bambu-klader.myshopify.com",
    "bank-d.myshopify.com",
    "bee-creative-au.myshopify.com",
    "beltside.myshopify.com",
    "beyapo-2184.myshopify.com",
    "bigbangmarketco.myshopify.com",
    "bionicgymusa.myshopify.com",
    "bloombeautyllc.myshopify.com",
    "bloomtown-brands.myshopify.com",
    "blushwood-health.myshopify.com",
    "bodyslim-paris-us.myshopify.com",
    "bored-cart.myshopify.com",
    "bounceback-official-store.myshopify.com",
    "boutique22shop.myshopify.com",
    "boutiqueleggingoff.myshopify.com",
    "bowtiesetc.myshopify.com",
    "bozasieraden.myshopify.com",
    "broderik1.myshopify.com",
    "budderbotanicals.myshopify.com",
    "bullet-proof-zone.myshopify.com",
    "bullishnutrition.myshopify.com",
    "by-banoo.myshopify.com",
    "c11a54.myshopify.com",
    "c49221.myshopify.com",
    "c6a268.myshopify.com",
    "c981df.myshopify.com",
    "caraluna-uae.myshopify.com",
    "cartpatrol.myshopify.com",
    "cba7b2-2.myshopify.com",
    "cellinicaffeshop.myshopify.com",
    "ceralio.myshopify.com",
    "ch-babyparadies.myshopify.com",
    "chakra-nutrition.myshopify.com",
    "chiccasa-ch.myshopify.com",
    "christaloneprints.myshopify.com",
    "cinemabox.myshopify.com",
    "cityboii-7695.myshopify.com",
    "clean-fusion.myshopify.com",
    "colombiacoffeeroasters.myshopify.com",
    "comfydence-6811.myshopify.com",
    "con-los-crespos-hechos.myshopify.com",
    "copenhagen-bamboo.myshopify.com",
    "coralliana.myshopify.com",
    "cornholegear.myshopify.com",
    "croc-professional.myshopify.com",
    "crumpledtalk.myshopify.com",
    "curly-girl-friendly.myshopify.com",
    "cyclowax.myshopify.com",
    "d1a66d.myshopify.com",
    "d71445-4.myshopify.com",
    "dabalash-mexico-com.myshopify.com",
    "daily-orders-australia.myshopify.com",
    "de-rando.myshopify.com",
    "dedealio.myshopify.com",
    "denmarkia.myshopify.com",
    "digitalzone-9201.myshopify.com",
    "dog-essential-de.myshopify.com",
    "dog-toys1.myshopify.com",
    "doucis.myshopify.com",
    "doveo-sverige.myshopify.com",
    "dreammakerplanner.myshopify.com",
    "dydsshop.myshopify.com",
    "dynasty-designs-service.myshopify.com",
    "dzqdzqdzq.myshopify.com",
    "e01b88-4.myshopify.com",
    "e1afa2.myshopify.com",
    "e58d01-2.myshopify.com",
    "e5aa2b.myshopify.com",
    "e6a0e9-2.myshopify.com",
    "eb4558-2.myshopify.com",
    "eeb5e5.myshopify.com",
    "eiklar.myshopify.com",
    "electricgallery.myshopify.com",
    "enduro-5798.myshopify.com",
    "engelspforte.myshopify.com",
    "entrepreneurlife-5060.myshopify.com",
    "eudynth.myshopify.com",
    "evolution-pt.myshopify.com",
    "ewaxyy.myshopify.com",
    "exceptiongroup.myshopify.com",
    "exotischerleben.myshopify.com",
    "f05630-2.myshopify.com",
    "f13179-2.myshopify.com",
    "f228a9.myshopify.com",
    "f5car.myshopify.com",
    "f60f40.myshopify.com",
    "f7aab5-2.myshopify.com",
    "f7d7a7-2.myshopify.com",
    "fa1044.myshopify.com",
    "fad142.myshopify.com",
    "fahaliya.myshopify.com",
    "fashion-shoespro.myshopify.com",
    "fbc27c-2.myshopify.com",
    "femine-frankfurt.myshopify.com",
    "femme-fatale-5995.myshopify.com",
    "filapen.myshopify.com",
    "finieundfasel.myshopify.com",
    "fitbee-nederland.myshopify.com",
    "fittwist.myshopify.com",
    "flying-graphics.myshopify.com",
    "football-mode-7492.myshopify.com",
    "fragrantjewels.myshopify.com",
    "frau-kauf.myshopify.com",
    "funpunch1.myshopify.com",
    "future-audio-matt.myshopify.com",
    "gaia-sustainable-concept.myshopify.com",
    "gain-the-edge-performance.myshopify.com",
    "garethgregorywhite.myshopify.com",
    "gauge81.myshopify.com",
    "genuine-haircare.myshopify.com",
    "ghislainss-shop.myshopify.com",
    "giftsido2021.myshopify.com",
    "gilgameshco.myshopify.com",
    "glammyface.myshopify.com",
    "glimora-7054.myshopify.com",
    "glint-brand.myshopify.com",
    "glow-chemistry.myshopify.com",
    "godt-haill.myshopify.com",
    "good-goodies-6996.myshopify.com",
    "goxolar.myshopify.com",
    "graspgoods.myshopify.com",
    "guided-home-design.myshopify.com",
    "gymnutrition-2.myshopify.com",
    "hairbeautypk.myshopify.com",
    "haircurls-se.myshopify.com",
    "hammer-back.myshopify.com",
    "happy-golfer-3654.myshopify.com",
    "happysoaps-nl-consumer.myshopify.com",
    "headled-de.myshopify.com",
    "heavyglare99.myshopify.com",
    "hedonia-2.myshopify.com",
    "heiyu.myshopify.com",
    "herbcience-com.myshopify.com",
    "highbeauty-com.myshopify.com",
    "hippie-farms.myshopify.com",
    "homelux-9534.myshopify.com",
    "honey-bug.myshopify.com",
    "honu-au.myshopify.com",
    "horseandangels.myshopify.com",
    "hovedbutikk.myshopify.com",
    "hu-ka-ma.myshopify.com",
    "huski-uk.myshopify.com",
    "huski-us.myshopify.com",
    "hype-shop-1369.myshopify.com",
    "iamlight11.myshopify.com",
    "icase-canada.myshopify.com",
    "independentrepublic.myshopify.com",
    "inkanddrop.myshopify.com",
    "innerbag-5634.myshopify.com",
    "insideillusions.myshopify.com",
    "instagr1d.myshopify.com",
    "ios-clothing.myshopify.com",
    "islamboekhandel-nl.myshopify.com",
    "its-dreamzshop.myshopify.com",
    "jabersbusiness.myshopify.com",
    "jalu-market-col.myshopify.com",
    "jalumarketec.myshopify.com",
    "jerlue.myshopify.com",
    "jollymama.myshopify.com",
    "joyorganics.myshopify.com",
    "junkldn.myshopify.com",
    "key-snap-holder.myshopify.com",
    "kidsoracle2.myshopify.com",
    "kook-simpel-shop.myshopify.com",
    "kotomi-swim.myshopify.com",
    "kpartsholland.myshopify.com",
    "kroondeal.myshopify.com",
    "lacardia.myshopify.com",
    "lalviv.myshopify.com",
    "lampiece-store.myshopify.com",
    "lavenderise.myshopify.com",
    "lefaya.myshopify.com",
    "lelet-ny.myshopify.com",
    "lelosi-germany.myshopify.com",
    "lelosi-hungary.myshopify.com",
    "lelosi.myshopify.com",
    "lerich-fashion.myshopify.com",
    "liebes-haustier.myshopify.com",
    "ligwijzer.myshopify.com",
    "linenbundle-deu.myshopify.com",
    "linenbundle-es.myshopify.com",
    "linenbundle-eu.myshopify.com",
    "linenbundle-fr.myshopify.com",
    "linenbundle-ie.myshopify.com",
    "linenbundle-it.myshopify.com",
    "linenbundle-nl.myshopify.com",
    "linenbundle.myshopify.com",
    "lingiadore.myshopify.com",
    "little-cirkus.myshopify.com",
    "liv-maternity.myshopify.com",
    "lolo-lion.myshopify.com",
    "loovlynl.myshopify.com",
    "love-curries.myshopify.com",
    "lucendi.myshopify.com",
    "lumbarax.myshopify.com",
    "lumibike.myshopify.com",
    "luna-jewels-denmark.myshopify.com",
    "luna-jewels-france.myshopify.com",
    "lunajewelsde.myshopify.com",
    "lunajewelssee.myshopify.com",
    "luxejewels-2305.myshopify.com",
    "lynyer.myshopify.com",
    "maestro-eshop.myshopify.com",
    "makezbright.myshopify.com",
    "marcellogeertsshop.myshopify.com",
    "marcelsteinbrecher77.myshopify.com",
    "masania-9679.myshopify.com",
    "meinbabylein.myshopify.com",
    "melanie-pigeaud-jewerly.myshopify.com",
    "menoveda.myshopify.com",
    "miichooya.myshopify.com",
    "minidronese.myshopify.com",
    "missfinchnyc.myshopify.com",
    "mitty-burns.myshopify.com",
    "moesstore-3023.myshopify.com",
    "moon-senses-2.myshopify.com",
    "moonny-shop.myshopify.com",
    "morbidasloffy.myshopify.com",
    "mr-candy-ireland.myshopify.com",
    "musk-al-mahal.myshopify.com",
    "mwhwear.myshopify.com",
    "mybaggy-6005.myshopify.com",
    "mydukaan-nl.myshopify.com",
    "myluvara.myshopify.com",
    "nation-athletics-bjj.myshopify.com",
    "natura-cashmere.myshopify.com",
    "naturyl-hair-extensions.myshopify.com",
    "neck-right.myshopify.com",
    "needsandfinds-com.myshopify.com",
    "neon-mfg-usa.myshopify.com",
    "new-sake-tipssy.myshopify.com",
    "new5hour.myshopify.com",
    "newbeginning12.myshopify.com",
    "nibschoco.myshopify.com",
    "nirvanashape.myshopify.com",
    "nonynanaessential.myshopify.com",
    "nordiczoo-7055.myshopify.com",
    "nuurlab.myshopify.com",
    "officialrelaxrabbit.myshopify.com",
    "officialsttoke.myshopify.com",
    "ohmybody-uk.myshopify.com",
    "olio-ciavatta.myshopify.com",
    "omfg-gummies.myshopify.com",
    "one-shear.myshopify.com",
    "otakuuninja.myshopify.com",
    "outdoorhero-24.myshopify.com",
    "outside-gang-shop.myshopify.com",
    "padelson.myshopify.com",
    "painfreeco.myshopify.com",
    "pamperpetals.myshopify.com",
    "paper-pages-1.myshopify.com",
    "paradise-paw.myshopify.com",
    "pausenfudder.myshopify.com",
    "pavilioncreations.myshopify.com",
    "pawmisedland.myshopify.com",
    "pawsome-prints-23.myshopify.com",
    "pendekstore.myshopify.com",
    "petsgrande.myshopify.com",
    "petsuppliesempire.myshopify.com",
    "pfotenparadies-schweiz.myshopify.com",
    "pixellight-nl.myshopify.com",
    "play-grow-philippines.myshopify.com",
    "plexicam.myshopify.com",
    "polaris-7110.myshopify.com",
    "portal-evolution.myshopify.com",
    "preturi-reduse.myshopify.com",
    "pringston.myshopify.com",
    "przpl.myshopify.com",
    "ptdja.myshopify.com",
    "ptitesapicultrices.myshopify.com",
    "punk-haus.myshopify.com",
    "pupman.myshopify.com",
    "puschies.myshopify.com",
    "ramiz-bhoja.myshopify.com",
    "rejuvaliftbeauty.myshopify.com",
    "revitalise-london.myshopify.com",
    "rise-nyc.myshopify.com",
    "rosario-fitness-8910.myshopify.com",
    "rtw-creation.myshopify.com",
    "ruma-online.myshopify.com",
    "sahursart.myshopify.com",
    "saiid-kobeisy.myshopify.com",
    "sakshi-masand21.myshopify.com",
    "sandiia.myshopify.com",
    "scent-mall-philippines.myshopify.com",
    "schlippschlapp.myshopify.com",
    "schnaepplijaeger.myshopify.com",
    "scobydog.myshopify.com",
    "shappykids.myshopify.com",
    "shopsinaco.myshopify.com",
    "sidesleeper-1675.myshopify.com",
    "sierplantenshop-3562.myshopify.com",
    "silvamundi.myshopify.com",
    "simplrworld.myshopify.com",
    "sinsnlashes.myshopify.com",
    "sistersboutique.myshopify.com",
    "skin-deep-international.myshopify.com",
    "sleekostore.myshopify.com",
    "sloffy-espana.myshopify.com",
    "smartify-4006.myshopify.com",
    "snake-bite-fitness.myshopify.com",
    "sneakeds-int.myshopify.com",
    "software-9668.myshopify.com",
    "souk-society.myshopify.com",
    "sound-watch.myshopify.com",
    "sourrman.myshopify.com",
    "souvenirs-de-poche.myshopify.com",
    "sparfuchsschweiz.myshopify.com",
    "spineflex-4811.myshopify.com",
    "stampking-9370.myshopify.com",
    "stark-ecom-7022.myshopify.com",
    "starlunar.myshopify.com",
    "steiger-naturals-2-0.myshopify.com",
    "sterrez.myshopify.com",
    "storec-x43408769.myshopify.com",
    "storec-x56596992.myshopify.com",
    "storemicasa.myshopify.com",
    "strapsz.myshopify.com",
    "streichduft.myshopify.com",
    "stryv-supplements.myshopify.com",
    "studiobambacht.myshopify.com",
    "studiotools.myshopify.com",
    "stupidgarage.myshopify.com",
    "stuuli.myshopify.com",
    "submarine-pickup.myshopify.com",
    "suqje.myshopify.com",
    "swiftmay.myshopify.com",
    "swingsupply123.myshopify.com",
    "syron-golf.myshopify.com",
    "t1tactwatch.myshopify.com",
    "talissi.myshopify.com",
    "tecsosport.myshopify.com",
    "tenuedesoleil.myshopify.com",
    "test-bambustoj-dk.myshopify.com",
    "the-emporium-hut.myshopify.com",
    "the-patch-remedy-store.myshopify.com",
    "the-scrummy-sweets-co.myshopify.com",
    "the-silver-tex.myshopify.com",
    "thejunketindia.myshopify.com",
    "themessistore.myshopify.com",
    "thepersonalisedstore01.myshopify.com",
    "things4bubs.myshopify.com",
    "thread-stories-revamp.myshopify.com",
    "time-bicycles-america.myshopify.com",
    "tinyriot.myshopify.com",
    "tougher-than-tom.myshopify.com",
    "tour-aim-golf.myshopify.com",
    "traped-out-apparel.myshopify.com",
    "trashfish.myshopify.com",
    "trymedex.myshopify.com",
    "ttrendhouse.myshopify.com",
    "ultibay.myshopify.com",
    "uneffected-clothing.myshopify.com",
    "uniquegostore.myshopify.com",
    "valdo-3576.myshopify.com",
    "valencia-ellie.myshopify.com",
    "vannabeltgelv.myshopify.com",
    "varmeprylar-se.myshopify.com",
    "vauce-vegan.myshopify.com",
    "veganshirtly.myshopify.com",
    "viari-accessories.myshopify.com",
    "vigorboost.myshopify.com",
    "vik-kl.myshopify.com",
    "vital-40.myshopify.com",
    "vitano-home.myshopify.com",
    "walkingcanesnet.myshopify.com",
    "warlich-rum-de.myshopify.com",
    "wayve-pay.myshopify.com",
    "webx-6efb.myshopify.com",
    "wegstein-coaching.myshopify.com",
    "wellchoice-se.myshopify.com",
    "where-is-your-smile-5197.myshopify.com",
    "wildideabuffalo.myshopify.com",
    "windeler.myshopify.com",
    "womoohv.myshopify.com",
    "www-doughstore-com.myshopify.com",
    "xbar-fitness.myshopify.com",
    "yogalizenz.myshopify.com",
    "yotesmgee.myshopify.com",
    "you-live-it.myshopify.com",
    "yourneeds-69cc.myshopify.com",
    "youthrobe.myshopify.com",
    "zibatienda.myshopify.com",
    "zumada.myshopify.com"
  ];

  try {
    console.log("Running", window?.location?.href);
    if (
      (("complete" !== document?.readyState &&
        "interactive" !== document?.readyState) ||
        initial) &&
      !(window.Shopify && window.Shopify.checkout)
    ) {
      return setTimeout(reroasq, 1000);
    }
    console.log(
      "TrueROAS: Want to stop wasting money on ads and start scaling? Visit us at https://trueroas.com/why-true-roas and get your tracking on track."
    );
    if (!window._reroas.sessionId)
      window._reroas.sessionId = Math.random().toString(36).slice(2);
    console.log("Started true roas session:", window._reroas.sessionId);
    let scriptEventName = window._reroas.find(([key, val]) => key === "event");
    if (scriptEventName)
      scriptEventName = scriptEventName?.length && scriptEventName[1];

    let reroasPixelId = window._reroas.find(([key, val]) => key === "pixelId");
    if (reroasPixelId?.length) {
      reroasPixelId = reroasPixelId[1];
    } else {
      return console.log("TrueROAS: Error - No pixel id");
    }
    if (reroasPixelId && blockedTruePixels.some(s => s === reroasPixelId)) {
      return console.log(
        reroasPixelId +
          " is blocked by TrueROAS. Remove the pixel script or contact hello@trueroas.com to get help."
      );
    }
    // manualOrder
    const scriptOrderId = window._reroas.find(
      ([key, val]) => key === "orderId"
    );
    const manualOrderId = scriptOrderId ? scriptOrderId[1] : null;
    const scriptValue = window._reroas.find(([key, val]) => key === "value");
    const manualValue = scriptValue ? scriptValue[1] : 0;
    const scriptCurrency = window._reroas.find(
      ([key, val]) => key === "currency"
    );
    const manualCurrency = scriptCurrency ? scriptCurrency[1] : "";

    // end manualOrder
    // does not become an object down there...
    const eventID = generateUUID();
    let noteAttributes = {};
    if (window?.Shopify?.checkout?.note_attributes) {
      window?.Shopify?.checkout?.note_attributes?.map(a => {
        if (a.name.includes("fbp-clientID")) {
          noteAttributes.fbp = a.value;
        }
        if (a.name.includes("segment-clientID")) {
          noteAttributes.segment = a.value;
        }
        if (a.name.includes("google-clientID")) {
          noteAttributes.ga = a.value;
        }
      });
    }

    // "https://www.facebook.com/tr/?id=2327294277407610&ev=PageView&dl=https%3A%2F%2Fboxbollen.co.uk%2F&rl=&if=false&ts=1718182117368&sw=1710&sh=1107&v=2.9.157&r=stable&a=shopify&ec=0&o=4126&fbp=fb.2.1713178957964.2096396896&ler=empty&it=1718182117133&coo=false&eid=sh-0ba27dda-8EBF-4108-598F-A242054FB262&cdl=&rqm=GET",
    //   "https://www.facebook.com/privacy_sandbox/pixel/register/trigger/?id=2327294277407610&ev=PageView&dl=https%3A%2F%2Fboxbollen.co.uk%2F&rl=&if=false&ts=1718182117368&sw=1710&sh=1107&v=2.9.157&r=stable&a=shopify&ec=0&o=4126&fbp=fb.2.1713178957964.2096396896&ler=empty&it=1718182117133&coo=false&eid=sh-0ba27dda-8EBF-4108-598F-A242054FB262&cdl=&rqm=FGET";

    // get [em] from facebook tracking on purchase and you will get a good email for superkey

    const relevantPerformances = performance
      .getEntriesByType("resource")
      .filter(
        n => n?.name?.includes("facebook.com") && n?.name?.includes("eid=")
      );

    // const capiData = relevantPerformances.map(({ name }) => ({
    //   ev: getUrlParameter(name, "ev") || null,
    //   eid: getUrlParameter(name, "eid") || null,
    //   id: getUrlParameter(name, "id") || null
    // }))

    const uniqueValues = [];
    const capiData = [];

    relevantPerformances.forEach(({ name }) => {
      const ev = getUrlParameter(name, "ev") || null;
      const eid = getUrlParameter(name, "eid") || null;
      const id = getUrlParameter(name, "id") || null;

      const uniqueCheck = eid || ev;

      if (uniqueCheck && uniqueValues.indexOf(uniqueCheck) === -1) {
        uniqueValues.push(uniqueCheck);
        capiData.push({ ev, eid, id });
      }
    });

    const isDev = false;
    // const baseUrl = isDev ? "http://localhost:3000" : "https://app.trueroas.io";
    // const route = "/api/attr";

    const url = isDev
      ? "http://127.0.0.1:5001/roisushi/us-central1/attr" ||
        "http://localhost:3000/api/attr"
      : "https://us-central1-roisushi.cloudfunctions.net/attr";

    // const baseUrl = isDev ? "http://127.0.0.1:5001" : "https://app.trueroas.io";
    // const route = "/roisushi/us-central1/attr";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log("trueroas: ", reroasPixelId, xhr.status);
        // console.log("res", xhr.responseText);
      }
    };
    // const scriptCollection = document.getElementsByTagName("script");
    // const scripts = [].slice.call(scriptCollection);
    // const fbqScripts = scripts.find(
    //   asd => asd.outerHTML && asd.outerHTML.includes("fbq")
    // );
    // const fbqArguments = getSubstringBetween(
    //   fbqScripts ? fbqScripts.outerHTML : "",
    //   "fbq('track',",
    //   ")"
    // );

    // get [em] from facebook tracking on purchase and you will get a good email for superkey
    // const relevantPerformances = performance
    //   .getEntriesByType("resource")
    //   .filter(
    //     n =>
    //       n.name.includes("id=") &&
    //       (n.name.includes("facebook.com/tr") ||
    //         n.name.includes("googletag") ||
    //         n.name.includes("google-analytics"))
    // Get event ID for CAPI
    //     ||
    // (n.name.includes("facebook") &&
    //   n.name.includes("/tr") &&
    //   n.name.includes("eid="))
    // );
    // const performanceNames = relevantPerformances.map(asd => asd.name);
    // Get event ID for CAPI
    // const eventIdPerformanceUrl = performanceNames.find(p =>
    //   p.includes("eid=")
    // );
    // const eventIDMatches = eventIdPerformanceUrl.match(/eid=([^&]*)/);
    // const eventID = eventIDMatches[1];
    // const trackingUrls = performanceNames
    //   .map(a => {
    //     const urlRegexp =
    //       /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
    //     const isUrl = (a || "").toString().match(urlRegexp);
    //     const url = new URL(isUrl ? a : "http://none.com");
    //     const params = new URLSearchParams(url.search);
    //     //const allEid = params.getAll('eid')
    //     const allEv = params.getAll("ev");
    //     const allT = params.getAll("t");
    //     const allTi = params.getAll("ti");
    //     return [...allTi, ...allT, ...allEv].filter(asd => asd);
    //   })
    //   .join()
    //   .split(",");

    const isShopifyPurchase = Boolean(
      window.location.pathname.match(
        /(checkouts|checkout)\/(.+)\/(thank_you|post_purchase)/
      ) ||
        (window.Shopify &&
          window.Shopify.checkout &&
          window.Shopify.checkout.orderId)
    );
    const isCheckoutAndThanks = Boolean(
      window.location.pathname.match(
        /^.*?\b(checkouts|checkout|purchase|afrekenen)\b.*?\b(thanks|thank_you|thankyou|thank-you|post_purchase|post-purchase|postpurchase|purchase|order-received)\b.*?$/
      )
    );
    //const reroasPurchase = Boolean(window.location.pathname.match(/reroas/));
    const isCustomPurchase = Boolean(
      window._reroas.custom &&
        window.location.pathname.match(new RegExp(window._reroas.custom))
    );

    const wooCommerceOrderDetails = {};
    try {
      const htmlOrderDetails = document.getElementsByClassName(
        "woocommerce-thankyou-order-details"
      );
      if (htmlOrderDetails && htmlOrderDetails.length) {
        const orderDetailsText = htmlOrderDetails[0].innerText;
        const splittedOrderDetailsText = orderDetailsText.split(/[:\n]+/);
        splittedOrderDetailsText.map((o, i) => {
          const lowerCaseKey = o.toLowerCase().trim();
          const valueFromString = splittedOrderDetailsText[i + 1]
            ? splittedOrderDetailsText[i + 1].trim()
            : "";

          if (lowerCaseKey === "order number") {
            wooCommerceOrderDetails.orderNumber = valueFromString;
          }

          if (lowerCaseKey === "date") {
            wooCommerceOrderDetails.date = new Date(valueFromString);
          }
          if (lowerCaseKey === "total") {
            // const currencyVsTotal = valueFromString;
            wooCommerceOrderDetails.currency =
              valueFromString.replace(/\s/g, "").split(/[0-9]/)[0] || "";
            wooCommerceOrderDetails.total =
              valueFromString.replace(/\s/g, "").split(/[0-9]/)[1] || "";
          }
        });
      }
    } catch (error) {
      console.log("Error calculating WooCommerce order details");
    }

    // const date = new Date();
    // const _pinterest_sess = getCookie("_pinterest_sess");
    const _ga = getCookie("_ga");
    const _pinterest_ct = getCookie("_pinterest_ct");
    const _pinterest_ct_rt = getCookie("_pinterest_ct_rt");
    const ttp = getCookie("ttp");
    const _ttp = getCookie("_ttp");
    const gid = getCookie("_gid");
    const t_gid = getCookie("t_gid");
    const auid = getCookie("auid");
    const _pin_unauth = getCookie("_pin_unauth");
    const RoktRecogniser = getCookie("RoktRecogniser");
    // const __kla_id = getCookie("__kla_id");
    const _gcl_au = getCookie("_gcl_au");
    const _shopify_y = getCookie("_shopify_y");
    const _y = getCookie("_y");
    const fbp = getCookie("_fbp") || noteAttributes.fbp;
    const fbc = getCookie("_fbc");
    const timezone = getUserTimezone();
    const cartToken = getCookie("cart") || getShopifyCartToken();
    const customerTrueroasId = generateOrGetUUID();

    const data = {
      ...(((window && window.Shopify && window.Shopify.checkout) ||
        manualOrderId ||
        (wooCommerceOrderDetails.orderNumber &&
          +wooCommerceOrderDetails.total > 0)) && {
        checkout: {
          ...wooCommerceOrderDetails,
          id:
            manualOrderId ||
            customConversion.id ||
            wooCommerceOrderDetails.orderNumber,
          ...(manualValue && { value: manualValue || customConversion.value }),
          ...(manualCurrency && {
            currency: manualCurrency || customConversion.currency
          }),
          ...customConversion,
          ...(window.Shopify && window.Shopify.checkout)
        }
      }),
      ...(timezone && { timezone }),
      sessionId: window._reroas.sessionId,
      // fbqArguments,
      // trackingUrls,
      // ...(window?.orderIdsIntervalled?.length && {
      //   orderIdsIntervalled: window.orderIdsIntervalled
      // }),
      //isCheckout: isCheckouts || isCheckouts,
      pixelId: reroasPixelId,
      isPurchase:
        isShopifyPurchase ||
        isCheckoutAndThanks ||
        (window._reroas.custom && isCustomPurchase) ||
        manualOrderId,
      documentReferrer: document.referrer,
      userAgent: window.navigator.userAgent,
      locationHref: window.location.href,
      // cookies
      // ...(_pinterest_sess && { _pinterest_sess }),
      ...(_ga && { _ga }),
      ...(_pinterest_ct && { _pinterest_ct }),
      ...(_pinterest_ct_rt && { _pinterest_ct_rt }),
      ...((ttp || _ttp) && { ttp: ttp || _ttp }),
      ...(gid && { gid }),
      ...(t_gid && { t_gid }),
      ...(auid && { auid }),
      ...(_pin_unauth && { _pin_unauth }),
      ...(RoktRecogniser && { RoktRecogniser }),
      // ...(__kla_id && { __kla_id }),
      ...(_gcl_au && { _gcl_au }),
      ...(_shopify_y && { _shopify_y }),
      ...(_y && { _y }),
      ...(fbp && { fbp }),
      ...(fbc && { fbc }),
      ...(cartToken && { cartToken }),
      ...(capiData?.length && { capiData }),
      // cookies
      // external_id: external_id,
      event_id: eventID,
      customerTrueroasId
      // ...(facebookPixel?.eventId && { facebookPixel })
      // event_name: manualOrderId ? "Purchase" : scriptEventName || "PageView",
      // ...((isShopifyPurchase ||
      //   isCheckoutAndThanks ||
      //   (window._reroas.custom && isCustomPurchase)) && {
      //   true_event_name: "Purchase"
      // }),
      // utcTime: convertDateToUTC(date),
      // event_time: date?.getTime(),
      // clientTimezone: date?.getTimezoneOffset() / 60
    };
    window._reroas.map(([key, val]) => (data[key] = val));
    const stringifiedData = JSON.stringify(data);
    // console.log(`Sending`, data);
    xhr.send(stringifiedData);
  } catch (err) {
    console.log("A wild error appeared!", err);

    const errorUrl = "https://app.trueroas.io/api/err";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", errorUrl);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }
    };
    let errorPixelId = "";
    try {
      errorPixelId = window._reroas.find(([key, val]) => key === "pixelId")[1];
    } catch (error) {
      errorPixelId = "error getting pixel";
    }
    const errorObject = {
      ...err,
      created: new Date().getTime(),
      createdAt: new Date(),
      href: window.location.href || "",
      documentReferrer: document.referrer,
      userAgent: window.navigator.userAgent,
      reroasMessage: "error in reattributeScript.js",
      reroasPixelId: errorPixelId
    };
    const stringifiedData = JSON.stringify(errorObject);
    xhr.send(stringifiedData);
  }
}

(function () {
  var pushState = history.pushState;
  var replaceState = history.replaceState;

  history.pushState = function () {
    pushState.apply(history, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  // history.replaceState = function () {
  //   replaceState.apply(history, arguments);
  //   window.dispatchEvent(new Event("replacestate"));
  //   window.dispatchEvent(new Event("locationchange"));
  // };

  window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("locationchange"));
  });
})();
// Example usage:

window.addEventListener("locationchange", function () {
  reroasq();
});
reroasq(true);

function shopifyCheckoutListener() {
  try {
    if (
      window &&
      window.Shopify &&
      window.Shopify.checkout &&
      window.Shopify.checkout.orderId &&
      !window.orderIdsIntervalled.includes(window.Shopify.checkout.orderId)
    ) {
      console.log("Registering ", window.Shopify.checkout.orderId);
      if (!window.orderIdsIntervalled) window.orderIdsIntervalled = [];
      window.orderIdsIntervalled.push(window.Shopify.checkout.orderId);
      return reroasq(false);
    } else {
      return;
    }
  } catch (error) {
    console.error("Error in shopifyCheckoutListener", error);
  }
}
setInterval(shopifyCheckoutListener, 1000);
