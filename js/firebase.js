const _0x2ca383 = _0x59ed;
function _0x1e0b() {
  const _0x17336b = [
    "265741421264",
    "4ZSGYpI",
    "1:265741421264:web:5d6af087a996b58a9cecd5",
    "1156435CRtElC",
    "12258TqqBKE",
    "1067605wfVbAF",
    "157371Mltowj",
    "2664ZoKHvr",
    "9111vjyhEB",
    "166730ItpCEG",
    "386EFDxFi",
    "836Ljwobd",
    "954690QnpJzu",
    "AIzaSyAiA-CPBjHgdNMSkECYJ3D55S-OJWeRpNM",
    "https://noir-b0cf8-default-rtdb.asia-southeast1.firebasedatabase.app",
    "noir-b0cf8.appspot.com",
  ];
  _0x1e0b = function () {
    return _0x17336b;
  };
  return _0x1e0b();
}
(function (_0x360d0d, _0x4d887d) {
  const _0x5d2050 = _0x59ed,
    _0xe40627 = _0x360d0d();
  while (!![]) {
    try {
      const _0x3b7756 =
        -parseInt(_0x5d2050(0x175)) / 0x1 +
        (parseInt(_0x5d2050(0x179)) / 0x2) *
          (-parseInt(_0x5d2050(0x177)) / 0x3) +
        (-parseInt(_0x5d2050(0x170)) / 0x4) *
          (-parseInt(_0x5d2050(0x172)) / 0x5) +
        parseInt(_0x5d2050(0x17b)) / 0x6 +
        -parseInt(_0x5d2050(0x174)) / 0x7 +
        (parseInt(_0x5d2050(0x176)) / 0x8) *
          (-parseInt(_0x5d2050(0x173)) / 0x9) +
        (parseInt(_0x5d2050(0x178)) / 0xa) * (parseInt(_0x5d2050(0x17a)) / 0xb);
      if (_0x3b7756 === _0x4d887d) break;
      else _0xe40627["push"](_0xe40627["shift"]());
    } catch (_0x327bdf) {
      _0xe40627["push"](_0xe40627["shift"]());
    }
  }
})(_0x1e0b, 0x4b309);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: _0x2ca383(0x17c),
    authDomain: "noir-b0cf8.firebaseapp.com",
    databaseURL: _0x2ca383(0x17d),
    projectId: "noir-b0cf8",
    storageBucket: _0x2ca383(0x16e),
    messagingSenderId: _0x2ca383(0x16f),
    appId: _0x2ca383(0x171),
    measurementId: "G-CDZKCSXS56",
  },
  app = initializeApp(firebaseConfig),
  database = getDatabase(app),
  auth = getAuth(app);
function _0x59ed(_0x3897ce, _0x4c2579) {
  const _0x1e0b69 = _0x1e0b();
  return (
    (_0x59ed = function (_0x59ed78, _0x58443c) {
      _0x59ed78 = _0x59ed78 - 0x16e;
      let _0x342dce = _0x1e0b69[_0x59ed78];
      return _0x342dce;
    }),
    _0x59ed(_0x3897ce, _0x4c2579)
  );
}
export {
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
};
