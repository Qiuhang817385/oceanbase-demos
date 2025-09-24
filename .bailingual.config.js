// more config: https://yuque.antfin.com/bailingual/guides/cli-config
/** @type {import('@alipay/bailingual-cli').BailingualConfig} */
module.exports = {
  extract: {
    name: "oceanbase-demo",
    sourcePath: ".",
    fileType: "ts",
    prettier: true,
    exclude: (path) => {
      return path.includes("/.next");
    },
    macro: {
      path: "./i18n",
      method: '$i18n.get({id:"$key$",dm:"$defaultMessage$"})',
      import: 'import $i18n from "./i18n"',
      keySplitter: ".",
      placeholder: (variable) => {
        return `{${variable}}`;
      },
      dependencies: ["@alipay/bailingual-sdk-glue"],
    },
    babel: {
      allowImportExportEverywhere: true,
      decoratorsBeforeExport: true,
      plugins: [
        "asyncGenerators",
        "classProperties",
        "decorators-legacy",
        "doExpressions",
        "exportExtensions",
        "exportDefaultFrom",
        "typescript",
        "functionSent",
        "functionBind",
        "jsx",
        "objectRestSpread",
        "dynamicImport",
        "numericSeparator",
        "optionalChaining",
        "optionalCatchBinding",
      ],
    },
    isNeedUploadCopyToBailingual: true,
    sourceLang: "zh-CN",
    sdkVersion: "normal",
  },
  import: {
    type: "json",
    path: "./i18n",
    bailingual: {
      appName: "obcloud-demos",
      tag: "",
    },
  },
};
