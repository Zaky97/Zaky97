const _0x370ca0 = _0x5427;
(function (_0x47b2d3, _0x3afa05) {
  const _0xaea09a = _0x5427,
    _0x1df7c4 = _0x47b2d3();
  while (!![]) {
    try {
      const _0x5d0b38 =
        (-parseInt(_0xaea09a(0x96)) / 0x1) *
          (-parseInt(_0xaea09a(0x8c)) / 0x2) +
        -parseInt(_0xaea09a(0x87)) / 0x3 +
        (-parseInt(_0xaea09a(0x82)) / 0x4) *
          (-parseInt(_0xaea09a(0x99)) / 0x5) +
        (-parseInt(_0xaea09a(0x8d)) / 0x6) * (parseInt(_0xaea09a(0x95)) / 0x7) +
        parseInt(_0xaea09a(0x92)) / 0x8 +
        (parseInt(_0xaea09a(0x7f)) / 0x9) * (-parseInt(_0xaea09a(0x88)) / 0xa) +
        parseInt(_0xaea09a(0x89)) / 0xb;
      if (_0x5d0b38 === _0x3afa05) break;
      else _0x1df7c4["push"](_0x1df7c4["shift"]());
    } catch (_0xef2af1) {
      _0x1df7c4["push"](_0x1df7c4["shift"]());
    }
  }
})(_0x2f06, 0x3370e);
function _0x2f06() {
  const _0x1f7b14 = [
    "4581hAuGDE",
    "addEventListener",
    "location",
    "184824AtWFTl",
    "getItem",
    "forEach",
    "split",
    "setItem",
    "825108ynEhGQ",
    "770pHYeiK",
    "3443066KAixJe",
    "login.html",
    "firebaseToken",
    "574946vhjWZn",
    "6UxLUVN",
    "querySelectorAll",
    "pop",
    "shift",
    "DOMContentLoaded",
    "756496jIiCDh",
    "cookie",
    "value",
    "1837654aBUgdV",
    "1bkIQLP",
    "replace",
    "input",
    "10vBWOWs",
    "length",
  ];
  _0x2f06 = function () {
    return _0x1f7b14;
  };
  return _0x2f06();
}
import {
  app,
  database,
  auth,
  ref,
  push,
  onValue,
  remove,
  update,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "./firebase.js";
function _0x5427(_0x5e074c, _0x8ac2af) {
  const _0x2f0621 = _0x2f06();
  return (
    (_0x5427 = function (_0x542773, _0xbb2a5) {
      _0x542773 = _0x542773 - 0x7f;
      let _0xdc6682 = _0x2f0621[_0x542773];
      return _0xdc6682;
    }),
    _0x5427(_0x5e074c, _0x8ac2af)
  );
}
function getCookie(_0x203756) {
  const _0x2627e0 = _0x5427,
    _0x5058b3 = ";\x20" + document[_0x2627e0(0x93)],
    _0x323e36 = _0x5058b3[_0x2627e0(0x85)](";\x20" + _0x203756 + "=");
  if (_0x323e36[_0x2627e0(0x9a)] === 0x2)
    return _0x323e36[_0x2627e0(0x8f)]()
      [_0x2627e0(0x85)](";")
      [_0x2627e0(0x90)]();
}
document[_0x370ca0(0x80)](_0x370ca0(0x91), function () {
  const _0x2fc6d2 = _0x370ca0,
    _0x15a2a9 = getCookie(_0x2fc6d2(0x8b));
  !_0x15a2a9 && window[_0x2fc6d2(0x81)][_0x2fc6d2(0x97)](_0x2fc6d2(0x8a));
  const _0x48bf1e = document[_0x2fc6d2(0x8e)](_0x2fc6d2(0x98));
  _0x48bf1e[_0x2fc6d2(0x84)](function (_0x288909) {
    const _0x3ff441 = _0x2fc6d2,
      _0x23fc2d = localStorage[_0x3ff441(0x83)](_0x288909["id"]);
    _0x23fc2d && (_0x288909["value"] = _0x23fc2d),
      _0x288909[_0x3ff441(0x80)](_0x3ff441(0x98), function () {
        const _0x27ddf6 = _0x3ff441;
        localStorage[_0x27ddf6(0x86)](
          _0x288909["id"],
          _0x288909[_0x27ddf6(0x94)]
        );
      });
  });
});
