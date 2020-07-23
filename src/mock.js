const mockjs = require("mockjs");

const requireAll = (requireContext) =>
  requireContext
    .keys()
    .map(requireContext)
    .map((n) => {
      const obj = n.default;
      for (const key in obj) {
        const r = key.split(/\s+/);
        console.log(r);
        if (r) {
          if (r.length === 2) {
            const [method, url] = r;
            mockjs.mock(new RegExp(`^${url}`), method, obj[key]);
          }
          if (r.length === 1) {
            const [url] = r;
            const reg = new RegExp(`^${url}`);
            mockjs.mock(reg, "get", obj[key]);
            mockjs.mock(reg, "post", obj[key]);
          }
        }
      }
    });
const req = require.context("./mock", true, /\.ts$/);
requireAll(req);
